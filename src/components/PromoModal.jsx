import React, { useState } from 'react';
import { X, Tag, Sparkles, Check, Store } from 'lucide-react';
import { STORES } from '../data/mockData';
import { submitSupplierPromo } from '../services/api';

export function PromoModal({ lang, isOpen, onClose, selectedProduct, onSuccess }) {
  const isAr = lang === 'ar';
  const [storeId, setStoreId] = useState(STORES[0].id);
  const [promoPrice, setPromoPrice] = useState('');
  const [promoNote, setPromoNote] = useState('');
  const [durationDays, setDurationDays] = useState(3);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!promoPrice || parseFloat(promoPrice) <= 0) {
      setError(isAr ? 'يرجى إدخال سعر تخفيضي صالح' : 'Veuillez saisir un prix valide');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await submitSupplierPromo({
        productId: selectedProduct.id,
        storeId,
        promoPrice: parseFloat(promoPrice),
        promoNote: promoNote || (isAr ? '⚡ تخفيض خاص من المحل' : '⚡ Promo Spéciale Commerçant'),
        expiresDays: durationDays
      });
      setIsSubmitting(false);
      onSuccess();
      onClose();
    } catch (err) {
      setIsSubmitting(false);
      setError(err.message || 'Erreur enregistrement');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl space-y-4 border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-100 text-amber-800 rounded-xl">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-base">
                {isAr ? 'إعلان تخفيض (للتاجر)' : 'Offre Promo Commerçant'}
              </h3>
              <p className="text-[11px] text-slate-400 font-semibold">
                {isAr ? 'أضف سعرك الترويجي ليظهر في المقدمة' : 'Mettez en avant votre boutique'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Product preview */}
        <div className="bg-slate-50 p-2.5 rounded-xl flex items-center gap-2 text-xs font-bold text-slate-700">
          <span className="text-xl">{selectedProduct.image}</span>
          <span>{isAr ? selectedProduct.name_ar : selectedProduct.name_fr} ({selectedProduct.packaging})</span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          
          {/* Store select */}
          <div>
            <label className="text-xs font-black text-slate-600 block mb-1">
              {isAr ? 'اختر المتجر / المحل :' : 'Sélectionnez votre magasin :'}
            </label>
            <select
              value={storeId}
              onChange={(e) => setStoreId(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-none focus:border-dzgreen-600"
            >
              {STORES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.commune})
                </option>
              ))}
            </select>
          </div>

          {/* Promo Price */}
          <div>
            <label className="text-xs font-black text-slate-600 block mb-1">
              {isAr ? 'السعر المخفض بالدينار (DA) :' : 'Nouveau Prix Promo en Dinars (DA) :'}
            </label>
            <div className="relative">
              <input
                type="number"
                value={promoPrice}
                onChange={(e) => setPromoPrice(e.target.value)}
                placeholder="Ex: 95"
                required
                className="w-full p-3 bg-slate-50 border-2 border-amber-300 rounded-xl text-lg font-black text-slate-900 outline-none focus:border-amber-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 font-black text-slate-400 text-sm">
                DA
              </span>
            </div>
          </div>

          {/* Note or Reason */}
          <div>
            <label className="text-xs font-black text-slate-600 block mb-1">
              {isAr ? 'ملاحظة العرض (اختياري) :' : 'Message promotionnel :'}
            </label>
            <input
              type="text"
              value={promoNote}
              onChange={(e) => setPromoNote(e.target.value)}
              placeholder={isAr ? 'مثال: كمية محدودة، تخفيض نهاية الأسبوع' : 'Ex: Arrivage frais, valable week-end'}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:border-dzgreen-600"
            />
          </div>

          {/* Duration */}
          <div>
            <label className="text-xs font-black text-slate-600 block mb-1">
              {isAr ? 'مدة صلاحية التخفيض :' : 'Durée de la promotion :'}
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {[2, 5, 7].map((days) => (
                <button
                  key={days}
                  type="button"
                  onClick={() => setDurationDays(days)}
                  className={`py-1.5 text-xs font-bold rounded-lg border ${
                    durationDays === days
                      ? 'bg-amber-400 border-amber-500 text-slate-900'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  {days} {isAr ? 'أيام' : 'jours'}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-xs text-rose-600 font-bold">{error}</p>}

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-900 font-black rounded-xl text-sm flex items-center justify-center gap-2 shadow-md transition"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isSubmitting ? 'Publication...' : (isAr ? 'تأكيد ونشر التخفيض' : 'Publier la Promo')}</span>
          </button>
        </form>

      </div>
    </div>
  );
}
