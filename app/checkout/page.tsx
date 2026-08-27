'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShoppingBag,
  CreditCard,
  Building2,
  QrCode,
  Wallet,
  Lock,
  ShieldCheck,
  Truck,
  ArrowRight,
  ArrowLeft,
  Check,
} from 'lucide-react';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import { useShop } from '@/context/ShopContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, clearCart, showToast } = useShop();

  const [shippingMethod, setShippingMethod] = useState<'free' | 'express' | 'nextday'>('free');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | 'qris' | 'cod'>('card');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const shippingCost = shippingMethod === 'free' ? 0 : shippingMethod === 'express' ? 15 : 25;
  const grandTotal = subtotal + shippingCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.address || !formData.city) {
      showToast('Missing Information', 'Please fill in required shipping details.', 'error');
      return;
    }

    setIsSubmitting(true);
    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);

    setTimeout(() => {
      clearCart();
      showToast('Order Placed Successfully', `Order ID: ${orderId}`, 'success');
      router.push(`/checkout/success?orderId=${orderId}`);
    }, 1000);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex flex-col font-sans">
        <TopBar />
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-lg mx-auto">
          <div className="w-20 h-20 bg-gray-100 text-[#0F3D2E] rounded-full flex items-center justify-center mb-4">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Your Shopping Bag is Empty</h1>
          <p className="text-gray-500 text-xs sm:text-sm mb-6 leading-relaxed">
            Please add your favorite headphones or audio products to your bag before proceeding to
            checkout.
          </p>
          <Link
            href="/products"
            className="px-8 py-3.5 bg-[#0F3D2E] text-white rounded-full font-bold text-xs hover:bg-[#0a2b20] transition-all shadow-md flex items-center gap-2"
          >
            <span>Explore Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col font-sans">
      <TopBar />
      <Header />

      <main className="flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-12 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-8 font-medium">
          <Link href="/" className="hover:text-[#0F3D2E] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/cart" className="hover:text-[#0F3D2E] transition-colors">
            Bag
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">Checkout & Payment</span>
        </div>

        <div className="mb-8 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-extrabold text-[#0F3D2E] uppercase tracking-widest block mb-1">
              Secure Checkout
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">
              Review & Place Order
            </h1>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-emerald-800 font-semibold bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
            <Lock className="w-3.5 h-3.5" />
            <span>256-Bit SSL Encrypted</span>
          </div>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column — Shipping & Payment Forms */}
          <div className="lg:col-span-8 space-y-6">
            {/* Step 1: Shipping Address */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#0F3D2E] text-white font-black text-xs flex items-center justify-center">
                  1
                </span>
                <h2 className="text-lg font-extrabold text-gray-900">Shipping Details</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="Jane Doe"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0F3D2E]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="jane.doe@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0F3D2E]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-bold text-gray-700 mb-1">Street Address *</label>
                  <input
                    type="text"
                    name="address"
                    required
                    placeholder="123 Audio Boulevard, Apt 4B"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0F3D2E]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">City / Region *</label>
                  <input
                    type="text"
                    name="city"
                    required
                    placeholder="Central Jakarta"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0F3D2E]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    placeholder="10110"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0F3D2E]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-bold text-gray-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+62 812 3456 7890"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0F3D2E]"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Delivery Options */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#0F3D2E] text-white font-black text-xs flex items-center justify-center">
                  2
                </span>
                <h2 className="text-lg font-extrabold text-gray-900">Delivery Speed</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div
                  onClick={() => setShippingMethod('free')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    shippingMethod === 'free'
                      ? 'border-[#0F3D2E] bg-[#0F3D2E]/5 shadow-sm'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-extrabold text-gray-900 text-xs">Standard Delivery</span>
                    {shippingMethod === 'free' && <Check className="w-3.5 h-3.5 text-[#0F3D2E]" />}
                  </div>
                  <div className="text-[11px] text-gray-500">3 - 5 business days</div>
                  <div className="font-black text-[#0F3D2E] text-xs mt-3">FREE</div>
                </div>

                <div
                  onClick={() => setShippingMethod('express')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    shippingMethod === 'express'
                      ? 'border-[#0F3D2E] bg-[#0F3D2E]/5 shadow-sm'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-extrabold text-gray-900 text-xs">Express Delivery</span>
                    {shippingMethod === 'express' && <Check className="w-3.5 h-3.5 text-[#0F3D2E]" />}
                  </div>
                  <div className="text-[11px] text-gray-500">1 - 2 business days</div>
                  <div className="font-black text-[#0F3D2E] text-xs mt-3">$15.00</div>
                </div>

                <div
                  onClick={() => setShippingMethod('nextday')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    shippingMethod === 'nextday'
                      ? 'border-[#0F3D2E] bg-[#0F3D2E]/5 shadow-sm'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-extrabold text-gray-900 text-xs">Priority Next Day</span>
                    {shippingMethod === 'nextday' && <Check className="w-3.5 h-3.5 text-[#0F3D2E]" />}
                  </div>
                  <div className="text-[11px] text-gray-500">Guaranteed tomorrow</div>
                  <div className="font-black text-[#0F3D2E] text-xs mt-3">$25.00</div>
                </div>
              </div>
            </div>

            {/* Step 3: Payment Selection */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#0F3D2E] text-white font-black text-xs flex items-center justify-center">
                  3
                </span>
                <h2 className="text-lg font-extrabold text-gray-900">Payment Option</h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'card', label: 'Credit Card', icon: CreditCard },
                  { id: 'bank', label: 'Bank Transfer', icon: Building2 },
                  { id: 'qris', label: 'QRIS / E-Wallet', icon: QrCode },
                  { id: 'cod', label: 'Cash on Delivery', icon: Wallet },
                ].map((pm) => {
                  const Icon = pm.icon;
                  const isSelected = paymentMethod === pm.id;
                  return (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => setPaymentMethod(pm.id as any)}
                      className={`p-4 rounded-2xl border-2 text-center transition-all flex flex-col items-center gap-2.5 ${
                        isSelected
                          ? 'border-[#0F3D2E] bg-[#0F3D2E]/5 shadow-sm'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                          isSelected ? 'bg-[#0F3D2E] text-white' : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-xs text-gray-900">{pm.label}</span>
                    </button>
                  );
                })}
              </div>

              {paymentMethod === 'card' && (
                <div className="p-4 bg-gray-50/80 rounded-2xl border border-gray-200 space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      placeholder="4532 7512 8901 2345"
                      className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-medium focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Expiration (MM/YY)</label>
                      <input
                        type="text"
                        placeholder="12/28"
                        className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-medium focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Security Code (CVV)</label>
                      <input
                        type="text"
                        placeholder="382"
                        className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-medium focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column — Order Summary Preview */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6 sticky top-28">
            <h2 className="text-lg font-extrabold text-gray-950 pb-4 border-b border-gray-100">
              Order Summary
            </h2>

            {/* Cart items */}
            <div className="max-h-60 overflow-y-auto space-y-3 divide-y divide-gray-100 pr-1">
              {cart.map((item) => (
                <div key={item.product.id} className="flex items-center gap-3 pt-3 first:pt-0">
                  <div className="relative w-12 h-12 bg-gray-50 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs text-gray-900 truncate">{item.product.name}</h4>
                    <p className="text-[11px] text-gray-400">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-extrabold text-xs text-gray-900">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-100 space-y-2 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping ({shippingMethod})</span>
                <span className="font-bold text-gray-900">
                  {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="pt-3 border-t border-gray-100 flex justify-between items-end">
                <span className="text-sm font-extrabold text-gray-900">Grand Total</span>
                <span className="text-2xl font-black text-[#0F3D2E]">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-[#0F3D2E] text-white rounded-full font-bold text-xs hover:bg-[#0a2b20] transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-[#0F3D2E]/20 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <span>{isSubmitting ? 'Processing Order...' : 'Complete Purchase'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-center pt-2">
              <Link
                href="/cart"
                className="text-xs font-bold text-gray-500 hover:text-gray-900 inline-flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Shopping Bag</span>
              </Link>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
