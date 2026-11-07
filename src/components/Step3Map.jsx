import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import {
  MapPin,
  ThumbsUp,
  ThumbsDown,
  Navigation,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Tag,
  Phone,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  Timer,
  Layers,
  Key,
  X
} from 'lucide-react';
import {
  fetchPricesForProduct,
  submitVote,
  getCooldownStatus,
  formatTime
} from '../services/api';

// Fix default leaflet marker icon asset path if ever used
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
});

export function Step3Map({
  lang,
  selectedProduct,
  userLocation,
  radiusKm,
  onOpenPromoModal
}) {
  const isAr = lang === 'ar';
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tileLayerRef = useRef(null);
  const markersGroupRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [priceRecords, setPriceRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Map tile style & API key configuration
  const [mapStyle, setMapStyle] = useState('voyager'); // 'voyager' | 'osm' | 'satellite' | 'mapbox'
  const [mapboxApiKey, setMapboxApiKey] = useState(() => localStorage.getItem('macdi_mapbox_key') || '');
  const [showStyleModal, setShowStyleModal] = useState(false);
  const [tempApiKey, setTempApiKey] = useState(mapboxApiKey);
  
  // Anti-spam cooldown state
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const [voteError, setVoteError] = useState('');
  const [voteSuccess, setVoteSuccess] = useState('');

  // 1. Fetch prices asynchronously
  const loadPrices = async () => {
    setLoading(true);
    try {
      const results = await fetchPricesForProduct(
        selectedProduct.id,
        userLocation.lat,
        userLocation.lng,
        radiusKm
      );
      setPriceRecords(results);
      if (results.length > 0) {
        setSelectedRecord(results[0]);
      }
    } catch (err) {
      console.error('Erreur chargement prix:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPrices();
  }, [selectedProduct, userLocation, radiusKm]);

  // 2. Cooldown timer countdown interval
  useEffect(() => {
    const status = getCooldownStatus(selectedProduct.id);
    setCooldownSeconds(status.remainingSeconds);

    if (status.remainingSeconds > 0) {
      const timer = setInterval(() => {
        setCooldownSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [selectedProduct.id, voteSuccess]);

  // Helper to get active tile URL
  const getTileConfig = (style, apiKey) => {
    if (style === 'mapbox' && apiKey) {
      return {
        url: `https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/{z}/{x}/{y}?access_token=${apiKey}`,
        options: {
          attribution: '&copy; Mapbox &copy; OpenStreetMap',
          tileSize: 512,
          zoomOffset: -1,
          maxZoom: 19
        }
      };
    }

    if (style === 'satellite') {
      return {
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        options: {
          attribution: '&copy; Esri World Imagery',
          maxZoom: 19
        }
      };
    }

    if (style === 'osm') {
      return {
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        options: {
          attribution: '&copy; OpenStreetMap contributors',
          subdomains: ['a', 'b', 'c'],
          maxZoom: 19
        }
      };
    }

    // Default: Clean CartoDB Voyager (No undefined {r} tokens!)
    return {
      url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png',
      options: {
        attribution: '&copy; OpenStreetMap &copy; CARTO',
        subdomains: ['a', 'b', 'c', 'd'],
        maxZoom: 19
      }
    };
  };

  // 3. Initialize & Mount Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [userLocation.lat, userLocation.lng],
        zoom: radiusKm <= 5 ? 14 : radiusKm <= 15 ? 12 : 11,
        zoomControl: false,
        attributionControl: false
      });

      // Add Tile Layer
      const tileConfig = getTileConfig(mapStyle, mapboxApiKey);
      tileLayerRef.current = L.tileLayer(tileConfig.url, tileConfig.options).addTo(map);

      // Add Zoom Control at top right
      L.control.zoom({ position: 'topright' }).addTo(map);

      // Radius circle
      L.circle([userLocation.lat, userLocation.lng], {
        radius: radiusKm * 1000,
        color: '#059669',
        fillColor: '#10b981',
        fillOpacity: 0.08,
        weight: 2,
        dashArray: '6, 6'
      }).addTo(map);

      // User location radar pulse
      const userIcon = L.divIcon({
        className: 'user-pin-pulse',
        html: `
          <div style="position:relative; width:30px; height:30px; display:flex; align-items:center; justify-content:center;">
            <div style="position:absolute; width:26px; height:26px; background:#10b981; opacity:0.4; border-radius:50%; animation:ping 1.5s cubic-bezier(0,0,0.2,1) infinite;"></div>
            <div style="width:14px; height:14px; background:#059669; border:2px solid white; border-radius:50%; box-shadow:0 2px 4px rgba(0,0,0,0.3); z-index:10;"></div>
          </div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });

      L.marker([userLocation.lat, userLocation.lng], { icon: userIcon })
        .addTo(map)
        .bindPopup(isAr ? 'موقعك المختار' : 'Votre position');

      markersGroupRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    }

    // Force Leaflet to recalculate container dimensions (Fixes blank map issues in tabs/flex)
    const resizeTimer1 = setTimeout(() => {
      if (mapInstanceRef.current) mapInstanceRef.current.invalidateSize();
    }, 100);
    const resizeTimer2 = setTimeout(() => {
      if (mapInstanceRef.current) mapInstanceRef.current.invalidateSize();
    }, 400);

    return () => {
      clearTimeout(resizeTimer1);
      clearTimeout(resizeTimer2);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [userLocation, radiusKm]);

  // Update map style if user changes style or API key
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    if (tileLayerRef.current) {
      mapInstanceRef.current.removeLayer(tileLayerRef.current);
    }
    const tileConfig = getTileConfig(mapStyle, mapboxApiKey);
    tileLayerRef.current = L.tileLayer(tileConfig.url, tileConfig.options).addTo(mapInstanceRef.current);
    tileLayerRef.current.bringToBack();
  }, [mapStyle, mapboxApiKey]);

  // 4. Update markers on the map when price records change
  useEffect(() => {
    if (!mapInstanceRef.current || !markersGroupRef.current) return;

    markersGroupRef.current.clearLayers();
    if (priceRecords.length === 0) return;

    const minPrice = priceRecords[0].price_dzd;
    const maxPrice = priceRecords[priceRecords.length - 1].price_dzd;

    priceRecords.forEach((item) => {
      const isCheapest = item.price_dzd === minPrice;
      const isSelected = selectedRecord && selectedRecord.id === item.id;
      const isPromo = item.is_promo;

      let badgeHtml = '';
      let pinBg = '#334155';
      let pinBorder = '#1e293b';
      let textColor = '#ffffff';

      if (isPromo) {
        badgeHtml = `<span style="background:#f59e0b; color:#0f172a; font-weight:900; font-size:9px; padding:2px 6px; border-radius:9999px; box-shadow:0 2px 4px rgba(0,0,0,0.15); margin-bottom:2px; white-space:nowrap;">⚡ ${isAr ? 'تخفيض خاص' : 'PROMO'}</span>`;
        pinBg = '#f59e0b';
        pinBorder = '#d97706';
        textColor = '#0f172a';
      } else if (isCheapest) {
        badgeHtml = `<span style="background:#059669; color:#ffffff; font-weight:900; font-size:10px; padding:2px 8px; border-radius:9999px; box-shadow:0 2px 4px rgba(0,0,0,0.15); margin-bottom:2px; white-space:nowrap; border:1px solid #34d399;">🏆 ${isAr ? 'الأرخص' : 'Le moins cher'}</span>`;
        pinBg = '#047857';
        pinBorder = '#10b981';
      } else if (item.price_dzd > minPrice + (maxPrice - minPrice) * 0.5) {
        pinBg = '#e11d48';
        pinBorder = '#be123c';
      } else {
        pinBg = '#d97706';
        pinBorder = '#b45309';
      }

      const markerHtml = `
        <div style="cursor:pointer; display:flex; flex-direction:column; align-items:center; transform:${isSelected ? 'scale(1.2)' : 'scale(1)'}; transition:transform 0.2s;">
          ${badgeHtml}
          <div style="background:${pinBg}; border:2px solid ${pinBorder}; color:${textColor}; font-weight:900; font-size:13px; padding:4px 8px; border-radius:12px; box-shadow:0 4px 10px rgba(0,0,0,0.3); display:flex; align-items:center; gap:2px;">
            <span>${item.price_dzd}</span>
            <span style="font-size:9px; opacity:0.9;">DA</span>
          </div>
          <div style="width:6px; height:6px; background:#0f172a; border-radius:50%; margin-top:2px;"></div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-leaflet-pin',
        html: markerHtml,
        iconSize: [80, 50],
        iconAnchor: [40, 45]
      });

      const marker = L.marker([item.store.lat, item.store.lng], { icon: customIcon });

      marker.on('click', () => {
        setSelectedRecord(item);
      });

      marker.addTo(markersGroupRef.current);
    });

    // Make sure map sizes properly after markers are added
    if (mapInstanceRef.current) {
      mapInstanceRef.current.invalidateSize();
    }
  }, [priceRecords, selectedRecord, isAr]);

  // Handle community vote
  const handleVote = async (isUpvote) => {
    if (!selectedRecord) return;
    setVoteError('');
    setVoteSuccess('');

    try {
      await submitVote(selectedRecord.id, selectedProduct.id, isUpvote);
      setVoteSuccess(isAr ? 'شكراً! تم تأكيد تقييمك' : 'Merci ! Vote enregistré');

      setPriceRecords((prev) =>
        prev.map((r) =>
          r.id === selectedRecord.id
            ? {
                ...r,
                upvotes: isUpvote ? r.upvotes + 1 : r.upvotes,
                downvotes: !isUpvote ? r.downvotes + 1 : r.downvotes
              }
            : r
        )
      );
      setSelectedRecord((prev) => ({
        ...prev,
        upvotes: isUpvote ? prev.upvotes + 1 : prev.upvotes,
        downvotes: !isUpvote ? prev.downvotes + 1 : prev.downvotes
      }));
    } catch (err) {
      setVoteError(err.message);
    }
  };

  const saveMapboxKey = () => {
    localStorage.setItem('macdi_mapbox_key', tempApiKey.trim());
    setMapboxApiKey(tempApiKey.trim());
    if (tempApiKey.trim()) {
      setMapStyle('mapbox');
    }
    setShowStyleModal(false);
  };

  return (
    <div className="max-w-md mx-auto flex flex-col h-[calc(100vh-95px)] relative overflow-hidden bg-slate-100">
      
      {/* Top Floating Control Bar */}
      <div className="absolute top-3 left-3 right-3 z-[1000] flex items-center justify-between gap-2 pointer-events-none">
        
        {/* Product & Best Price Badge */}
        <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-lg border border-slate-200 pointer-events-auto flex items-center gap-2">
          <span className="text-2xl">{selectedProduct.image}</span>
          <div className="text-left">
            <p className="font-extrabold text-xs text-slate-900 truncate max-w-[130px]">
              {isAr ? selectedProduct.name_ar : selectedProduct.name_fr}
            </p>
            <p className="text-[10px] text-dzgreen-700 font-black">
              {priceRecords.length > 0
                ? `${isAr ? 'ابتداءً من' : 'Dès'} ${priceRecords[0].price_dzd} DA`
                : '...'}
            </p>
          </div>
        </div>

        {/* Action Buttons: Layers, Refresh, Promo */}
        <div className="flex items-center gap-1.5 pointer-events-auto">
          
          {/* Map Style & API Key Switcher */}
          <button
            onClick={() => setShowStyleModal(true)}
            className="p-2.5 bg-white/95 backdrop-blur-md hover:bg-white text-slate-700 rounded-xl shadow-lg border border-slate-200 font-bold active:scale-95 transition"
            title="Style de carte / Clé API Mapbox"
          >
            <Layers className="w-4 h-4 text-emerald-700" />
          </button>

          <button
            onClick={loadPrices}
            disabled={loading}
            className="p-2.5 bg-white/95 backdrop-blur-md hover:bg-white text-slate-700 rounded-xl shadow-lg border border-slate-200 font-bold active:scale-95 transition"
            title="Rafraîchir les prix"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-dzgreen-600' : ''}`} />
          </button>

          <button
            onClick={onOpenPromoModal}
            className="px-3 py-2 bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 rounded-xl shadow-lg font-black text-xs flex items-center gap-1.5 transition border border-amber-300"
          >
            <Tag className="w-3.5 h-3.5" />
            <span>{isAr ? 'أضف تخفيض' : '+ Promo'}</span>
          </button>
        </div>
      </div>

      {/* 1. Leaflet Map Container with explicit min-height and full width */}
      <div
        ref={mapContainerRef}
        id="macdi-leaflet-map"
        className="w-full flex-1 z-0 relative"
        style={{ minHeight: '380px', height: '100%', width: '100%' }}
      />

      {/* 2. Bottom Sheet: Active Store Details & Trust Engine */}
      {selectedRecord ? (
        <div className="bg-white border-t-2 border-slate-200 shadow-2xl rounded-t-3xl p-4 safe-bottom z-10 space-y-3 shrink-0">
          
          {/* Main Store Banner */}
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-black px-2 py-0.5 rounded-md bg-slate-100 text-slate-800">
                  {selectedRecord.store.type}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  📍 {selectedRecord.store.commune}
                </span>
                <span className="text-xs font-black text-dzgreen-700 bg-dzgreen-50 px-2 py-0.5 rounded-md border border-dzgreen-200">
                  ~ {selectedRecord.distance_km} km
                </span>
              </div>

              <h3 className="font-black text-lg text-slate-900 mt-1">
                {isAr ? selectedRecord.store.name_ar || selectedRecord.store.name : selectedRecord.store.name}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {selectedRecord.store.address}
              </p>
            </div>

            {/* Price in Dinars */}
            <div className="text-right shrink-0">
              <div className="flex items-baseline justify-end gap-1">
                <span className="text-3xl font-black text-dzgreen-600 tracking-tight">
                  {selectedRecord.price_dzd}
                </span>
                <span className="text-sm font-black text-slate-800">DA</span>
              </div>
              <p className="text-[10px] text-slate-400 font-bold">
                {selectedRecord.updated_at}
              </p>
            </div>
          </div>

          {/* Promo Note if applicable */}
          {selectedRecord.is_promo && (
            <div className="bg-amber-50 border border-amber-300 p-2.5 rounded-xl flex items-center justify-between text-xs text-amber-950 font-black">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{selectedRecord.promo_note || (isAr ? 'تخفيض معتمد من التاجر' : 'Offre promotionnelle déclarée')}</span>
              </div>
              {selectedRecord.promo_expires && (
                <span className="text-[10px] bg-amber-200 px-2 py-0.5 rounded-full shrink-0">
                  {selectedRecord.promo_expires}
                </span>
              )}
            </div>
          )}

          {/* Action Buttons: Itinerary & Phone */}
          <div className="grid grid-cols-2 gap-2">
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${selectedRecord.store.lat},${selectedRecord.store.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-3 bg-dzgreen-600 hover:bg-dzgreen-700 active:scale-95 text-white font-black text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-dzgreen-600/20 transition"
            >
              <Navigation className="w-4 h-4" />
              <span>{isAr ? 'الاتجاه عبر الخريطة' : 'Y aller (Itinéraire)'}</span>
            </a>

            <a
              href={`tel:${selectedRecord.store.phone.replace(/\s+/g, '')}`}
              className="py-3 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 transition"
            >
              <Phone className="w-3.5 h-3.5 text-slate-500" />
              <span>{selectedRecord.store.phone}</span>
            </a>
          </div>

          {/* Community Trust Engine & 15-Minute Anti-Spam Control */}
          <div className="pt-1 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-dzgreen-600" />
                <span className="text-xs font-black text-slate-700">
                  {isAr ? 'تأكيد المستهلكين والجيران :' : 'Vérification de la communauté :'}
                </span>
              </div>

              <span className="text-xs font-black text-dzgreen-700 bg-dzgreen-50 px-2 py-0.5 rounded-full border border-dzgreen-200">
                {Math.round(
                  (selectedRecord.upvotes / (selectedRecord.upvotes + selectedRecord.downvotes || 1)) * 100
                )}% {isAr ? 'مؤكد' : 'Vérifié'} ({selectedRecord.upvotes + selectedRecord.downvotes} {isAr ? 'رأي' : 'avis'})
              </span>
            </div>

            {/* Vote Buttons or Active Cooldown Bar */}
            {cooldownSeconds > 0 ? (
              <div className="bg-amber-50/80 p-2.5 rounded-xl border border-amber-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-amber-900 font-bold">
                  <Timer className="w-4 h-4 text-amber-600 animate-spin" />
                  <span>
                    {isAr ? 'حماية من التكرار (15 دقيقة)' : 'Protection anti-spam (15 min)'} :
                  </span>
                </div>
                <span className="font-mono font-black text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-md">
                  ⏳ {formatTime(cooldownSeconds)}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleVote(true)}
                  className="flex-1 py-2.5 bg-emerald-50 hover:bg-emerald-100 active:scale-95 text-emerald-800 border border-emerald-300 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 transition"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{isAr ? 'السعر صحيح 👍' : 'Prix Exact 👍'}</span>
                  <span className="text-[10px] bg-emerald-200 px-1.5 rounded-full font-black">
                    {selectedRecord.upvotes}
                  </span>
                </button>

                <button
                  onClick={() => handleVote(false)}
                  className="flex-1 py-2.5 bg-rose-50 hover:bg-rose-100 active:scale-95 text-rose-800 border border-rose-300 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 transition"
                >
                  <ThumbsDown className="w-3.5 h-3.5" />
                  <span>{isAr ? 'السعر تغير 👎' : 'Prix Faux 👎'}</span>
                  <span className="text-[10px] bg-rose-200 px-1.5 rounded-full font-black">
                    {selectedRecord.downvotes}
                  </span>
                </button>
              </div>
            )}

            {voteError && (
              <p className="text-[11px] text-dzred-600 font-bold mt-1.5 text-center">
                {voteError}
              </p>
            )}
            {voteSuccess && (
              <p className="text-[11px] text-dzgreen-700 font-bold mt-1.5 text-center">
                {voteSuccess}
              </p>
            )}
          </div>

        </div>
      ) : (
        <div className="bg-white p-4 text-center font-bold text-sm text-slate-500">
          {isAr ? 'جاري تحميل المتاجر والأسعار...' : 'Chargement des magasins...'}
        </div>
      )}

      {/* Map Style & API Key Modal */}
      {showStyleModal && (
        <div className="fixed inset-0 z-[2000] bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl space-y-4 border border-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-600" />
                <h3 className="font-black text-slate-900 text-base">
                  {isAr ? 'اختيار نمط الخريطة' : 'Style de la Carte & API Key'}
                </h3>
              </div>
              <button onClick={() => setShowStyleModal(false)} className="p-1 rounded-full hover:bg-slate-100 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tile Options */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setMapStyle('voyager')}
                className={`p-3 rounded-2xl border-2 text-left transition font-bold text-xs ${
                  mapStyle === 'voyager' ? 'border-dzgreen-600 bg-emerald-50 text-emerald-950' : 'border-slate-200'
                }`}
              >
                <span className="text-xl block mb-1">🗺️</span>
                <span>CartoDB Voyager</span>
                <span className="block text-[10px] text-slate-400 font-medium">HD Sans Clé</span>
              </button>

              <button
                type="button"
                onClick={() => setMapStyle('osm')}
                className={`p-3 rounded-2xl border-2 text-left transition font-bold text-xs ${
                  mapStyle === 'osm' ? 'border-dzgreen-600 bg-emerald-50 text-emerald-950' : 'border-slate-200'
                }`}
              >
                <span className="text-xl block mb-1">🌍</span>
                <span>OpenStreetMap</span>
                <span className="block text-[10px] text-slate-400 font-medium">Standard</span>
              </button>

              <button
                type="button"
                onClick={() => setMapStyle('satellite')}
                className={`p-3 rounded-2xl border-2 text-left transition font-bold text-xs ${
                  mapStyle === 'satellite' ? 'border-dzgreen-600 bg-emerald-50 text-emerald-950' : 'border-slate-200'
                }`}
              >
                <span className="text-xl block mb-1">🛰️</span>
                <span>Vue Satellite</span>
                <span className="block text-[10px] text-slate-400 font-medium">ArcGIS Imagerie</span>
              </button>

              <button
                type="button"
                onClick={() => setMapStyle('mapbox')}
                className={`p-3 rounded-2xl border-2 text-left transition font-bold text-xs ${
                  mapStyle === 'mapbox' ? 'border-dzgreen-600 bg-emerald-50 text-emerald-950' : 'border-slate-200'
                }`}
              >
                <span className="text-xl block mb-1">⚡</span>
                <span>Mapbox Streets</span>
                <span className="block text-[10px] text-slate-400 font-medium">Clé requise</span>
              </button>
            </div>

            {/* Optional Mapbox API Key Input */}
            <div className="pt-2 border-t border-slate-100 space-y-1.5">
              <label className="text-xs font-black text-slate-700 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-amber-500" />
                <span>Clé API Mapbox (Optionnelle) :</span>
              </label>
              <input
                type="text"
                value={tempApiKey}
                onChange={(e) => setTempApiKey(e.target.value)}
                placeholder="pk.eyJ1..."
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900 outline-none focus:border-dzgreen-600"
              />
              <p className="text-[10px] text-slate-400">
                Si vous avez un compte Mapbox, collez votre clé publique pour activer le rendu Mapbox Streets haute définition.
              </p>
            </div>

            <button
              onClick={saveMapboxKey}
              className="w-full py-3 bg-dzgreen-600 hover:bg-dzgreen-700 text-white font-black rounded-xl text-xs transition"
            >
              Appliquer le Style
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
