'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Plus, Minus, Trash2, Tag, ArrowRight, ArrowLeft } from 'lucide-react';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import { useShop } from '@/context/ShopContext';
import { mockProducts } from '@/lib/mock-products';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, subtotal, totalItems } = useShop();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [shippingCost, setShippingCost] = useState(0);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');

    const code = promoCode.trim().toUpperCase();
    if (code === 'DISCOUNT10') {
      setDiscount(10);
      setPromoSuccess('Discount coupon applied ($10 OFF)!');
    } else if (code === 'SHOPCART50') {
      const d = subtotal * 0.5;
      setDiscount(d);
      setPromoSuccess('50% OFF promo applied!');
    } else {
      setPromoError('Invalid coupon code. Try "SHOPCART50" or "DISCOUNT10".');
    }
  };

  const finalTotal = Math.max(0, subtotal - discount + shippingCost);

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col font-sans">
      <TopBar />
      <Header />

      <main className="flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-12 py-10">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-8 font-medium">
          <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">Shopping Bag</span>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">Shopping Bag</h1>
            <p className="text-gray-500 text-xs mt-1 font-medium">You have {totalItems} item(s) in your shopping bag</p>
          </div>
          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-full transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Bag</span>
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm max-w-2xl mx-auto my-8">
            <div className="w-20 h-20 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-2">Your Shopping Bag is Empty</h2>
            <p className="text-gray-500 text-xs mb-8 max-w-md mx-auto">
              Before you can proceed to checkout, you must add some products to your shopping bag.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0F3D2E] text-white rounded-full font-bold text-xs hover:bg-[#0a2b20] transition-all shadow-md"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Recommendations */}
            <div className="mt-14 text-left border-t border-gray-100 pt-8">
              <h3 className="font-extrabold text-gray-900 text-sm mb-4">Popular Recommendations</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {mockProducts.slice(0, 3).map((prod) => (
                  <Link
                    key={prod.id}
                    href={`/products/${prod.id}`}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-100"
                  >
                    <div className="relative w-12 h-12 bg-white rounded-xl overflow-hidden shrink-0 border border-gray-200">
                      <Image src={prod.image} alt={prod.name} fill className="object-contain p-1" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs text-gray-900 truncate">{prod.name}</h4>
                      <p className="text-xs text-gray-500 font-semibold">${prod.price}.00</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Cart Content Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left: Product Table */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-100">
                {cart.map((item) => (
                  <div key={item.product.id} className="p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-5">
                    
                    {/* Image */}
                    <div className="relative w-24 h-24 bg-[#F8F8F7] rounded-2xl overflow-hidden shrink-0 border border-gray-100">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-contain p-3"
                      />
                    </div>

                    {/* Information */}
                    <div className="flex-1 text-center sm:text-left">
                      <Link
                        href={`/products/${item.product.id}`}
                        className="font-extrabold text-gray-900 text-sm hover:text-[#0F3D2E] transition-colors line-clamp-1"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{item.product.description}</p>
                      <p className="text-sm font-extrabold text-[#0F3D2E] mt-2 sm:hidden">
                        ${item.product.price}.00
                      </p>
                    </div>

                    {/* Price (Desktop) */}
                    <div className="hidden sm:block text-right">
                      <span className="font-extrabold text-gray-900 text-sm">${item.product.price}.00</span>
                    </div>

                    {/* Quantity Modifier */}
                    <div className="flex items-center border border-gray-200 rounded-full bg-gray-50 p-0.5">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-full bg-white text-gray-700 font-bold hover:bg-gray-200 transition flex items-center justify-center text-xs shadow-sm"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-10 text-center font-extrabold text-xs text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-full bg-white text-gray-700 font-bold hover:bg-gray-200 transition flex items-center justify-center text-xs shadow-sm"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Total & Remove */}
                    <div className="flex items-center gap-4">
                      <span className="font-extrabold text-gray-950 text-sm w-20 text-right">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-red-50 text-gray-400 hover:text-red-600 transition flex items-center justify-center"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                ))}
              </div>

              {/* Promo Coupon Card */}
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-4 h-4 text-[#0F3D2E]" />
                  <h3 className="font-bold text-gray-900 text-xs">Have a Promo Coupon?</h3>
                </div>
                <form onSubmit={handleApplyPromo} className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Enter code (e.g. SHOPCART50)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0F3D2E]"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-gray-800 transition"
                  >
                    Apply Code
                  </button>
                </form>
                {promoError && <p className="text-xs text-red-500 mt-2 font-medium">{promoError}</p>}
                {promoSuccess && <p className="text-xs text-green-600 mt-2 font-bold">{promoSuccess}</p>}
              </div>

            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6 sticky top-28">
              <h2 className="text-lg font-extrabold text-gray-950 pb-4 border-b border-gray-100">
                Order Summary
              </h2>

              {/* Shipping Selection */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">
                  Shipping Option
                </label>
                <select
                  value={shippingCost}
                  onChange={(e) => setShippingCost(Number(e.target.value))}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 focus:outline-none"
                >
                  <option value={0}>Standard Free Shipping ($0.00)</option>
                  <option value={15}>Express Delivery 1-2 Days ($15.00)</option>
                </select>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600 font-semibold">
                    <span>Promo Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Estimated Shipping</span>
                  <span className="font-bold text-gray-900">
                    {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Estimated Tax</span>
                  <span className="font-bold text-gray-900">$0.00</span>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-between items-end">
                  <div>
                    <span className="text-sm font-extrabold text-gray-900 block">Total</span>
                    <span className="text-[11px] text-gray-400">Includes all taxes</span>
                  </div>
                  <span className="text-2xl font-black text-[#0F3D2E]">
                    ${finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full text-center py-3.5 bg-[#0F3D2E] text-white rounded-full font-bold text-xs hover:bg-[#0a2b20] transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="text-center pt-2">
                <Link href="/products" className="text-xs font-bold text-gray-500 hover:text-gray-900 inline-flex items-center gap-1.5">
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}

