import React from 'react';
import { RefreshCw, Download, ArrowLeft, Globe, ShoppingBag } from 'lucide-react';

export function Header({ step, setStep, lang, setLang, onOpenInstall, selectedProduct }) {
  const isAr = lang === 'ar';

  const getStepTitle = () => {
    if (step === 1) return isAr ? 'اختيار المنتوج' : 'Produit';
    if (step === 2) return isAr ? 'المنطقة و المسافة' : 'Zone & Rayon';
    return isAr ? 'خريطة الأسعار' : 'Carte des Prix';
  };

  return (
    <header className="sticky top-0 z-50 bg-dzgreen-600 text-white shadow-md safe-top">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Left: Back or Brand */}
        <div className="flex items-center gap-2">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="p-2 -ml-2 rounded-full hover:bg-dzgreen-700 active:scale-95 transition-transform flex items-center gap-1 font-semibold text-sm"
              aria-label="Retour"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>{isAr ? 'رجوع' : 'Retour'}</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-amber-300 shadow-xs">
                <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h1 className="font-black text-xl leading-none tracking-tight">
                  {isAr ? 'ماكدي' : 'MACDI'}
                </h1>
                <p className="text-[10px] text-dzgreen-100 font-bold uppercase tracking-wider mt-0.5">
                  {isAr ? 'مقارن الأسعار الذكي' : 'Prix Alimentaires'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Center: Current View Pill (Without 1. 2. 3.) */}
        <div className="bg-dzgreen-700/90 px-3 py-1 rounded-full text-xs font-black tracking-wide border border-dzgreen-500/50 shadow-xs">
          {getStepTitle()}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5">
          {/* Language Toggle */}
          <button
            onClick={() => setLang(isAr ? 'fr' : 'ar')}
            className="px-2.5 py-1.5 bg-dzgreen-700 hover:bg-dzgreen-800 rounded-xl text-xs font-black flex items-center gap-1.5 transition active:scale-95 border border-dzgreen-500/40"
            title="Changer la langue / تغيير اللغة"
          >
            <Globe className="w-3.5 h-3.5 text-dzgreen-200" />
            <span>{isAr ? 'Français' : 'عربي'}</span>
          </button>

          {/* Pin / Install PWA Button */}
          <button
            onClick={onOpenInstall}
            className="px-2.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-900 rounded-xl text-xs font-black flex items-center gap-1 shadow-sm active:scale-95 transition"
            title="Épingler sur l'écran d'accueil"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isAr ? 'تثبيت' : 'Installer'}</span>
            <span className="sm:hidden">App</span>
          </button>
        </div>
      </div>

      {/* Sub-strip with context (No 1. 2. 3.) */}
      <div className="bg-dzgreen-700/95 px-4 py-1.5 text-xs text-dzgreen-100 flex items-center justify-between border-t border-dzgreen-600/70">
        <div className="truncate font-semibold">
          {step === 1 && (isAr ? 'اختر المنتوج لمقارنة أسعاره' : 'Touchez un article pour comparer les prix')}
          {step === 2 && (
            <span>
              {isAr ? 'البحث عن' : 'Recherche pour'} : <strong className="text-white font-extrabold">{selectedProduct ? (isAr ? selectedProduct.name_ar : selectedProduct.name_fr) : ''}</strong>
            </span>
          )}
          {step === 3 && (isAr ? 'المتاجر والأسعار الأقرب إليك' : 'Prix observés dans votre secteur')}
        </div>
        {step > 1 && (
          <button
            onClick={() => setStep(1)}
            className="text-[11px] font-bold text-amber-200 hover:text-white flex items-center gap-1 shrink-0 ml-2"
          >
            <RefreshCw className="w-3 h-3" />
            <span>{isAr ? 'منتوج آخر' : 'Changer'}</span>
          </button>
        )}
      </div>
    </header>
  );
}
