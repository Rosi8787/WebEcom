'use client';

import React from 'react';
import Image from 'next/image';
import { CheckCircle2, Info, AlertCircle, X, Heart } from 'lucide-react';
import { useShop } from '@/context/ShopContext';

export default function ToastContainer() {
  const { toasts, removeToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full px-4 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center gap-3 bg-gray-900/95 backdrop-blur-md text-white p-3.5 rounded-2xl shadow-2xl border border-gray-800 animate-slide-up transition-all duration-300"
        >
          {toast.image ? (
            <div className="relative w-10 h-10 bg-white/10 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
              <Image
                src={toast.image}
                alt={toast.title}
                fill
                className="object-contain p-1"
              />
            </div>
          ) : toast.type === 'info' ? (
            <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <Info className="w-4 h-4" />
            </div>
          ) : toast.type === 'error' ? (
            <div className="w-8 h-8 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">
              <AlertCircle className="w-4 h-4" />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-xs text-white leading-tight truncate">{toast.title}</h4>
            {toast.message && (
              <p className="text-[11px] text-gray-300 truncate mt-0.5">{toast.message}</p>
            )}
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-gray-400 hover:text-white p-1 rounded-lg transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}

