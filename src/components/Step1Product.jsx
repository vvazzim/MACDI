import React, { useState, useEffect } from 'react';
import { Search, Mic, MicOff, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '../data/mockData';

export function Step1Product({ lang, onSelectProduct }) {
  const isAr = lang === 'ar';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [voiceNotice, setVoiceNotice] = useState('');

  // Speech Recognition integration (native browser voice search)
  const handleVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      // Fallback simulator for devices without microphone API
      setIsListening(true);
      setVoiceNotice(isAr ? '...جاري الاستماع (تجريبي)' : 'Écoute vocale en cours...');
      setTimeout(() => {
        setSearchTerm('Lait Soummam');
        setIsListening(false);
        setVoiceNotice(isAr ? 'تم التعرف: حليب صومام' : 'Reconnu : Lait Soummam 1L');
      }, 1500);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = isAr ? 'ar-DZ' : 'fr-FR';
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
        setVoiceNotice(isAr ? 'تحدث الآن... (مثال: حليب صومام، زيت إيليو)' : 'Parlez maintenant... (ex: Lait Soummam, Huile Elio)');
      };

      recognition.onresult = (event) => {
        const spoken = event.results[0][0].transcript;
        setSearchTerm(spoken);
        setIsListening(false);
        setVoiceNotice(`${isAr ? 'تم التعرف' : 'Reconnu'} : "${spoken}"`);
      };

      recognition.onerror = () => {
        setIsListening(false);
        setVoiceNotice(isAr ? 'عذراً، أعد المحاولة أو اكتب اسم المنتوج' : 'Veuillez répéter ou écrire le nom');
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      setIsListening(false);
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
        <p className="text-xs text-slate-500 mt-1">
          {isAr
            ? 'اضغط على زر الميكروفون أو اختر المنتوج مباشرة'
            : 'Recherche vocale en 1 clic ou touchez une catégorie'}
        </p>
      </div>

      {/* Giant Voice Search & Input Card */}
      <div className="bg-white p-3.5 rounded-2xl shadow-sm border-2 border-dzgreen-500/30 focus-within:border-dzgreen-600 transition">
        <div className="flex items-center gap-2">
          
          {/* Big Voice Button */}
          <button
            onClick={handleVoiceSearch}
            className={`p-3.5 rounded-xl font-bold flex items-center justify-center transition-all ${
              isListening
                ? 'bg-dzred-600 text-white animate-pulse shadow-lg scale-105'
                : 'bg-dzgreen-600 hover:bg-dzgreen-700 text-white shadow-md active:scale-95'
            }`}
            title="Recherche vocale / بحث صوتي"
          >
            {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
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
          <p className="mt-2 text-xs font-semibold text-dzgreen-700 bg-dzgreen-50 px-2.5 py-1.5 rounded-lg border border-dzgreen-200 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 shrink-0 text-amber-500" />
            <span>{voiceNotice}</span>
          </p>
        )}
      </div>

      {/* 6 Large Category Tiles */}
      <div>
        <div className="flex items-center justify-between mb-2.5 px-1">
          <span className="text-xs font-black uppercase tracking-wider text-slate-400">
            {isAr ? 'الأقسام الرئيسية' : 'Rayons du marché'}
          </span>
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-xs font-bold text-dzgreen-700 hover:underline"
            >
              {isAr ? 'عرض الكل' : 'Tout afficher'}
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(isSelected ? null : cat.id)}
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
      <div>
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
        </div>
      </div>

    </div>
  );
}
