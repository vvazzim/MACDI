import React from 'react';
import { X, Smartphone, Share, MoreVertical, ShoppingBag } from 'lucide-react';

export function InstallModal({ lang, isOpen, onClose }) {
  const isAr = lang === 'ar';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl space-y-4 border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2.5 bg-dzgreen-100 text-dzgreen-800 rounded-2xl shadow-xs">
              <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-base">
                {isAr ? 'تثبيت تطبيق ماكدي MACDI' : 'Épingler l\'application MACDI'}
              </h3>
              <p className="text-[11px] text-slate-400 font-bold">
                {isAr ? 'يعمل كتطبيق هاتف بدون تحميل' : 'Accès direct comme une vraie application'}
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

        {/* Android Guide */}
        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-black text-slate-800">
            <span>🤖 Android (Google Chrome)</span>
          </div>
          <ol className="text-xs text-slate-600 space-y-1.5 font-semibold list-decimal list-inside">
            <li>
              {isAr ? 'اضغط على قائمة النقاط الثلاث' : 'Appuyez sur les 3 points en haut'}{' '}
              <MoreVertical className="w-3.5 h-3.5 inline text-slate-500" />
            </li>
            <li>
              {isAr ? 'اختر "إضافة إلى الشاشة الرئيسية"' : 'Choisissez "Ajouter à l\'écran d\'accueil"'}
            </li>
            <li>
              {isAr ? 'اضغط "تثبيت"' : 'Validez en cliquant sur "Installer"'}
            </li>
          </ol>
        </div>

        {/* iPhone / iOS Guide */}
        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-black text-slate-800">
            <span>🍏 iPhone (Safari)</span>
          </div>
          <ol className="text-xs text-slate-600 space-y-1.5 font-semibold list-decimal list-inside">
            <li>
              {isAr ? 'اضغط على زر المشاركة' : 'Appuyez sur le bouton Partager'}{' '}
              <Share className="w-3.5 h-3.5 inline text-blue-500" />
            </li>
            <li>
              {isAr ? 'مرر للأسفل واختر "على الشاشة الرئيسية"' : 'Touchez "Sur l\'écran d\'accueil"'}
            </li>
            <li>
              {isAr ? 'اضغط على "إضافة"' : 'Touchez "Ajouter" en haut à droite'}
            </li>
          </ol>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-3 bg-dzgreen-600 hover:bg-dzgreen-700 active:scale-95 text-white font-black rounded-xl text-xs transition"
        >
          {isAr ? 'فهمت، شكراً' : 'J\'ai compris'}
        </button>

      </div>
    </div>
  );
}
