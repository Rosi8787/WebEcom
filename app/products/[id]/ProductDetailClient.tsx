'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Star, Truck, ShieldCheck, RotateCcw, Lock, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import ProductCard from '@/components/landing/ProductCard';
import { mockProducts } from '@/lib/mock-products';
import { Product } from '@/types/product';
import { useShop } from '@/context/ShopContext';

interface ProductDetailProps {
  productId: string;
}

const COLORS = [
  { name: 'Space Gray', code: '#374151' },
  { name: 'Silver', code: '#E5E7EB' },
  { name: 'Emerald Green', code: '#0F3D2E' },
  { name: 'Midnight Blue', code: '#1E3A8A' },
];

export default function ProductDetailClient({ productId }: ProductDetailProps) {
  const { addToCart, toggleWishlist, isInWishlist, setIsCartOpen } = useShop();
  
  const product: Product | undefined = mockProducts.find((p) => p.id === productId) || mockProducts[0];
  
  const [selectedColor, setSelectedColor] = useState(COLORS[0].name);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc');

  const wished = isInWishlist(product.id);

  // Related products
  const relatedProducts = mockProducts.filter((p) => p.id !== product.id).slice(0, 4);

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor);
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col font-sans">
      <TopBar />
      <Header />

      <main className="flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-12 py-10">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-8 font-medium">
          <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-gray-900 transition-colors">Products</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold line-clamp-1">{product.name}</span>
        </div>

        {/* Top Product Detail Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          
          {/* Left: Product Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square bg-[#F8F8F7] rounded-3xl overflow-hidden border border-gray-100 shadow-sm flex items-center justify-center">
              <button
                onClick={() => toggleWishlist(product)}
                className="absolute top-5 right-5 z-10 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-gray-100 hover:scale-110 active:scale-95 transition-all"
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 transition-colors ${wished ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
              </button>

              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                className="object-contain p-12 transition-all duration-300 hover:scale-105"
              />
            </div>

            {/* Thumbnail previews */}
            <div className="grid grid-cols-4 gap-4">
              {[0, 1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className={`aspect-square bg-[#F8F8F7] rounded-2xl border-2 cursor-pointer transition-all ${
                    idx === 0 ? 'border-[#0F3D2E]' : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <div className="relative w-full h-full p-3">
                    <Image src={product.image} alt="Thumbnail" fill className="object-contain p-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Info & Actions */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="inline-block bg-[#0F3D2E]/10 text-[#0F3D2E] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
                In Stock & Ready to Ship
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-950 leading-tight">
                {product.name}
              </h1>
              <p className="text-gray-500 text-sm mt-2 font-medium">{product.description}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < product.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'}`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-gray-900">{product.rating}.0</span>
              <span className="text-gray-300">•</span>
              <span className="text-xs font-semibold text-gray-500">{product.reviewCount} customer reviews</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4 py-4 border-y border-gray-100">
              <span className="text-4xl font-extrabold text-gray-950">${product.price}.00</span>
              <span className="text-base text-gray-400 line-through">${(product.price * 1.25).toFixed(0)}.00</span>
              <span className="text-xs font-extrabold bg-red-100 text-red-600 px-2.5 py-1 rounded-full">
                SAVE 20%
              </span>
            </div>

            {/* Color Option Selector */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider">
                Color: <span className="text-[#0F3D2E] font-extrabold">{selectedColor}</span>
              </label>
              <div className="flex items-center gap-3">
                {COLORS.map((col) => (
                  <button
                    key={col.name}
                    onClick={() => setSelectedColor(col.name)}
                    className={`w-9 h-9 rounded-full border-2 transition-all flex items-center justify-center ${
                      selectedColor === col.name ? 'border-[#0F3D2E] scale-110 ring-2 ring-[#0F3D2E]/20' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: col.code }}
                    title={col.name}
                  />
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-200 rounded-full bg-gray-50 p-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-9 h-9 rounded-full bg-white text-gray-900 font-bold hover:bg-gray-200 transition shadow-sm flex items-center justify-center"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-extrabold text-sm text-gray-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-9 h-9 rounded-full bg-white text-gray-900 font-bold hover:bg-gray-200 transition shadow-sm flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-xs text-gray-400 font-medium">Only 14 left in stock</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <button
                onClick={() => addToCart(product, quantity, selectedColor)}
                className="py-3.5 border border-gray-900 text-gray-900 rounded-full font-bold text-xs hover:bg-gray-900 hover:text-white transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag</span>
              </button>
              <button
                onClick={handleBuyNow}
                className="py-3.5 bg-[#0F3D2E] text-white rounded-full font-bold text-xs hover:bg-[#0a2b20] transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <span>Buy Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Delivery Perks */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100 text-xs font-semibold text-gray-600">
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-[#0F3D2E]" /> Free Express Shipping
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#0F3D2E]" /> 1 Year Warranty Included
              </div>
              <div className="flex items-center gap-2.5">
                <RotateCcw className="w-4 h-4 text-[#0F3D2E]" /> 30 Days Easy Return
              </div>
              <div className="flex items-center gap-2.5">
                <Lock className="w-4 h-4 text-[#0F3D2E]" /> 100% Secure Checkout
              </div>
            </div>

          </div>

        </div>

        {/* Tabbed Info (Description, Specs, Reviews) */}
        <div className="mb-20">
          <div className="flex border-b border-gray-200 gap-8 mb-8">
            <button
              onClick={() => setActiveTab('desc')}
              className={`pb-4 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
                activeTab === 'desc'
                  ? 'border-[#0F3D2E] text-[#0F3D2E]'
                  : 'border-transparent text-gray-400 hover:text-gray-700'
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-4 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
                activeTab === 'specs'
                  ? 'border-[#0F3D2E] text-[#0F3D2E]'
                  : 'border-transparent text-gray-400 hover:text-gray-700'
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
                activeTab === 'reviews'
                  ? 'border-[#0F3D2E] text-[#0F3D2E]'
                  : 'border-transparent text-gray-400 hover:text-gray-700'
              }`}
            >
              Reviews ({product.reviewCount})
            </button>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-gray-100 text-gray-700 text-sm leading-relaxed shadow-sm">
            {activeTab === 'desc' && (
              <div className="space-y-4 max-w-3xl">
                <h3 className="font-extrabold text-base text-gray-900">Experience Unmatched Sound Quality</h3>
                <p className="text-gray-600 text-sm">
                  The {product.name} delivers an immersive listening experience crafted with precision engineering. Featuring advanced acoustic drivers and active noise suppression, enjoy pure audio fidelity across every genre.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-xs text-gray-600">
                  <li>Ergonomic cushioned earcups designed for all-day comfort.</li>
                  <li>Ultra-fast Bluetooth 5.3 connectivity with zero audio latency.</li>
                  <li>Long battery life up to 30 hours on a single quick charge.</li>
                </ul>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl text-xs">
                <div className="flex justify-between py-2.5 border-b border-gray-100">
                  <span className="font-bold text-gray-900">Brand</span>
                  <span className="text-gray-600">Shopcart Original</span>
                </div>
                <div className="flex justify-between py-2.5 border-b border-gray-100">
                  <span className="font-bold text-gray-900">Connectivity</span>
                  <span className="text-gray-600">Wireless Bluetooth 5.3</span>
                </div>
                <div className="flex justify-between py-2.5 border-b border-gray-200">
                  <span className="font-bold text-gray-900">Battery Life</span>
                  <span className="text-gray-600">Up to 30 hours</span>
                </div>
                <div className="flex justify-between py-2.5 border-b border-gray-200">
                  <span className="font-bold text-gray-900">Water Resistance</span>
                  <span className="text-gray-600">IPX8 Waterproof</span>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6 max-w-3xl">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div>
                    <h4 className="font-extrabold text-gray-900 text-sm">Customer Reviews</h4>
                    <p className="text-xs text-gray-400">Based on verified purchases</p>
                  </div>
                  <button className="px-5 py-2 bg-[#0F3D2E] text-white rounded-full text-xs font-bold hover:bg-[#0a2b20]">
                    Write a Review
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-50/70 p-4 rounded-2xl border border-gray-100">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-gray-900 text-xs">Alex Johnson</span>
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-600">
                      "Incredible bass response and noise cancellation! Worth every single penny."
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        <div>
          <h2 className="text-xl font-extrabold text-gray-950 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}

