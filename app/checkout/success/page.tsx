'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, ShoppingBag, ArrowRight, PackageCheck } from 'lucide-react';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'ORD-984210';

  return (
    <div className="bg-white rounded-3xl p-10 sm:p-12 border border-gray-100 shadow-xl space-y-6">
      <div className="w-20 h-20 bg-emerald-50 text-[#0F3D2E] rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50/50">
        <CheckCircle2 className="w-10 h-10 text-[#0F3D2E]" />
      </div>

      <span className="inline-block bg-[#0F3D2E]/10 text-[#0F3D2E] text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
        Order Confirmed
      </span>

      <h1 className="text-3xl font-extrabold text-gray-950 tracking-tight">
        Thank You for Your Order!
      </h1>
      <p className="text-gray-500 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
        We have received your order and are preparing your package for express courier dispatch.
      </p>

      {/* Order Info Card */}
      <div className="p-6 bg-gray-50/80 rounded-2xl border border-gray-100 text-left space-y-3 text-xs">
        <div className="flex justify-between items-center border-b border-gray-200/80 pb-2.5">
          <span className="text-gray-500 font-medium">Order Number</span>
          <span className="font-extrabold text-[#0F3D2E]">{orderId}</span>
        </div>
        <div className="flex justify-between items-center border-b border-gray-200/80 pb-2.5">
          <span className="text-gray-500 font-medium">Estimated Delivery</span>
          <span className="font-bold text-gray-900">3 - 5 Business Days</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500 font-medium">Payment Status</span>
          <span className="font-extrabold text-emerald-600 flex items-center gap-1">
            <PackageCheck className="w-3.5 h-3.5" /> PAID / VERIFIED
          </span>
        </div>
      </div>

      <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/products"
          className="px-8 py-3.5 bg-[#0F3D2E] text-white rounded-full font-bold text-xs hover:bg-[#0a2b20] transition-transform hover:scale-[1.02] shadow-lg shadow-[#0F3D2E]/20 flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Continue Shopping</span>
        </Link>
        <Link
          href="/account"
          className="px-8 py-3.5 border border-gray-900 text-gray-900 rounded-full font-bold text-xs hover:bg-gray-900 hover:text-white transition-all flex items-center justify-center gap-2"
        >
          <span>View Order in Account</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col font-sans">
      <TopBar />
      <Header />

      <main className="flex-1 max-w-2xl mx-auto px-4 py-16 text-center flex items-center justify-center">
        <Suspense fallback={<div className="p-12 text-gray-400">Loading order details...</div>}>
          <OrderSuccessContent />
        </Suspense>
      </main>
    </div>
  );
}
