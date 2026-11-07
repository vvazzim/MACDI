import React, { useState, useEffect } from 'react';
import { X, Tag, Sparkles, MapPin, Navigation, AlertCircle, CheckCircle2, Lock } from 'lucide-react';
import { submitSupplierPromoWithGPS } from '../services/api';

export function PromoModal({ lang, isOpen, onClose, selectedProduct, onSuccess }) {
  const isAr = lang === 'ar';

  const [storeName, setStoreName] = useState('');
  const [storeType, setStoreType] = useState('Marché libre');
  const [promoPrice, setPromoPrice] = useState('');
  const [promoNote, setPromoNote] = useState('');
  const [durationDays, setDurationDays] = useState(3);

  // Exact device GPS state
  const [gpsCoords, setGpsCoords] = useState(null);
  const [gpsAccuracy, setGpsAccuracy] = useState(null);
  const [isGettingGps, setIsGettingGps] = useState(false);
  const [gpsError, setGpsError] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Auto-request device GPS when modal opens
  useEffect(() => {
    if (isOpen) {
      captureDeviceGps();
    } else {
      setGpsCoords(null);
      setGpsError('');
      setError('');
    }
  }, [isOpen]);

  const captureDeviceGps = () => {
    if (!navigator.geolocation) {
      setGpsError(
        isAr
          ? 'جهازك لا يدعم خاصية تحديد الموقع الجغرافي GPS'
          : 'Votre appareil ne supporte pas la géolocalisation GPS'
      );
      return;
    }

    setIsGettingGps(true);
    setGpsError('');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsGettingGps(false);
        setGpsCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
        setGpsAccuracy(Math.round(pos.coords.accuracy));
      },
      (err) => {
        setIsGettingGps(false);
        setGpsError(
          isAr
            ? '⚠️ الموقع الدقيق للجهاز إلزامي لنشر المحل أو التخفيض. يرجى تفعيل الـ GPS والسماح للمتصفح بالوصول إليه.'
            : '⚠️ Position exacte de l\'appareil obligatoire pour certifier ce magasin. Veuillez activer votre GPS et autoriser l\'accès.'
        );
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!gpsCoords) {
      setError(
        isAr
          ? 'لا يمكن النشر بدون تحديد الموقع الدقيق للجهاز (GPS)'
          : 'Impossible de publier sans la position GPS exacte de l\'appareil'
      );
      return;
    }

    if (!storeName.trim()) {
      setError(
        isAr ? 'يرجى كتابة اسم محلك أو السوق الحر' : 'Veuillez renseigner le nom de votre magasin ou marché'
      );
      return;
    }

    if (!promoPrice || parseFloat(promoPrice) <= 0) {
      setError(isAr ? 'يرجى إدخال سعر صحيح' : 'Veuillez saisir un prix valide');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await submitSupplierPromoWithGPS({
        productId: selectedProduct.id,
        storeName: storeName.trim(),
        storeType,
        gpsLat: gpsCoords.lat,
        gpsLng: gpsCoords.lng,
        promoPrice: parseFloat(promoPrice),
        promoNote: promoNote || (isAr ? 'تخفيض في الموقع' : 'Prix Promo en direct'),
        expiresDays: durationDays
      });
      setIsSubmitting(false);
      onSuccess();
      onClose();
    } catch (err) {
      setIsSubmitting(false);
      setError(err.message || 'Erreur lors de la publication');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl space-y-4 border border-slate-100 max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2.5 bg-amber-100 text-amber-800 rounded-2xl shadow-xs">
              <Tag className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-base leading-tight">
                {isAr ? 'إعلان تخفيض أو سوق حر' : 'Ajouter un Magasin / Promo'}
              </h3>
              <p className="text-[11px] text-slate-400 font-bold">
                {isAr ? 'موقع الجهاز الدقيق إلزامي للتوثيق' : 'Localisation GPS de l\'appareil obligatoire'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Product info */}
        <div className="bg-dzgreen-50/70 border border-dzgreen-200 p-2.5 rounded-xl flex items-center gap-2 text-xs font-bold text-slate-800">
          <span className="text-xl">{selectedProduct.image}</span>
          <span>{isAr ? selectedProduct.name_ar : selectedProduct.name_fr} ({selectedProduct.packaging})</span>
        </div>

        {/* GPS Certification Module (MANDATORY) */}
        <div className={`p-3 rounded-2xl border-2 transition-all ${
          gpsCoords
            ? 'bg-emerald-50/80 border-emerald-400 text-emerald-950'
            : 'bg-amber-50/80 border-amber-300 text-amber-950'
        }`}>
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <MapPin className={`w-5 h-5 shrink-0 ${gpsCoords ? 'text-emerald-600' : 'text-amber-600'}`} />
              <div>
                <p className="font-black text-xs">
                  {gpsCoords
                    ? (isAr ? '✅ تم توثيق موقع جهازك بالـ GPS' : '✅ Position GPS certifiée en direct')
                    : (isAr ? 'تحديد موقع جهازك (إلزامي)' : 'Position exacte requise (Obligatoire)')}
                </p>
                {gpsCoords ? (
                  <p className="text-[10px] text-emerald-800 font-mono mt-0.5 font-bold">
                    Lat: {gpsCoords.lat.toFixed(4)}, Lng: {gpsCoords.lng.toFixed(4)} (±{gpsAccuracy}m)
                  </p>
                ) : (
                  <p className="text-[10px] text-amber-800 font-medium mt-0.5">
                    {isAr
                      ? 'لمنع المحلات الوهمية، يجب أن تكون في الموقع الفعلي'
                      : 'Certifie que vous êtes réellement sur place'}
                  </p>
                )}
              </div>
            </div>

            {!gpsCoords && (
              <button
                type="button"
                onClick={captureDeviceGps}
                disabled={isGettingGps}
                className="py-1.5 px-3 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-black shadow-xs shrink-0 flex items-center gap-1 active:scale-95"
              >
                <Navigation className={`w-3.5 h-3.5 ${isGettingGps ? 'animate-spin' : ''}`} />
                <span>{isGettingGps ? '...' : (isAr ? 'تفعيل' : 'Activer')}</span>
              </button>
            )}
          </div>

          {gpsError && (
            <p className="text-[11px] font-bold text-rose-700 bg-rose-50 p-2 rounded-xl mt-2 border border-rose-200">
              {gpsError}
            </p>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          
          {/* Custom Store or Free Market Name */}
          <div>
            <label className="text-xs font-black text-slate-700 block mb-1">
              {isAr ? 'اسم المحل أو السوق الحر :' : 'Nom de votre magasin ou marché libre :'}
            </label>
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              placeholder={isAr ? 'مثال: سوبرماركت الأمل، سوق الجمعة، دكان الحي' : 'Ex: Supérette El Baraka, Souk El Fellah, Hanout Cité'}
              required
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-dzgreen-600 focus:bg-white"
            />
          </div>

          {/* Store Type */}
          <div>
            <label className="text-xs font-black text-slate-700 block mb-1">
              {isAr ? 'نوع النشاط :' : 'Type d\'établissement :'}
            </label>
            <select
              value={storeType}
              onChange={(e) => setStoreType(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-none focus:border-dzgreen-600"
            >
              <option value="Supérette">{isAr ? 'سوبرماركت / ميني ماركت' : 'Supérette'}</option>
              <option value="Marché libre">{isAr ? 'سوق حر / سوق شعبي' : 'Marché libre / Souk'}</option>
              <option value="Alimentation Générale">{isAr ? 'تغذية عامة (حانوت حي)' : 'Alimentation Générale (Hanout)'}</option>
              <option value="Grossiste">{isAr ? 'تاجر جملة وتجزئة' : 'Grossiste & Détail'}</option>
              <option value="Point de vente direct">{isAr ? 'نقطة بيع مباشرة' : 'Point de vente direct'}</option>
            </select>
          </div>

          {/* Promo Price */}
          <div>
            <label className="text-xs font-black text-slate-700 block mb-1">
              {isAr ? 'السعر بالدينار (DA) :' : 'Prix proposé en Dinars (DA) :'}
            </label>
            <div className="relative">
              <input
                type="number"
                value={promoPrice}
                onChange={(e) => setPromoPrice(e.target.value)}
                placeholder="Ex: 95"
                required
                className="w-full p-3 bg-slate-50 border-2 border-amber-300 rounded-xl text-lg font-black text-slate-950 outline-none focus:border-amber-500 focus:bg-white"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 font-black text-slate-500 text-sm">
                DA
              </span>
            </div>
          </div>

          {/* Promo Note */}
          <div>
            <label className="text-xs font-black text-slate-700 block mb-1">
              {isAr ? 'ملاحظة العرض (اختياري) :' : 'Précision sur l\'offre (optionnel) :'}
            </label>
            <input
              type="text"
              value={promoNote}
              onChange={(e) => setPromoNote(e.target.value)}
              placeholder={isAr ? 'مثال: كمية متوفرة، سلع طازجة' : 'Ex: Arrivage du jour, stock limité'}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:border-dzgreen-600"
            />
          </div>

          {/* Duration */}
          <div>
            <label className="text-xs font-black text-slate-700 block mb-1">
              {isAr ? 'صلاحية التخفيض :' : 'Durée de validité :'}
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {[2, 5, 7].map((days) => (
                <button
                  key={days}
                  type="button"
                  onClick={() => setDurationDays(days)}
                  className={`py-1.5 text-xs font-black rounded-xl border transition ${
                    durationDays === days
                      ? 'bg-amber-400 border-amber-500 text-slate-950 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  {days} {isAr ? 'أيام' : 'jours'}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-xs text-rose-600 font-bold">{error}</p>}

          {/* Submit Button (Locked if no GPS) */}
          <button
            type="submit"
            disabled={!gpsCoords || isSubmitting}
            className={`w-full py-3.5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
              !gpsCoords
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                : 'bg-amber-400 hover:bg-amber-300 text-slate-950 active:scale-98 shadow-amber-400/25'
            }`}
          >
            {!gpsCoords ? (
              <>
                <Lock className="w-4 h-4 text-slate-400" />
                <span>{isAr ? 'فعّل الـ GPS أولاً للتأكيد' : 'Activez le GPS pour valider'}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>{isSubmitting ? '...' : (isAr ? 'نشر المحل والتخفيض' : 'Publier le Magasin & Prix')}</span>
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
}
