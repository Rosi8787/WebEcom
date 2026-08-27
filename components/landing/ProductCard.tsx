'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, Star, ShoppingBag } from 'lucide-react';
import { Product } from '@/types/product';
import { useShop } from '@/context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const wished = isInWishlist(product.id);

  return (
    <div className="bg-white rounded-3xl border border-gray-100/90 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ease-out group flex flex-col justify-between">

      {/* Top Clickable Image Container */}
      <div>
        <div className="relative aspect-square bg-[#F8F8F7] overflow-hidden">
          {/* Wishlist Button */}
          <button
            aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className="absolute top-3.5 right-3.5 w-9 h-9 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-md border border-gray-100 transition-all duration-200 hover:scale-110 active:scale-95 z-10"
          >
            <Heart className={`w-4 h-4 transition-colors duration-200 ${wished ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-gray-600'}`} />
          </button>

          {/* Product Image Link */}
          <Link href={`/products/${product.id}`} className="block w-full h-full">
            <div className="w-full h-full group-hover:scale-[1.06] transition-transform duration-300 ease-out relative">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-6"
              />
            </div>
          </Link>
        </div>

        {/* Content */}
        <div className="p-5 space-y-2.5">
          {/* Title & Price */}
          <div className="flex items-start justify-between gap-3">
            <Link href={`/products/${product.id}`} className="font-extrabold text-gray-900 text-sm leading-snug line-clamp-2 flex-1 hover:text-[#0F3D2E] transition-colors">
              {product.name}
            </Link>
            <span className="font-extrabold text-gray-950 text-base whitespace-nowrap shrink-0">
              ${product.price}
              <span className="text-xs text-gray-400 font-semibold">.00</span>
            </span>
          </div>

          {/* Description */}
          <p className="text-xs text-gray-500 font-medium line-clamp-1">
            {product.description}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1.5 pt-1">
            <div className="flex items-center gap-0.5 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${i < product.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'}`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-400 font-semibold">({product.reviewCount})</span>
          </div>
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="p-5 pt-0">
        <button
          onClick={() => addToCart(product)}
          className="w-full py-2.5 border border-gray-900 text-gray-900 rounded-full text-xs font-extrabold tracking-wide transition-all duration-200 ease-out hover:bg-gray-900 hover:text-white hover:shadow-md active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Add to Bag</span>
        </button>
      </div>
    </div>
  );
}


