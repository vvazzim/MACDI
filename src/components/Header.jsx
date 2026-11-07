import React from 'react';
import { RefreshCw, Download, ArrowLeft, Volume2, Globe } from 'lucide-react';

export function Header({ step, setStep, lang, setLang, onOpenInstall, selectedProduct }) {
  const isAr = lang === 'ar';

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
              <span className="text-2xl">🇩🇿</span>
              <div>
                <h1 className="font-extrabold text-lg leading-tight tracking-tight">
                  {isAr ? 'أسعار ديزاد' : 'As3ar DZ'}
                </h1>
                <p className="text-[10px] text-dzgreen-100 font-medium">
                  {isAr ? 'مقارن الأسعار التضامني' : 'Comparateur solidaire'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Center: Step Pill */}
        <div className="bg-dzgreen-700/80 px-2.5 py-1 rounded-full text-xs font-bold tracking-wide border border-dzgreen-500/50">
          {isAr ? `خطوة ${step} من 3` : `Étape ${step}/3`}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5">
          {/* Language Toggle */}
          <button
            onClick={() => setLang(isAr ? 'fr' : 'ar')}
            className="px-2 py-1 bg-dzgreen-700 hover:bg-dzgreen-800 rounded-lg text-xs font-bold flex items-center gap-1 transition"
            title="Changer la langue / تغيير اللغة"
          >
            <Globe className="w-3.5 h-3.5 text-dzgreen-200" />
            <span>{isAr ? 'Fr' : 'عربي'}</span>
          </button>

          {/* Pin / Install PWA Button */}
          <button
            onClick={onOpenInstall}
            className="px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-slate-900 rounded-lg text-xs font-black flex items-center gap-1 shadow-sm active:scale-95 transition"
            title="Épingler sur l'écran"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isAr ? 'تثبيت' : 'Installer'}</span>
            <span className="sm:hidden">App</span>
          </button>
        </div>
      </div>

      {/* Breadcrumb strip */}
      <div className="bg-dzgreen-700/90 px-4 py-1.5 text-xs text-dzgreen-100 flex items-center justify-between border-t border-dzgreen-600">
        <div className="truncate font-medium">
          {step === 1 && (isAr ? '1. اختر المنتوج الغذائي' : '1. Choisissez votre produit')}
          {step === 2 && (
            <span>
              2. {isAr ? 'المنطقة و المسافة' : 'Zone & Rayon'} : <strong className="text-white">{selectedProduct ? (isAr ? selectedProduct.name_ar : selectedProduct.name_fr) : ''}</strong>
            </span>
          )}
          {step === 3 && (isAr ? '3. خريطة الأسعار و المتاجر' : '3. Carte des meilleurs prix en Dinar')}
        </div>
        {step > 1 && (
          <button
            onClick={() => setStep(1)}
            className="text-[11px] underline text-amber-200 hover:text-white flex items-center gap-1 shrink-0 ml-2"
          >
            <RefreshCw className="w-3 h-3" />
            <span>{isAr ? 'بداية جديدة' : 'Nouveau'}</span>
          </button>
        )}
      </div>
    </header>
  );
}
