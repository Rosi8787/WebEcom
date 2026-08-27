'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Package,
  Heart,
  User as UserIcon,
  MapPin,
  Award,
  ShoppingBag,
  Plus,
  RotateCcw,
  CheckCircle2,
  Clock,
  Truck,
  ArrowRight,
} from 'lucide-react';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import AuthModal from '@/components/auth/AuthModal';
import ProductCard from '@/components/landing/ProductCard';
import { useShop } from '@/context/ShopContext';
import { mockProducts } from '@/lib/mock-products';

const MOCK_ORDERS = [
  {
    id: 'ORD-894210',
    date: 'August 24, 2026',
    status: 'DELIVERED',
    statusBg: 'bg-emerald-100 text-emerald-800',
    icon: CheckCircle2,
    total: 648.0,
    items: [mockProducts[1], mockProducts[0]],
  },
  {
    id: 'ORD-761922',
    date: 'August 12, 2026',
    status: 'IN TRANSIT',
    statusBg: 'bg-blue-100 text-blue-800',
    icon: Truck,
    total: 289.0,
    items: [mockProducts[2]],
  },
  {
    id: 'ORD-612033',
    date: 'July 29, 2026',
    status: 'COMPLETED',
    statusBg: 'bg-gray-100 text-gray-800',
    icon: Clock,
    total: 39.0,
    items: [mockProducts[3]],
  },
];

