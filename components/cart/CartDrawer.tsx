'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useShop } from '@/context/ShopContext';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cart, updateQuantity, removeFromCart, subtotal, totalItems } =
    useShop();

  // Animate-out state: keep the DOM mounted during close animation
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isCartOpen) {
      setMounted(true);
      // small tick so CSS transition fires after mount
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    } else {
      setVisible(false);
      const timer = setTimeout(() => setMounted(false), 350);
      return () => clearTimeout(timer);
    }
  }, [isCartOpen]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop — fade in/out */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
      />

      {/* Drawer Panel — slide in/out from right */}
      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div
          className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between transition-transform duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: visible ? 'translateX(0)' : 'translateX(100%)' }}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#0F3D2E]" />
              <h2 className="text-base font-bold text-gray-900">Shopping Bag</h2>
              <span className="bg-[#0F3D2E] text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full">
                {totalItems}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-900 flex items-center justify-center transition-colors"
              aria-label="Close cart"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-gray-100">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 text-gray-400">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-1">Your bag is empty</h3>
                <p className="text-xs text-gray-500 mb-6 max-w-xs">
                  Explore our collection of high-fidelity headphones and audio gear.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 bg-[#0F3D2E] text-white rounded-full font-bold text-xs hover:bg-[#0c3125] transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.product.id} className="py-4 flex gap-4 first:pt-0 last:pb-0">
                  <div className="relative w-20 h-20 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0 border border-gray-100">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-xs text-gray-900 line-clamp-1 pr-2">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-gray-400 hover:text-red-500 p-0.5 transition-colors shrink-0"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 font-semibold mt-0.5">
                        ${item.product.price}.00
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity controls */}
                      <div className="flex items-center border border-gray-200 rounded-full overflow-hidden bg-gray-50 p-0.5">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-full bg-white text-gray-700 hover:bg-gray-200 flex items-center justify-center font-bold text-xs shadow-sm transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-extrabold text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-full bg-white text-gray-700 hover:bg-gray-200 flex items-center justify-center font-bold text-xs shadow-sm transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-extrabold text-xs text-gray-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer — Subtotal & CTA */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-gray-100 bg-gray-50/60 space-y-4">
              <div className="flex justify-between items-center text-sm font-extrabold text-gray-900">
                <span>Subtotal</span>
                <span className="text-base">${subtotal.toFixed(2)}</span>
              </div>
              <p className="text-[11px] text-gray-400">
                Taxes and shipping calculated during checkout.
              </p>

              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full text-center py-3 border border-gray-900 text-gray-900 rounded-full font-bold text-xs hover:bg-gray-900 hover:text-white transition-all"
                >
                  View Cart
                </Link>
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full text-center py-3 bg-[#0F3D2E] text-white rounded-full font-bold text-xs hover:bg-[#0c3125] transition-all flex items-center justify-center gap-1.5 shadow-md"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
