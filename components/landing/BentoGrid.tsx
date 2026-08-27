'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Star, ArrowRight, ShoppingBag } from 'lucide-react';
import { mockProducts, categories } from '@/lib/mock-products';
import { Product } from '@/types/product';
import { useShop } from '@/context/ShopContext';
import CategoryIcon from '@/components/ui/CategoryIcon';

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

function WishlistBtn({ product }: { product: Product }) {
  const { toggleWishlist, isInWishlist } = useShop();
  const wished = isInWishlist(product.id);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(product);
      }}
      className="w-9 h-9 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-md border border-gray-100 hover:scale-110 active:scale-95 transition-all duration-200"
      aria-label={wished ? 'Remove from Wishlist' : 'Add to Wishlist'}
    >
      <Heart
        className={`w-4 h-4 transition-colors duration-200 ${
          wished ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-gray-600'
        }`}
      />
    </button>
  );
}

/* ── Card variants ─────────────────────────────── */

/** Large featured card — spans 2 rows */
function CardLarge({ product }: { product: Product }) {
  const { addToCart } = useShop();
  return (
    <div className="group relative bg-[#F7F6F2] rounded-3xl overflow-hidden flex flex-col row-span-2 hover:shadow-2xl transition-all duration-300 border border-gray-100">
      <Link href={`/products/${product.id}`} className="relative flex-1 min-h-[260px] block">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-8 group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-4 left-4 bg-[#0F3D2E] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
          Featured
        </span>
      </Link>
      <div className="absolute top-4 right-4 z-10">
        <WishlistBtn product={product} />
      </div>
      <div className="p-6 bg-white flex flex-col justify-between">
        <div>
          <Link
            href={`/products/${product.id}`}
            className="font-extrabold text-gray-950 text-lg leading-tight mb-1 block hover:text-[#0F3D2E] transition-colors"
          >
            {product.name}
          </Link>
          <p className="text-xs text-gray-500 mb-3 line-clamp-1">{product.description}</p>
          <div className="flex items-center justify-between">
            <div>
              <StarRating rating={product.rating} />
              <span className="text-[11px] text-gray-400 mt-0.5 block">
                ({product.reviewCount} reviews)
              </span>
            </div>
            <span className="text-2xl font-extrabold text-gray-950">${product.price}.00</span>
          </div>
        </div>
        <button
          onClick={() => addToCart(product)}
          className="mt-4 w-full py-3 bg-[#0F3D2E] text-white rounded-2xl text-xs font-bold tracking-wide hover:bg-[#0a2d21] hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Add to Bag</span>
        </button>
      </div>
    </div>
  );
}

/** Wide card — spans 2 columns */
function CardWide({ product }: { product: Product }) {
  const { addToCart } = useShop();
  return (
    <div className="group relative bg-[#F0F7F4] rounded-3xl overflow-hidden flex flex-row col-span-2 hover:shadow-xl transition-all duration-300 border border-emerald-100/50">
      <Link href={`/products/${product.id}`} className="relative w-48 shrink-0 block bg-emerald-50/50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
        />
      </Link>
      <div className="flex flex-col justify-center p-6 flex-1 bg-white">
        <span className="text-[10px] font-bold text-[#0F3D2E] uppercase tracking-widest mb-1.5">
          Best Seller
        </span>
        <Link
          href={`/products/${product.id}`}
          className="font-extrabold text-gray-950 text-base leading-tight mb-1 hover:text-[#0F3D2E] transition-colors"
        >
          {product.name}
        </Link>
        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{product.description}</p>
        <StarRating rating={product.rating} />
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-extrabold text-gray-950">${product.price}.00</span>
          <button
            onClick={() => addToCart(product)}
            className="px-5 py-2.5 bg-[#0F3D2E] text-white rounded-full text-xs font-bold hover:bg-[#0a2d21] hover:shadow-md transition-all duration-200 flex items-center gap-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Bag</span>
          </button>
        </div>
      </div>
      <div className="absolute top-4 right-4 z-10">
        <WishlistBtn product={product} />
      </div>
    </div>
  );
}

/** Standard card */
function CardStandard({ product, accent = false }: { product: Product; accent?: boolean }) {
  const { addToCart } = useShop();
  return (
    <div
      className={`group relative rounded-3xl overflow-hidden flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${
        accent ? 'bg-[#FFF8F0] border border-amber-100' : 'bg-white border border-gray-100'
      }`}
    >
      <Link href={`/products/${product.id}`} className="relative aspect-square block bg-gray-50/50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-6 group-hover:scale-[1.06] transition-transform duration-300"
        />
      </Link>
      <div className="absolute top-3 right-3 z-10">
        <WishlistBtn product={product} />
      </div>
      <div className="p-4 pb-5 bg-white">
        <Link
          href={`/products/${product.id}`}
          className="font-bold text-gray-950 text-sm leading-snug line-clamp-1 mb-1 block hover:text-[#0F3D2E] transition-colors"
        >
          {product.name}
        </Link>
        <p className="text-[11px] text-gray-400 line-clamp-1 mb-2">{product.description}</p>
        <StarRating rating={product.rating} />
        <div className="flex items-center justify-between mt-3">
          <span className="text-base font-extrabold text-gray-950">${product.price}.00</span>
          <button
            onClick={() => addToCart(product)}
            className="px-4 py-2 border border-gray-900 text-gray-900 rounded-full text-xs font-bold hover:bg-gray-900 hover:text-white transition-all duration-200"
          >
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
}

/** Tall card — spans 2 rows, minimal style */
function CardTall({ product }: { product: Product }) {
  const { addToCart } = useShop();
  return (
    <div className="group relative bg-[#0F3D2E] rounded-3xl overflow-hidden flex flex-col row-span-2 hover:shadow-2xl transition-all duration-300 justify-between">
      <Link href={`/products/${product.id}`} className="relative flex-1 min-h-[200px] block">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-8 group-hover:scale-105 transition-transform duration-500 brightness-105"
        />
      </Link>
      <div className="absolute top-4 right-4 z-10">
        <WishlistBtn product={product} />
      </div>
      <div className="p-5">
        <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest">
          Premium Pick
        </span>
        <Link
          href={`/products/${product.id}`}
          className="font-extrabold text-white text-base leading-tight mt-1 mb-2 block hover:underline"
        >
          {product.name}
        </Link>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-extrabold text-white">${product.price}.00</span>
          <button
            onClick={() => addToCart(product)}
            className="px-4 py-2 bg-white text-[#0F3D2E] rounded-full text-xs font-extrabold hover:bg-white/90 active:scale-95 transition-all duration-200"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Main BentoGrid component ───────────────────── */

export default function BentoGrid() {
  const [activeCategory, setActiveCategory] = useState('all');
  const p = mockProducts;

  return (
    <section className="py-16 md:py-20 bg-gray-50/70">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-[11px] font-extrabold text-[#0F3D2E] uppercase tracking-widest block mb-1">
              Curated Collection
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">
              Headphones For You
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm font-medium mt-1">
              Discover sound tailored to your lifestyle and taste.
            </p>
          </div>
          <Link
            href="/products"
            className="text-xs sm:text-sm font-bold text-[#0F3D2E] hover:underline underline-offset-4 flex items-center gap-1 group"
          >
            <span>View All Catalog</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <Link
                  key={cat.id}
                  href={`/products?category=${cat.id}`}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                    isActive
                      ? 'bg-[#0F3D2E] shadow-md scale-[1.02]'
                      : 'bg-white border border-gray-200 text-gray-700 hover:border-[#0F3D2E] hover:text-[#0F3D2E]'
                  }`}
                  style={isActive ? { color: '#ffffff' } : {}}
                >
                  <CategoryIcon name={cat.iconName} className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </Link>
              );
            })}
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-[220px] gap-4">
          {/* Row 1: Large featured (spans 2 rows) + 2 standard + 1 tall (spans 2 rows) */}
          <CardLarge product={p[0]} />
          <CardStandard product={p[1]} />
          <CardStandard product={p[2]} accent />
          <CardTall product={p[4]} />

          {/* Row 2: fills under large & tall, wide card in middle 2 cols */}
          <CardWide product={p[5]} />

          {/* Row 3: 4 standard cards */}
          <CardStandard product={p[6]} accent />
          <CardStandard product={p[7]} />
          <CardStandard product={p[8]} />
          <CardStandard product={p[9]} />
        </div>
      </div>
    </section>
  );
}