export default function AccountPage() {
  const { wishlist, addToCart, showToast } = useShop();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses' | 'wishlist'>('orders');
  const [isAuthOpen, setIsAuthOpen] = useState(false);

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
          <span className="text-gray-900 font-semibold">My Account</span>
        </div>

        {/* Top User Profile Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-5 text-center sm:text-left">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#0F3D2E] text-white font-black text-xl sm:text-2xl flex items-center justify-center shadow-lg ring-4 ring-[#0F3D2E]/10">
              JD
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-gray-950">Jane Doe</h1>
              <p className="text-xs text-gray-500 font-medium mt-0.5">
                jane.doe@example.com • Member since 2026
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="bg-amber-100 text-amber-900 text-[11px] font-extrabold px-3 py-0.5 rounded-full flex items-center gap-1.5 border border-amber-200">
                  <Award className="w-3.5 h-3.5 text-amber-700" />
                  <span>Gold Tier Member</span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAuthOpen(true)}
              className="px-5 py-2.5 border border-gray-900 text-gray-900 rounded-full font-bold text-xs hover:bg-gray-900 hover:text-white transition"
            >
              Sign In / Switch Profile
            </button>
          </div>
        </div>

        {/* Account Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Navigation Sidebar */}
          <div className="lg:col-span-3 bg-white rounded-3xl p-3 border border-gray-100 shadow-sm space-y-1">
            {[
              { id: 'orders', label: 'Order History', icon: Package, count: MOCK_ORDERS.length },
              { id: 'wishlist', label: 'Saved Wishlist', icon: Heart, count: wishlist.length },
              { id: 'profile', label: 'Profile Details', icon: UserIcon },
              { id: 'addresses', label: 'Saved Addresses', icon: MapPin, count: 1 },
            ].map((t) => {
              const Icon = t.icon;
              const isActive = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id as any)}
                  className={`w-full text-left px-4 py-3 rounded-2xl font-bold text-xs flex items-center justify-between transition ${
                    isActive
                      ? 'bg-[#0F3D2E] shadow-md'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  style={isActive ? { color: '#ffffff' } : undefined}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{t.label}</span>
                  </div>
                  {t.count !== undefined && (
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-white/20' : 'bg-gray-100 text-gray-600'
                      }`}
                      style={isActive ? { color: '#ffffff' } : undefined}
                    >
                      {t.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Tab Content */}
          <div className="lg:col-span-9 space-y-6">
            {/* TAB: Order History */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-extrabold text-gray-950">Recent Orders</h2>
                  <span className="text-xs text-gray-400 font-medium">3 Total Orders</span>
                </div>

                {MOCK_ORDERS.map((order) => {
                  const StatusIcon = order.icon;
                  return (
                    <div
                      key={order.id}
                      className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-gray-100">
                        <div>
                          <span className="font-extrabold text-sm text-gray-900">{order.id}</span>
                          <span className="text-xs text-gray-400 block mt-0.5">
                            Placed on {order.date}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span
                            className={`text-xs font-extrabold px-3 py-1 rounded-full flex items-center gap-1.5 ${order.statusBg}`}
                          >
                            <StatusIcon className="w-3.5 h-3.5" />
                            <span>{order.status}</span>
                          </span>
                          <span className="font-black text-gray-950 text-base">
                            ${order.total.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Order Items Preview */}
                      <div className="space-y-3">
                        {order.items.map((prod) => (
                          <div key={prod.id} className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <div className="relative w-12 h-12 bg-gray-50 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                                <Image
                                  src={prod.image}
                                  alt={prod.name}
                                  fill
                                  className="object-contain p-1"
                                />
                              </div>
                              <div>
                                <h4 className="font-bold text-xs text-gray-900">{prod.name}</h4>
                                <p className="text-[11px] text-gray-400">${prod.price}.00</p>
                              </div>
                            </div>
                            <button
                              onClick={() => addToCart(prod)}
                              className="px-4 py-1.5 border border-gray-200 text-gray-800 rounded-full text-xs font-bold hover:bg-gray-900 hover:text-white transition flex items-center gap-1.5"
                            >
                              <RotateCcw className="w-3 h-3" />
                              <span>Buy Again</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* TAB: Wishlist */}
            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-extrabold text-gray-950">
                    Saved Wishlist ({wishlist.length} items)
                  </h2>
                </div>

                {wishlist.length === 0 ? (
                  <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm max-w-lg mx-auto">
                    <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-base mb-1">Your wishlist is empty</h3>
                    <p className="text-xs text-gray-500 mb-6">
                      Click the heart icon on any product to bookmark it for later.
                    </p>
                    <Link
                      href="/products"
                      className="px-6 py-2.5 bg-[#0F3D2E] text-white rounded-full font-bold text-xs hover:bg-[#0a2b20] transition inline-flex items-center gap-2"
                    >
                      <span>Explore Products</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {wishlist.map((item) => (
                      <ProductCard key={item.id} product={item} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: Profile Info */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
                <h2 className="text-xl font-extrabold text-gray-950">Profile Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-gray-50/80 rounded-2xl border border-gray-100">
                    <span className="text-gray-400 font-medium block mb-1">Full Legal Name</span>
                    <span className="font-extrabold text-gray-900 text-sm">Jane Doe</span>
                  </div>
                  <div className="p-4 bg-gray-50/80 rounded-2xl border border-gray-100">
                    <span className="text-gray-400 font-medium block mb-1">Email Address</span>
                    <span className="font-extrabold text-gray-900 text-sm">jane.doe@example.com</span>
                  </div>
                  <div className="p-4 bg-gray-50/80 rounded-2xl border border-gray-100">
                    <span className="text-gray-400 font-medium block mb-1">Phone Number</span>
                    <span className="font-extrabold text-gray-900 text-sm">+62 812 3456 7890</span>
                  </div>
                  <div className="p-4 bg-gray-50/80 rounded-2xl border border-gray-100">
                    <span className="text-gray-400 font-medium block mb-1">Default Currency</span>
                    <span className="font-extrabold text-gray-900 text-sm">USD ($)</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: Saved Addresses */}
            {activeTab === 'addresses' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-extrabold text-gray-950">Saved Delivery Addresses</h2>
                  <button
                    onClick={() =>
                      showToast('Address Management', 'Saved address is ready for checkout', 'info')
                    }
                    className="px-4 py-2 bg-[#0F3D2E] text-white rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Address</span>
                  </button>
                </div>

                <div className="p-5 border-2 border-[#0F3D2E] bg-[#0F3D2E]/5 rounded-2xl space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-extrabold text-gray-900 text-sm">Home (Default)</span>
                    <span className="text-xs font-extrabold bg-[#0F3D2E] text-white px-2.5 py-0.5 rounded-full">
                      Primary
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 font-medium">Jane Doe • +62 812 3456 7890</p>
                  <p className="text-xs text-gray-800 font-medium">
                    123 Main Street, Apt 4B, Central Jakarta, DKI Jakarta, 10110
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
}
