'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Settings,
  BarChart3,
  Headphones,
  FileText,
  TrendingUp,
  Star,
  Plus,
  Trash2,
  ArrowLeft,
  CheckCircle2,
  DollarSign,
  Package,
  Users,
} from 'lucide-react';
import { mockProducts } from '@/lib/mock-products';
import { useShop } from '@/context/ShopContext';

export default function AdminDashboardPage() {
  const { showToast } = useShop();
  const [productsList, setProductsList] = useState(mockProducts);
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders'>('overview');

  const handleDeleteProduct = (id: string, name: string) => {
    setProductsList((prev) => prev.filter((p) => p.id !== id));
    showToast('Product Removed', `${name} removed from inventory`, 'info');
  };

  return (
    <div className="min-h-screen bg-gray-100/70 flex flex-col font-sans">
      {/* Top Navbar Admin */}
      <header className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow-md sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Image
            src="/CARTO.png"
            alt="Carto logo"
            height={32}
            width={110}
            className="h-8 w-auto object-contain brightness-0 invert"
          />
          <span className="text-gray-400 font-light text-sm">|</span>
          <span className="font-bold text-sm tracking-tight text-gray-300">Admin Studio</span>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold">
          <Link
            href="/"
            className="bg-white/10 hover:bg-white/20 px-3.5 py-1.5 rounded-xl transition flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Storefront</span>
          </Link>
          <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full flex items-center gap-1.5">
            <CheckCircle2 className="w-3 h-3" />
            <span>Client State Active</span>
          </span>
        </div>
      </header>

      <div className="flex-1 max-w-[1400px] w-full mx-auto p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-3 bg-white rounded-3xl p-3 border border-gray-200/80 shadow-sm space-y-1 h-fit">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full text-left px-4 py-3 rounded-2xl font-bold text-xs flex items-center gap-2.5 transition ${
              activeTab === 'overview'
                ? 'bg-[#0F3D2E] text-white shadow-md'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Analytics & Sales</span>
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`w-full text-left px-4 py-3 rounded-2xl font-bold text-xs flex items-center justify-between transition ${
              activeTab === 'products'
                ? 'bg-[#0F3D2E] text-white shadow-md'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Headphones className="w-4 h-4" />
              <span>Product Inventory</span>
            </div>
            <span
              className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                activeTab === 'products' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {productsList.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full text-left px-4 py-3 rounded-2xl font-bold text-xs flex items-center gap-2.5 transition ${
              activeTab === 'orders'
                ? 'bg-[#0F3D2E] text-white shadow-md'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Orders & Shipments</span>
          </button>
        </div>

        {/* Content */}
        <div className="lg:col-span-9 space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm">
                  <div className="flex items-center justify-between text-gray-400 mb-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider">
                      Total Revenue
                    </span>
                    <DollarSign className="w-4 h-4 text-[#0F3D2E]" />
                  </div>
                  <span className="text-3xl font-black text-gray-900 block">$14,289.00</span>
                  <span className="text-xs text-emerald-600 font-bold mt-2 inline-flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" /> +18.4% this month
                  </span>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm">
                  <div className="flex items-center justify-between text-gray-400 mb-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider">
                      Total Orders
                    </span>
                    <Package className="w-4 h-4 text-[#0F3D2E]" />
                  </div>
                  <span className="text-3xl font-black text-gray-900 block">342</span>
                  <span className="text-xs text-emerald-600 font-bold mt-2 inline-flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" /> +12.1% new buyers
                  </span>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm">
                  <div className="flex items-center justify-between text-gray-400 mb-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider">
                      Active Stock
                    </span>
                    <Users className="w-4 h-4 text-[#0F3D2E]" />
                  </div>
                  <span className="text-3xl font-black text-gray-900 block">
                    {productsList.length} items
                  </span>
                  <span className="text-xs text-gray-500 font-semibold mt-2 inline-block">
                    100% available
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-extrabold text-gray-900 text-sm">
                    Sales Growth Visualization
                  </h3>
                  <span className="text-xs text-gray-400 font-medium">Last 30 Days</span>
                </div>
                <div className="h-44 bg-gray-50 rounded-2xl border border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 gap-2">
                  <BarChart3 className="w-8 h-8 text-gray-300" />
                  <span className="text-xs font-semibold">
                    Sales Chart visualization ready for backend metrics integration
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-sm space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <div>
                  <h3 className="font-extrabold text-gray-900 text-base">Product Inventory</h3>
                  <p className="text-xs text-gray-400">Manage catalog prices and stock status</p>
                </div>
                <button
                  onClick={() =>
                    showToast('Product Editor', 'Add product modal ready for API connection', 'info')
                  }
                  className="px-4 py-2 bg-[#0F3D2E] text-white rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Product</span>
                </button>
              </div>

              <div className="divide-y divide-gray-100 overflow-x-auto">
                {productsList.map((prod) => (
                  <div
                    key={prod.id}
                    className="py-3.5 flex items-center justify-between gap-4 min-w-[500px]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-11 h-11 bg-gray-50 rounded-xl overflow-hidden shrink-0 border border-gray-200">
                        <Image
                          src={prod.image}
                          alt={prod.name}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-gray-900">{prod.name}</h4>
                        <div className="flex items-center gap-1 text-amber-500 mt-0.5">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span className="text-[10px] text-gray-400 font-semibold">
                            {prod.rating}.0 ({prod.reviewCount} reviews)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-xs">
                      <span className="font-black text-gray-900">${prod.price}.00</span>
                      <span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold text-[11px]">
                        In Stock
                      </span>
                      <button
                        onClick={() => handleDeleteProduct(prod.id, prod.name)}
                        className="text-gray-400 hover:text-red-600 p-1 transition-colors"
                        aria-label="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-sm space-y-4">
              <h3 className="font-extrabold text-gray-900 text-base">Orders Management</h3>
              <p className="text-xs text-gray-500">
                Customer orders placed on the frontend checkout flow are logged and managed here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
