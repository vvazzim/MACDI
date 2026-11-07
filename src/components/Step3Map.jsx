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
  Timer
} from 'lucide-react';
import {
  fetchPricesForProduct,
  submitVote,
  getCooldownStatus,
  formatTime
} from '../services/api';

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
  const markersGroupRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [priceRecords, setPriceRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  
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
        setSelectedRecord(results[0]); // Best price selected by default
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

  // 3. Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Create Map centered on user position
      const map = L.map(mapContainerRef.current, {
        center: [userLocation.lat, userLocation.lng],
        zoom: radiusKm <= 5 ? 14 : radiusKm <= 15 ? 12 : 11,
        zoomControl: false
      });

      // Add CartoDB Positron / OSM tiles for ultra-clean look
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap &copy; CARTO',
        maxZoom: 19
      }).addTo(map);

      // Add Zoom control on top right
      L.control.zoom({ position: 'topright' }).addTo(map);

      // Radius circle
      L.circle([userLocation.lat, userLocation.lng], {
        radius: radiusKm * 1000,
        color: '#059669',
        fillColor: '#10b981',
        fillOpacity: 0.08,
        weight: 1.5,
        dashArray: '4, 4'
      }).addTo(map);

      // User location marker
      const userIcon = L.divIcon({
        className: 'user-pin',
        html: `<div class="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg animate-ping"></div>
               <div class="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg -mt-4"></div>`,
        iconSize: [16, 16]
      });
      L.marker([userLocation.lat, userLocation.lng], { icon: userIcon })
        .addTo(map)
        .bindPopup(isAr ? 'موقعك الحالي' : 'Votre position');

      markersGroupRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    }

    // Update map view if center changed
    mapInstanceRef.current.setView([userLocation.lat, userLocation.lng], radiusKm <= 5 ? 14 : 12);

    return () => {
      // Cleanup on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [userLocation, radiusKm]);

  // 4. Update markers on the map when price records change
  useEffect(() => {
    if (!mapInstanceRef.current || !markersGroupRef.current) return;

    markersGroupRef.current.clearLayers();

    if (priceRecords.length === 0) return;

    const minPrice = priceRecords[0].price_dzd;
    const maxPrice = priceRecords[priceRecords.length - 1].price_dzd;

    priceRecords.forEach((item, index) => {
      const isCheapest = item.price_dzd === minPrice;
      const isSelected = selectedRecord && selectedRecord.id === item.id;
      const isPromo = item.is_promo;

      // Color coding logic
      let bgColor = 'bg-amber-500 text-white';
      let borderColor = 'border-amber-600';

      if (isPromo) {
        bgColor = 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900 font-black';
        borderColor = 'border-yellow-400 shadow-amber-300/50';
      } else if (isCheapest) {
        bgColor = 'bg-dzgreen-600 text-white';
        borderColor = 'border-dzgreen-700';
      } else if (item.price_dzd > minPrice + (maxPrice - minPrice) * 0.5) {
        bgColor = 'bg-rose-600 text-white';
        borderColor = 'border-rose-700';
      }

      // Marker HTML with direct DA price label
      const markerHtml = `
        <div class="custom-price-pin cursor-pointer flex flex-col items-center">
          ${isCheapest ? `<span class="bg-dzgreen-800 text-[10px] text-white px-1.5 py-0.2 rounded-full font-black shadow-sm mb-0.5 whitespace-nowrap">🏆 ${isAr ? 'الأرخص' : 'Le - cher'}</span>` : ''}
          ${isPromo ? `<span class="bg-amber-400 text-slate-900 text-[9px] px-1.5 rounded-full font-black mb-0.5 whitespace-nowrap animate-bounce">⚡ PROMO</span>` : ''}
          <div class="px-2.5 py-1 rounded-xl shadow-lg border-2 ${borderColor} ${bgColor} font-black text-xs flex items-center gap-1 ${
            isSelected ? 'ring-4 ring-slate-900 scale-110' : ''
          }">
            <span>${item.price_dzd}</span>
            <span class="text-[10px] font-bold">DA</span>
          </div>
          <div class="w-1.5 h-1.5 bg-slate-800 rounded-full mt-0.5"></div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'price-pin-icon',
        html: markerHtml,
        iconSize: [60, 40],
        iconAnchor: [30, 35]
      });

      const marker = L.marker([item.store.lat, item.store.lng], { icon: customIcon });

      marker.on('click', () => {
        setSelectedRecord(item);
      });

      marker.addTo(markersGroupRef.current);
    });
  }, [priceRecords, selectedRecord]);

  // Handle community vote
  const handleVote = async (isUpvote) => {
    if (!selectedRecord) return;
    setVoteError('');
    setVoteSuccess('');

    try {
      await submitVote(selectedRecord.id, selectedProduct.id, isUpvote);
      setVoteSuccess(isAr ? 'شكراً! تم تسجيل تقييمك' : 'Merci ! Vote pris en compte');

      // Optimistic update
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

  return (
    <div className="max-w-md mx-auto flex flex-col h-[calc(100vh-100px)] relative overflow-hidden">
      
      {/* Top Floating Control Bar */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between gap-2 pointer-events-none">
        
        {/* Product & Best Price Badge */}
        <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-md border border-slate-200 pointer-events-auto flex items-center gap-2">
          <span className="text-xl">{selectedProduct.image}</span>
          <div className="text-left">
            <p className="font-extrabold text-xs text-slate-900 truncate max-w-[140px]">
              {isAr ? selectedProduct.name_ar : selectedProduct.name_fr}
            </p>
            <p className="text-[10px] text-dzgreen-700 font-bold">
              {priceRecords.length > 0 ? `${isAr ? 'من' : 'Dès'} ${priceRecords[0].price_dzd} DA` : 'Recherche...'}
            </p>
          </div>
        </div>

        {/* Refresh & Promo Buttons */}
        <div className="flex items-center gap-1.5 pointer-events-auto">
          <button
            onClick={loadPrices}
            disabled={loading}
            className="p-2.5 bg-white hover:bg-slate-50 text-slate-700 rounded-xl shadow-md border border-slate-200 font-bold active:scale-95 transition"
            title="Rafraîchir les prix"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-dzgreen-600' : ''}`} />
          </button>

          <button
            onClick={onOpenPromoModal}
            className="px-3 py-2 bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-900 rounded-xl shadow-md font-black text-xs flex items-center gap-1 transition"
          >
            <Tag className="w-3.5 h-3.5" />
            <span>{isAr ? 'أضف تخفيض' : '+ Promo'}</span>
          </button>
        </div>
      </div>

      {/* 1. Leaflet Map Container */}
      <div ref={mapContainerRef} className="w-full flex-1 z-0" />

      {/* 2. Bottom Sheet: Active Store Details & Trust Engine */}
      {selectedRecord ? (
        <div className="bg-white border-t-2 border-slate-200 shadow-2xl rounded-t-3xl p-4 safe-bottom z-10 space-y-3">
          
          {/* Main Store Banner */}
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-black px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                  {selectedRecord.store.type}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  📍 {selectedRecord.store.commune}
                </span>
                <span className="text-xs font-extrabold text-dzgreen-700 bg-dzgreen-50 px-2 py-0.5 rounded-md">
                  ~ {selectedRecord.distance_km} km
                </span>
              </div>

              <h3 className="font-black text-lg text-slate-900 mt-1">
                {isAr ? selectedRecord.store.name_ar : selectedRecord.store.name}
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                {selectedRecord.store.address}
              </p>
            </div>

            {/* Giant Price in DA */}
            <div className="text-right shrink-0">
              <div className="flex items-baseline justify-end gap-1">
                <span className="text-3xl font-black text-dzgreen-600 tracking-tight">
                  {selectedRecord.price_dzd}
                </span>
                <span className="text-sm font-black text-slate-700">DA</span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">
                {selectedRecord.updated_at}
              </p>
            </div>
          </div>

          {/* Promo Note if applicable */}
          {selectedRecord.is_promo && (
            <div className="bg-amber-50 border border-amber-300 p-2.5 rounded-xl flex items-center justify-between text-xs text-amber-900 font-bold">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{selectedRecord.promo_note || 'Offre promotionnelle gérée par le magasin'}</span>
              </div>
              {selectedRecord.promo_expires && (
                <span className="text-[10px] bg-amber-200 px-2 py-0.5 rounded-full shrink-0">
                  {selectedRecord.promo_expires}
                </span>
              )}
            </div>
          )}

          {/* Action Row: Google Maps Link & Call */}
          <div className="grid grid-cols-2 gap-2">
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${selectedRecord.store.lat},${selectedRecord.store.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 bg-dzgreen-600 hover:bg-dzgreen-700 active:scale-95 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition"
            >
              <Navigation className="w-4 h-4" />
              <span>{isAr ? 'الاتجاه عبر الخريطة' : 'Y aller (Itinéraire)'}</span>
            </a>

            <a
              href={`tel:${selectedRecord.store.phone.replace(/\s+/g, '')}`}
              className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition"
            >
              <Phone className="w-3.5 h-3.5 text-slate-500" />
              <span>{selectedRecord.store.phone}</span>
            </a>
          </div>

          {/* Community Trust Engine & 15-Minute Anti-Spam */}
          <div className="pt-1 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-dzgreen-600" />
                <span className="text-xs font-black text-slate-700">
                  {isAr ? 'تقييم الجيران والمستهلكين :' : 'Vérification de la communauté :'}
                </span>
              </div>

              {/* Calculated Trust Score */}
              <span className="text-xs font-extrabold text-dzgreen-700 bg-dzgreen-50 px-2 py-0.5 rounded-full border border-dzgreen-200">
                {Math.round(
                  (selectedRecord.upvotes / (selectedRecord.upvotes + selectedRecord.downvotes || 1)) * 100
                )}% {isAr ? 'مؤكد' : 'Vérifié'} ({selectedRecord.upvotes + selectedRecord.downvotes} {isAr ? 'رأي' : 'avis'})
              </span>
            </div>

            {/* Vote Buttons or Active Cooldown Bar */}
            {cooldownSeconds > 0 ? (
              <div className="bg-slate-100 p-2.5 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-600 font-semibold">
                  <Timer className="w-4 h-4 text-amber-500 animate-spin" />
                  <span>
                    {isAr ? 'نظام الحماية من التكرار نشط' : 'Verrou anti-spam actif'} :
                  </span>
                </div>
                <span className="font-mono font-black text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">
                  ⏳ {formatTime(cooldownSeconds)}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleVote(true)}
                  className="flex-1 py-2 bg-emerald-50 hover:bg-emerald-100 active:scale-95 text-emerald-800 border border-emerald-300 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{isAr ? 'السعر صحيح 👍' : 'Prix Exact 👍'}</span>
                  <span className="text-[10px] bg-emerald-200 px-1.5 rounded-full font-black">
                    {selectedRecord.upvotes}
                  </span>
                </button>

                <button
                  onClick={() => handleVote(false)}
                  className="flex-1 py-2 bg-rose-50 hover:bg-rose-100 active:scale-95 text-rose-800 border border-rose-300 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition"
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
          {isAr ? 'جاري تحميل المتاجر...' : 'Chargement des magasins...'}
        </div>
      )}

    </div>
  );
}
