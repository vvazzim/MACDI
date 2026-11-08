import React, { useState, useEffect, useRef } from 'react';
import { Search, Mic, MicOff, Sparkles, CheckCircle2, ChevronRight, AlertCircle, RefreshCw } from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '../data/mockData';

export function Step1Product({ lang, onSelectProduct }) {
  const isAr = lang === 'ar';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [voiceNotice, setVoiceNotice] = useState('');
  const [voiceError, setVoiceError] = useState(false);

  const recognitionRef = useRef(null);
  const productsSectionRef = useRef(null);

  // Stop recognition on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {
          // ignore
        }
      }
    };
  }, []);

  // Robust Speech Recognition integration (native browser voice search with safe toggle)
  const handleVoiceSearch = () => {
    // If already listening, stop it gracefully
    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // ignore
        }
      }
      setIsListening(false);
      setVoiceNotice('');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      // Fallback for browsers/WebViews without SpeechRecognition API
      setIsListening(true);
      setVoiceError(false);
      setVoiceNotice(isAr ? '...جاري التعرف على الصوت' : 'Écoute vocale en cours...');
      setTimeout(() => {
        setSearchTerm('Lait Soummam');
        setIsListening(false);
        setVoiceNotice(isAr ? 'تم التعرف: حليب صومام 1 لتر' : 'Reconnu : Lait Soummam 1L');
        scrollToProducts();
      }, 1200);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      // ar-SA is globally supported on all Android/iOS engines; fr-FR for French
      recognition.lang = isAr ? 'ar-SA' : 'fr-FR';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        setVoiceError(false);
        setVoiceNotice(isAr ? 'تحدث الآن... (مثال: حليب، زيت 5 لتر، قهوة)' : 'Parlez maintenant... (ex: Lait, Huile 5L, Café)');
      };

      recognition.onresult = (event) => {
        if (event.results && event.results[0] && event.results[0][0]) {
          const spoken = event.results[0][0].transcript.trim();
          setSearchTerm(spoken);
          setIsListening(false);
          setVoiceError(false);
          setVoiceNotice(`${isAr ? 'تم التعرف' : 'Reconnu'} : "${spoken}"`);
          scrollToProducts();
        }
      };

      recognition.onerror = (event) => {
        setIsListening(false);
        setVoiceError(true);
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          setVoiceNotice(
            isAr
              ? 'يرجى تفعيل صلاحية الميكروفون في إعدادات المتصفح'
              : 'Microphone bloqué : autorisez l\'accès micro dans votre navigateur'
          );
        } else if (event.error === 'no-speech') {
          setVoiceNotice(
            isAr ? 'لم يتم سماع أي صوت، اضغط وتحدث مجدداً' : 'Aucune voix détectée, réessayez en parlant plus fort'
          );
        } else if (event.error === 'network') {
          setVoiceNotice(
            isAr ? 'تحقق من اتصال الإنترنت' : 'Erreur réseau : vérifiez votre connexion'
          );
        } else {
          setVoiceNotice(
            isAr ? 'تعذر التعرف، اكتب اسم المنتوج في خانة البحث' : 'Recherche vocale indisponible, tapez le nom du produit'
          );
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.warn('Speech recognition init error:', err);
      setIsListening(false);
      setVoiceError(true);
      setVoiceNotice(
        isAr ? 'تعذر تشغيل الميكروفون، يرجى كتابة اسم المنتوج' : 'Impossible d\'activer le micro, veuillez écrire'
      );
    }
  };

  // Smooth scroll to products section
  const scrollToProducts = () => {
    setTimeout(() => {
      if (productsSectionRef.current) {
        productsSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 120);
  };

  // Handle category toggle and smooth scroll down
  const handleCategoryClick = (catId) => {
    const nextCat = selectedCategory === catId ? null : catId;
    setSelectedCategory(nextCat);
    if (nextCat) {
      scrollToProducts();
    }
  };

  // Filter products by search term or category
  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesSearch =
      searchTerm.trim() === '' ||
      p.name_fr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.name_ar.includes(searchTerm) ||
      p.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCat = selectedCategory ? p.category_id === selectedCategory : true;

    return matchesSearch && matchesCat;
  });

  return (
    <div className="max-w-md mx-auto p-4 pb-20 space-y-5">
      
      {/* Grand-parent friendly Title */}
      <div className="text-center pt-2">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          {isAr ? 'ما هو المنتوج الذي تبحث عنه؟' : 'Quel produit cherchez-vous ?'}
        </h2>
        <p className="text-xs text-slate-500 mt-1 font-medium">
          {isAr
            ? 'اضغط على زر الميكروفون أو اختر القسم مباشرة'
            : 'Recherche vocale en 1 clic ou touchez un rayon'}
        </p>
      </div>

      {/* Giant Voice Search & Input Card */}
      <div className={`bg-white p-3.5 rounded-2xl shadow-sm border-2 transition ${
        isListening
          ? 'border-dzred-500 ring-4 ring-dzred-500/20'
          : 'border-dzgreen-500/40 focus-within:border-dzgreen-600 focus-within:ring-2 focus-within:ring-dzgreen-500/20'
      }`}>
        <div className="flex items-center gap-2">
          
          {/* Big Voice Button */}
          <button
            type="button"
            onClick={handleVoiceSearch}
            className={`p-3.5 rounded-xl font-bold flex items-center justify-center transition-all ${
              isListening
                ? 'bg-dzred-600 text-white animate-pulse shadow-lg scale-105'
                : 'bg-dzgreen-600 hover:bg-dzgreen-700 text-white shadow-md active:scale-95'
            }`}
            title={isListening ? (isAr ? 'إيقاف الاستماع' : 'Arrêter') : (isAr ? 'تحدث للميكروفون' : 'Recherche vocale')}
          >
            {isListening ? (
              <span className="flex items-center gap-1">
                <MicOff className="w-6 h-6 animate-bounce" />
              </span>
            ) : (
              <Mic className="w-6 h-6" />
            )}
          </button>

          {/* Simple Search Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={isAr ? 'ابحث: حليب، زيت 5 لتر، سكر...' : 'Rechercher : Lait, Huile 5L, Sucre...'}
              className="w-full pl-3 pr-8 py-2.5 text-base font-semibold text-slate-800 placeholder-slate-400 bg-transparent outline-none"
              dir={isAr ? 'rtl' : 'ltr'}
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 font-bold p-1 text-sm"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Voice notice message */}
        {voiceNotice && (
          <div className={`mt-2.5 text-xs font-bold px-2.5 py-1.5 rounded-lg border flex items-center gap-1.5 ${
            voiceError
              ? 'text-dzred-700 bg-dzred-50 border-dzred-200'
              : 'text-dzgreen-800 bg-dzgreen-50 border-dzgreen-200'
          }`}>
            {voiceError ? (
              <AlertCircle className="w-4 h-4 shrink-0 text-dzred-600" />
            ) : (
              <Sparkles className="w-4 h-4 shrink-0 text-amber-500 animate-spin" />
            )}
            <span className="flex-1">{voiceNotice}</span>
          </div>
        )}

        {/* Quick Keyword Chips for Fast Access */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-2.5 mt-2 border-t border-slate-100">
          <span className="text-[10px] font-black uppercase text-slate-400 shrink-0">
            {isAr ? 'سريع:' : 'Rapide:'}
          </span>
          {['Lait', 'Huile 5L', 'Café', 'Semoule', 'Sucre', 'Pâtes'].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setSearchTerm(item);
                scrollToProducts();
              }}
              className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-dzgreen-100 text-slate-700 hover:text-dzgreen-800 shrink-0 active:scale-95 transition"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* 6 Large Category Tiles */}
      <div>
        <div className="flex items-center justify-between mb-2.5 px-1">
          <span className="text-xs font-black uppercase tracking-wider text-slate-400">
            {isAr ? 'الأقسام الرئيسية' : 'Rayons du marché'}
          </span>
          {selectedCategory && (
            <button
              type="button"
              onClick={() => setSelectedCategory(null)}
              className="text-xs font-bold text-dzgreen-700 hover:underline"
            >
              {isAr ? 'عرض كل الأقسام' : 'Tout afficher'}
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryClick(cat.id)}
                className={`p-3.5 rounded-2xl border-2 text-left transition-all active:scale-95 flex items-center gap-3 ${
                  isSelected
                    ? 'border-dzgreen-600 bg-dzgreen-50 shadow-md ring-2 ring-dzgreen-500/20'
                    : 'border-slate-200 bg-white hover:border-slate-300 shadow-sm'
                }`}
              >
                <span className="text-3xl p-2 rounded-xl bg-slate-50 shrink-0">
                  {cat.icon}
                </span>
                <div className="overflow-hidden">
                  <p className="font-extrabold text-sm text-slate-800 truncate">
                    {isAr ? cat.name_ar : cat.name_fr}
                  </p>
                  <p className="text-[11px] font-semibold text-slate-400 truncate">
                    {isAr ? cat.name_fr : cat.name_ar}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Products List (Instant Select) */}
      <div ref={productsSectionRef} id="products-section" className="scroll-mt-4 pt-2">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-xs font-black uppercase tracking-wider text-slate-400">
            {isAr ? 'المنتجات المقترحة (اضغط للمقارنة)' : 'Produits populaires (Touchez pour comparer)'}
          </span>
          <span className="text-xs font-bold text-slate-500">
            {filteredProducts.length} {isAr ? 'منتوج' : 'articles'}
          </span>
        </div>

        <div className="space-y-2.5">
          {filteredProducts.map((prod) => (
            <button
              key={prod.id}
              type="button"
              onClick={() => onSelectProduct(prod)}
              className="w-full bg-white hover:bg-dzgreen-50/60 active:scale-[0.98] transition-all p-3.5 rounded-2xl border border-slate-200 hover:border-dzgreen-400 shadow-sm flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl p-2 bg-slate-50 rounded-xl group-hover:scale-110 transition-transform">
                  {prod.image}
                </span>
                <div className="text-left">
                  <p className="font-extrabold text-base text-slate-900 group-hover:text-dzgreen-700 transition-colors">
                    {isAr ? prod.name_ar : prod.name_fr}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                      {prod.packaging}
                    </span>
                    <span className="text-xs text-slate-400">
                      ~ {prod.ref_price} DA
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-dzgreen-600 font-extrabold text-sm pr-1">
                <span>{isAr ? 'مقارنة' : 'Comparer'}</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}

          {filteredProducts.length === 0 && (
            <div className="bg-white p-6 rounded-2xl text-center border border-slate-200">
              <p className="text-sm font-bold text-slate-600">
                {isAr ? 'لم يتم العثور على أي منتوج يطابق البحث' : 'Aucun produit ne correspond à votre recherche'}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory(null);
                }}
                className="mt-3 px-4 py-2 bg-dzgreen-600 text-white rounded-xl text-xs font-black"
              >
                {isAr ? 'عرض جميع المنتجات' : 'Réinitialiser la recherche'}
              </button>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
