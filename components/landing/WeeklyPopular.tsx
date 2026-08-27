'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ChevronRight, ChevronLeft, ArrowRight, ShoppingBag } from 'lucide-react';
import { mockProducts } from '@/lib/mock-products';
import { useShop } from '@/context/ShopContext';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'
          }`}
        />
      ))}
    </div>
  );
}

const PAGES = [
  mockProducts.slice(0, 4),   // page 1
  mockProducts.slice(4, 8),   // page 2
  mockProducts.slice(6, 10),  // page 3
];

export default function WeeklyPopular() {
  const [page, setPage] = useState(0);
  const { addToCart } = useShop();
  const current = PAGES[page];

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-[11px] font-extrabold text-[#0F3D2E] uppercase tracking-widest block mb-1">
              Trending This Week
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">
              Weekly Popular Products
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm font-medium mt-1">
              Top requested items based on buyer reviews and volume.
            </p>
          </div>
          <Link
            href="/products"
            className="text-xs sm:text-sm font-bold text-[#0F3D2E] hover:underline underline-offset-4 hidden sm:flex items-center gap-1 group"
          >
            <span>See All Products</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Product list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 min-h-[320px]">
          {current.map((product, idx) => (
            <div
              key={product.id}
              className="group flex flex-col bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 justify-between"
            >
              <div>
                {/* Rank badge */}
                <div className="relative aspect-[4/3] bg-[#F7F7F5]">
                  <span className="absolute top-3 left-3 z-10 w-7 h-7 rounded-full bg-[#0F3D2E] text-white text-xs font-extrabold flex items-center justify-center shadow">
                    {page * 4 + idx + 1}
                  </span>
                  <Link href={`/products/${product.id}`} className="block w-full h-full">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-5 group-hover:scale-[1.06] transition-transform duration-300"
                    />
                  </Link>
                </div>

                {/* Info */}
                <div className="p-4 flex flex-col">
                  <Link
                    href={`/products/${product.id}`}
                    className="font-bold text-gray-950 text-sm leading-snug line-clamp-1 mb-0.5 hover:text-[#0F3D2E] transition-colors"
                  >
                    {product.name}
                  </Link>
                  <p className="text-[11px] text-gray-400 line-clamp-1 mb-2">{product.description}</p>

                  <div className="flex items-center gap-2 mb-3">
                    <StarRating rating={product.rating} />
                    <span className="text-[11px] text-gray-400">({product.reviewCount})</span>
                  </div>
                </div>
              </div>

              {/* Price & Add to Cart */}
              <div className="p-4 pt-0 flex items-center justify-between mt-auto">
                <span className="text-lg font-extrabold text-gray-950">${product.price}.00</span>
                <button
                  onClick={() => addToCart(product)}
                  className="px-4 py-2 bg-[#0F3D2E] text-white rounded-full text-xs font-bold hover:bg-[#0a2d21] hover:scale-[1.03] active:scale-95 transition-all duration-200 flex items-center gap-1.5 shadow-sm"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Bag</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-12">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="w-10 h-10 rounded-full border border-gray-200 text-gray-700 text-sm font-bold flex items-center justify-center hover:border-[#0F3D2E] hover:text-[#0F3D2E] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 bg-white shadow-sm"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {PAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`w-10 h-10 rounded-full text-xs font-bold transition-all duration-200 ${
                i === page
                  ? 'bg-[#0F3D2E] text-white shadow-md scale-105'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(p + 1, PAGES.length - 1))}
            disabled={page === PAGES.length - 1}
            className="w-10 h-10 rounded-full border border-gray-200 text-gray-700 text-sm font-bold flex items-center justify-center hover:border-[#0F3D2E] hover:text-[#0F3D2E] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 bg-white shadow-sm"
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
