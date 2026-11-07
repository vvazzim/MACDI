import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import {
  runScraperSync,
  getScrapedPrices,
  getScraperStatus,
  EXPANDED_STORES
} from './scraper.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// In-memory votes and custom promos store
const customPromos = [];
const communityVotes = new Map(); // priceId -> { upvotes, downvotes }
const voteTimestamps = new Map(); // ip_productId -> timestamp

// Helper: Haversine distance in km
function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

// 1. Health check for Render
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'macdi',
    scraper: getScraperStatus(),
    timestamp: new Date().toISOString()
  });
});

// 2. Scraper status & manual trigger
app.get('/api/scrape/status', (req, res) => {
  res.json(getScraperStatus());
});

app.post('/api/scrape/refresh', async (req, res) => {
  const result = await runScraperSync();
  res.json({ success: true, result });
});

// 3. Stores endpoint
app.get('/api/stores', (req, res) => {
  res.json(EXPANDED_STORES);
});

// 4. Prices endpoint with automatic distance calculation & sorting
app.get('/api/prices', (req, res) => {
  const { productId = 'prod_soummam_1l', lat = '36.7188', lng = '3.1865', radius = '15' } = req.query;
  const userLat = parseFloat(lat);
  const userLng = parseFloat(lng);
  const radiusKm = parseFloat(radius);

  let allPrices = [...getScrapedPrices(), ...customPromos];
  const filtered = allPrices.filter((p) => p.product_id === productId);

  const results = filtered
    .map((record) => {
      const store = EXPANDED_STORES.find((s) => s.id === record.store_id);
      if (!store) return null;
      const distance = calculateDistanceKm(userLat, userLng, store.lat, store.lng);

      // Apply community votes overlay
      const voteOverlay = communityVotes.get(record.id) || { upvotes: 0, downvotes: 0 };

      return {
        ...record,
        store,
        upvotes: (record.upvotes || 0) + voteOverlay.upvotes,
        downvotes: (record.downvotes || 0) + voteOverlay.downvotes,
        distance_km: distance
      };
    })
    .filter(Boolean)
    .filter((item) => item.distance_km <= radiusKm)
    .sort((a, b) => a.price_dzd - b.price_dzd);

  res.json(results);
});

// 5. Community Vote with 15-Minute Anti-Spam Control
app.post('/api/vote', (req, res) => {
  const { priceId, productId, isUpvote = true } = req.body;
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const key = `${clientIp}_${productId}`;
  const now = Date.now();
  const lastTime = voteTimestamps.get(key) || 0;

  if (now - lastTime < 15 * 60 * 1000) {
    const remaining = Math.ceil((15 * 60 * 1000 - (now - lastTime)) / 1000);
    return res.status(429).json({
      error: `Protection anti-spam active : veuillez patienter ${remaining} secondes.`
    });
  }

  // Record vote
  const current = communityVotes.get(priceId) || { upvotes: 0, downvotes: 0 };
  if (isUpvote) current.upvotes += 1;
  else current.downvotes += 1;
  communityVotes.set(priceId, current);

  // Set 15-min cooldown
  voteTimestamps.set(key, now);

  res.json({ success: true, priceId, votes: current });
});

// 6. Supplier Promo declaration with REQUIRED GPS
app.post('/api/promo', (req, res) => {
  const { productId, storeName, storeType, gpsLat, gpsLng, promoPrice, promoNote, expiresDays = 3 } = req.body;

  if (!gpsLat || !gpsLng) {
    return res.status(400).json({ error: 'Position GPS exacte obligatoire.' });
  }

  const newStoreId = `store_gps_${Date.now()}`;
  const newStore = {
    id: newStoreId,
    name: storeName,
    name_ar: storeName,
    type: storeType || 'Marché Libre',
    source: 'Déclaré sur place (GPS)',
    wilaya: 'Position Certifiée',
    commune: 'Localisation en direct',
    address: 'Position certifiée par l\'appareil',
    lat: parseFloat(gpsLat),
    lng: parseFloat(gpsLng),
    phone: 'Point de vente libre'
  };

  EXPANDED_STORES.unshift(newStore);

  const promoRecord = {
    id: `promo_${Date.now()}`,
    product_id: productId,
    store_id: newStoreId,
    price_dzd: parseFloat(promoPrice),
    is_promo: true,
    promo_note: promoNote || '⚡ Offre Spéciale en direct',
    promo_expires: `Valable ${expiresDays} jours`,
    source: 'Commerçant / Terrain',
    upvotes: 1,
    downvotes: 0,
    verified_by_store: true,
    updated_at: 'À l\'instant (GPS Certifié)'
  };

  customPromos.unshift(promoRecord);
  res.json({ success: true, store: newStore, price: promoRecord });
});

// Serve frontend build from /dist
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Start background scraping and server
runScraperSync().then(() => {
  // Periodically re-scrape every 30 minutes
  setInterval(runScraperSync, 30 * 60 * 1000);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 MACDI PWA & Scraper en cours d'exécution sur le port ${PORT}`);
  console.log(`🌍 Accès local : http://localhost:${PORT}`);
});
