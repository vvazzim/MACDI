import { PRODUCTS, STORES, INITIAL_PRICES, CATEGORIES } from '../data/mockData';

// Storage keys
const STORAGE_PRICES_KEY = 'as3ar_dz_prices_v1';
const STORAGE_COOLDOWN_PREFIX = 'as3ar_cooldown_';
const COOLDOWN_DURATION_MS = 15 * 60 * 1000; // 15 minutes strict anti-spam

// Haversine formula to compute real distance in km
export function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10; // Round to 1 decimal place
}

// Get all price records from cache or initialize
export function getLocalPrices() {
  try {
    const raw = localStorage.getItem(STORAGE_PRICES_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_PRICES_KEY, JSON.stringify(INITIAL_PRICES));
      return INITIAL_PRICES;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Erreur lecture localStorage:', err);
    return INITIAL_PRICES;
  }
}

// Save prices to cache
export function saveLocalPrices(prices) {
  try {
    localStorage.setItem(STORAGE_PRICES_KEY, JSON.stringify(prices));
  } catch (err) {
    console.error('Erreur sauvegarde localStorage:', err);
  }
}

// Async search for product prices around user location and radius
export async function fetchPricesForProduct(productId, userLat, userLng, radiusKm = 15) {
  // Simulate asynchronous network delay (non-blocking)
  await new Promise((resolve) => setTimeout(resolve, 350));

  const allPrices = getLocalPrices();
  const productPrices = allPrices.filter((p) => p.product_id === productId);

  // If no prices found for this exact product, generate synthetic store entries from ref_price
  let records = [...productPrices];
  if (records.length === 0) {
    const product = PRODUCTS.find((p) => p.id === productId);
    const ref = product ? product.ref_price : 100;
    records = STORES.slice(0, 5).map((store, idx) => ({
      id: `synth_${productId}_${store.id}`,
      product_id: productId,
      store_id: store.id,
      price_dzd: Math.round(ref + (idx === 0 ? -10 : idx * 5)),
      is_promo: idx === 0,
      promo_note: idx === 0 ? 'Promo du moment' : null,
      upvotes: 12 + idx * 3,
      downvotes: 1,
      verified_by_store: idx === 0,
      updated_at: 'Aujourd\'hui'
    }));
  }

  // Join with store info and calculate distance
  const results = records
    .map((record) => {
      const store = STORES.find((s) => s.id === record.store_id);
      if (!store) return null;
      const distance = calculateDistanceKm(userLat, userLng, store.lat, store.lng);
      return {
        ...record,
        store,
        distance_km: distance
      };
    })
    .filter(Boolean)
    // Filter within radius
    .filter((item) => item.distance_km <= radiusKm)
    // Sort by price ascending (cheapest first)
    .sort((a, b) => a.price_dzd - b.price_dzd);

  return results;
}

// Check 15-minute anti-spam cooldown for this product
export function getCooldownStatus(productId) {
  try {
    const key = `${STORAGE_COOLDOWN_PREFIX}${productId}`;
    const timestampStr = localStorage.getItem(key);
    if (!timestampStr) return { canVote: true, remainingSeconds: 0 };

    const lastTime = parseInt(timestampStr, 10);
    const now = Date.now();
    const diff = now - lastTime;

    if (diff < COOLDOWN_DURATION_MS) {
      const remaining = Math.ceil((COOLDOWN_DURATION_MS - diff) / 1000);
      return { canVote: false, remainingSeconds: remaining };
    }

    return { canVote: true, remainingSeconds: 0 };
  } catch (err) {
    return { canVote: true, remainingSeconds: 0 };
  }
}

// Submit community vote (👍 ou 👎) with 15-min cooldown
export async function submitVote(priceRecordId, productId, isUpvote = true) {
  const cooldown = getCooldownStatus(productId);
  if (!cooldown.canVote) {
    throw new Error(`Anti-Spam activé : Veuillez patienter encore ${formatTime(cooldown.remainingSeconds)} avant de soumettre un avis sur cet article.`);
  }

  const prices = getLocalPrices();
  const index = prices.findIndex((p) => p.id === priceRecordId);

  if (index !== -1) {
    if (isUpvote) {
      prices[index].upvotes = (prices[index].upvotes || 0) + 1;
    } else {
      prices[index].downvotes = (prices[index].downvotes || 0) + 1;
    }
    saveLocalPrices(prices);
  }

  // Set cooldown
  localStorage.setItem(`${STORAGE_COOLDOWN_PREFIX}${productId}`, Date.now().toString());

  return { success: true, updatedPrice: prices[index] };
}

// Submit supplier promo
export async function submitSupplierPromo({ productId, storeId, promoPrice, promoNote, expiresDays = 3 }) {
  const prices = getLocalPrices();
  const existingIdx = prices.findIndex((p) => p.product_id === productId && p.store_id === storeId);

  const promoEntry = {
    id: existingIdx !== -1 ? prices[existingIdx].id : `promo_${Date.now()}`,
    product_id: productId,
    store_id: storeId,
    price_dzd: parseFloat(promoPrice),
    is_promo: true,
    promo_note: promoNote || '⚡ Promo Spéciale Commerçant',
    promo_expires: `Valable ${expiresDays} jours`,
    upvotes: 1,
    downvotes: 0,
    verified_by_store: true,
    updated_at: 'À l\'instant (Commerçant)'
  };

  if (existingIdx !== -1) {
    prices[existingIdx] = promoEntry;
  } else {
    prices.unshift(promoEntry);
  }

  saveLocalPrices(prices);
  return promoEntry;
}

// Helper to format remaining seconds as MM:SS
export function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}
