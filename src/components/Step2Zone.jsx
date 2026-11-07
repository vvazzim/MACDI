import React, { useState } from 'react';
import { MapPin, Navigation, Car, Footprints, Compass, ArrowRight, Check } from 'lucide-react';
import { COMMUNE_PRESETS } from '../data/mockData';

export function Step2Zone({ lang, selectedProduct, userLocation, setUserLocation, radiusKm, setRadiusKm, onConfirmZone }) {
  const isAr = lang === 'ar';
  const [isDetectingGps, setIsDetectingGps] = useState(false);
  const [gpsError, setGpsError] = useState('');

  // Handle native GPS auto-detect
  const handleDetectGps = () => {
    if (!navigator.geolocation) {
      setGpsError(isAr ? 'خاصية تحديد الموقع غير مدعومة في متصفحك' : 'Géolocalisation non supportée par votre navigateur');
      return;
    }

    setIsDetectingGps(true);
    setGpsError('');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsDetectingGps(false);
        setUserLocation({
          name: isAr ? 'موقعي الحالي (GPS)' : 'Ma position actuelle (GPS)',
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
      },
      (err) => {
        setIsDetectingGps(false);
        // Fallback default: Bab Ezzouar (Alger)
        setGpsError(
          isAr
            ? 'تعذر تحديد الموقع بدقة، تم اختيار الجزائر العاصمة تلقائياً'
            : 'Position GPS indisponible. Localisation par défaut sur Alger.'
        );
        setUserLocation(COMMUNE_PRESETS[0]);
      },
      { timeout: 8000 }
    );
  };

  const RADIUS_OPTIONS = [
    {
      value: 5,
      label_fr: '3 à 5 km',
      desc_fr: 'Dans mon quartier (à pied)',
      label_ar: '3 إلى 5 كم',
      desc_ar: 'قريب من الحي (مشياً)',
      icon: Footprints
    },
    {
      value: 15,
      label_fr: '15 km (Recommandé)',
      desc_fr: 'En voiture / Transport',
      label_ar: '15 كم (الموصى به)',
      desc_ar: 'بالسيارة أو النقل',
      icon: Car,
      recommended: true
    },
    {
      value: 30,
      label_fr: '30 km',
      desc_fr: 'Toute la Wilaya',
      label_ar: '30 كم',
      desc_ar: 'كامل محيط الولاية',
      icon: Compass
    }
  ];

  return (
    <div className="max-w-md mx-auto p-4 pb-20 space-y-5">
      
      {/* Selected Product Recap Banner */}
      <div className="bg-dzgreen-50 border border-dzgreen-200 rounded-2xl p-3.5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-white rounded-xl shadow-xs">
            {selectedProduct.image}
          </span>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-dzgreen-700 bg-dzgreen-100 px-2 py-0.5 rounded-full">
              {isAr ? 'المنتوج المختار' : 'Produit sélectionné'}
            </span>
            <p className="font-black text-base text-slate-900 mt-0.5">
              {isAr ? selectedProduct.name_ar : selectedProduct.name_fr}
            </p>
            <p className="text-xs text-slate-500 font-medium">
              {selectedProduct.packaging} • {selectedProduct.brand}
            </p>
          </div>
        </div>
      </div>

      {/* Step Title */}
      <div className="text-center pt-1">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          {isAr ? 'حدد منطقتك ومسافة البحث' : 'Où voulez-vous chercher ?'}
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          {isAr
            ? 'اختر البلدية أو استخدم GPS، ثم حدد المسافة القصوى'
            : 'Choisissez votre commune ou le GPS, puis le rayon'}
        </p>
      </div>

      {/* Location Picker Section */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-dzgreen-600" />
            <span>{isAr ? 'البلدية أو الموقع' : 'Commune / Localisation'}</span>
          </label>
          <span className="text-xs font-bold text-dzgreen-700 bg-dzgreen-50 px-2 py-0.5 rounded-md">
            {userLocation.name}
          </span>
        </div>

        {/* GPS Button */}
        <button
          onClick={handleDetectGps}
          disabled={isDetectingGps}
          className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 active:scale-98 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition"
        >
          <Navigation className={`w-4 h-4 text-amber-400 ${isDetectingGps ? 'animate-spin' : ''}`} />
          <span>
            {isDetectingGps
              ? (isAr ? 'جاري تحديد الإحداثيات...' : 'Détection GPS en cours...')
              : (isAr ? 'استخدام موقعي الحالي بالـ GPS' : '📍 Utiliser ma position GPS exacte')}
          </span>
        </button>

        {gpsError && (
          <p className="text-xs text-amber-700 bg-amber-50 p-2 rounded-lg border border-amber-200">
            {gpsError}
          </p>
        )}

        {/* Preset Communes List (Alger / Blida mental model) */}
        <div>
          <span className="text-[11px] font-bold text-slate-400 block mb-1.5">
            {isAr ? 'أو اختر بلدية معروفة مباشرة :' : 'Ou choisissez une commune clé :'}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {COMMUNE_PRESETS.map((preset) => {
              const isSelected = userLocation.name === preset.name;
              return (
                <button
                  key={preset.name}
                  onClick={() => setUserLocation(preset)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                    isSelected
                      ? 'bg-dzgreen-600 text-white shadow-sm ring-2 ring-dzgreen-500/20'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {preset.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Chunky Radius Selector (3 Giant Buttons) */}
      <div className="space-y-2">
        <label className="text-xs font-black uppercase tracking-wider text-slate-500 block px-1">
          {isAr ? 'المسافة القصوى للبحث' : 'Rayon de recherche'}
        </label>

        <div className="space-y-2.5">
          {RADIUS_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            const isSelected = radiusKm === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => setRadiusKm(opt.value)}
                className={`w-full p-4 rounded-2xl border-2 text-left flex items-center justify-between transition-all active:scale-[0.99] ${
                  isSelected
                    ? 'border-dzgreen-600 bg-dzgreen-50/80 shadow-md ring-2 ring-dzgreen-500/20'
                    : 'border-slate-200 bg-white hover:border-slate-300 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`p-3 rounded-xl ${isSelected ? 'bg-dzgreen-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-extrabold text-base text-slate-900">
                        {isAr ? opt.label_ar : opt.label_fr}
                      </p>
                      {opt.recommended && (
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                          {isAr ? 'الأكثر ملائمة' : 'Idéal'}
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-slate-500 mt-0.5">
                      {isAr ? opt.desc_ar : opt.desc_fr}
                    </p>
                  </div>
                </div>

                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  isSelected ? 'border-dzgreen-600 bg-dzgreen-600 text-white' : 'border-slate-300'
                }`}>
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Big Action CTA Button */}
      <div className="pt-2">
        <button
          onClick={onConfirmZone}
          className="w-full py-4 px-6 bg-dzgreen-600 hover:bg-dzgreen-700 active:scale-98 text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-lg shadow-dzgreen-600/30 transition-all"
        >
          <span>{isAr ? 'عرض خريطة الأسعار' : 'Afficher les Meilleurs Prix'}</span>
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>

    </div>
  );
}
