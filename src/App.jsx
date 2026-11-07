import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Step1Product } from './components/Step1Product';
import { Step2Zone } from './components/Step2Zone';
import { Step3Map } from './components/Step3Map';
import { PromoModal } from './components/PromoModal';
import { InstallModal } from './components/InstallModal';
import { PRODUCTS, COMMUNE_PRESETS } from './data/mockData';

export function App() {
  const [lang, setLang] = useState('fr'); // 'fr' or 'ar'
  const [step, setStep] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
  const [userLocation, setUserLocation] = useState(COMMUNE_PRESETS[0]);
  const [radiusKm, setRadiusKm] = useState(15);

  const [isPromoOpen, setIsPromoOpen] = useState(false);
  const [isInstallOpen, setIsInstallOpen] = useState(false);
  const [showBottomInstallBanner, setShowBottomInstallBanner] = useState(true);

  // Sync RTL direction based on language
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setStep(2); // Auto proceed to Step 2
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfirmZone = () => {
    setStep(3); // Auto proceed to Step 3
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans select-none antialiased">
      
      {/* Header with Bilingual & Step Navigation */}
      <Header
        step={step}
        setStep={setStep}
        lang={lang}
        setLang={setLang}
        onOpenInstall={() => setIsInstallOpen(true)}
        selectedProduct={selectedProduct}
      />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-md mx-auto bg-slate-50 relative shadow-xl overflow-x-hidden">
        
        {step === 1 && (
          <Step1Product
            lang={lang}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {step === 2 && (
          <Step2Zone
            lang={lang}
            selectedProduct={selectedProduct}
            userLocation={userLocation}
            setUserLocation={setUserLocation}
            radiusKm={radiusKm}
            setRadiusKm={setRadiusKm}
            onConfirmZone={handleConfirmZone}
          />
        )}

        {step === 3 && (
          <Step3Map
            lang={lang}
            selectedProduct={selectedProduct}
            userLocation={userLocation}
            radiusKm={radiusKm}
            onOpenPromoModal={() => setIsPromoOpen(true)}
          />
        )}

        {/* Floating PWA Install Bar for Mobile */}
        {showBottomInstallBanner && step !== 3 && (
          <div className="fixed bottom-3 left-4 right-4 max-w-sm mx-auto z-40 bg-slate-900 text-white p-3 rounded-2xl shadow-xl flex items-center justify-between border border-slate-700 animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">📲</span>
              <div className="text-left">
                <p className="text-xs font-black">
                  {lang === 'ar' ? 'تثبيت على الهاتف' : 'Épingler sur l\'écran'}
                </p>
                <p className="text-[10px] text-slate-300">
                  {lang === 'ar' ? 'استعمله كتطبيق بدون تحميل' : 'Accès direct sans navigateur'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsInstallOpen(true)}
                className="px-2.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold text-[11px] rounded-xl shadow-xs"
              >
                {lang === 'ar' ? 'طريقة التثبيت' : 'Comment faire'}
              </button>
              <button
                onClick={() => setShowBottomInstallBanner(false)}
                className="text-slate-400 hover:text-white p-1 text-sm font-bold"
              >
                ✕
              </button>
            </div>
          </div>
        )}

      </main>

      {/* Modals */}
      <PromoModal
        lang={lang}
        isOpen={isPromoOpen}
        onClose={() => setIsPromoOpen(false)}
        selectedProduct={selectedProduct}
        onSuccess={() => {
          // Trigger refresh if needed
        }}
      />

      <InstallModal
        lang={lang}
        isOpen={isInstallOpen}
        onClose={() => setIsInstallOpen(false)}
      />

    </div>
  );
}
export default App;
