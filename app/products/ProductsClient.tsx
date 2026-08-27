'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Search,
  SearchX,
  ChevronDown,
  Heart,
  Star,
  ShoppingBag,
  SlidersHorizontal,
  RotateCcw,
  Check,
} from 'lucide-react';
import { mockProducts, categories } from '@/lib/mock-products';
import { Product } from '@/types/product';
import { useShop } from '@/context/ShopContext';
import CategoryIcon from '@/components/ui/CategoryIcon';

/* ── Helpers ─────────────────────────────────── */

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

function Dropdown({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = options.find((o) => o.value === value)?.label ?? label;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-800 hover:border-[#0F3D2E] hover:text-[#0F3D2E] transition-all duration-200 min-w-[140px] justify-between shadow-sm"
      >
        <span>{current}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${
            open ? 'rotate-180 opacity-100' : ''
          }`}
        />
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl z-30 p-1.5 space-y-0.5 animate-slide-up">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-xl flex items-center justify-between transition-colors ${
                value === opt.value
                  ? 'bg-[#0F3D2E]/10 text-[#0F3D2E] font-bold'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span>{opt.label}</span>
              {value === opt.value && <Check className="w-3.5 h-3.5 text-[#0F3D2E]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Product card for the catalog page ─────────── */
function ProductCardItem({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const wished = isInWishlist(product.id);

  return (
    <div className="group bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
      <div>
        <div className="relative aspect-square bg-[#F7F7F5] overflow-hidden">
          <button
            onClick={() => toggleWishlist(product)}
            className="absolute top-3.5 right-3.5 z-10 w-9 h-9 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-md border border-gray-100 hover:scale-110 active:scale-95 transition-all duration-200"
            aria-label={wished ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart
              className={`w-4 h-4 transition-colors duration-200 ${
                wished ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-gray-600'
              }`}
            />
          </button>
          <Link href={`/products/${product.id}`} className="block w-full h-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-6 group-hover:scale-[1.06] transition-transform duration-300"
            />
          </Link>
        </div>
        <div className="p-4 sm:p-5 flex flex-col">
          <Link
            href={`/products/${product.id}`}
            className="font-extrabold text-gray-950 text-sm leading-snug line-clamp-1 mb-1 hover:text-[#0F3D2E] transition-colors"
          >
            {product.name}
          </Link>
          <p className="text-[11px] text-gray-400 line-clamp-1 mb-2">{product.description}</p>
          <div className="flex items-center gap-2 mb-3">
            <StarRating rating={product.rating} />
            <span className="text-[11px] text-gray-400 font-medium">({product.reviewCount})</span>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-5 pt-0 flex items-center justify-between mt-auto">
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
  );
}

/* ── Sort & filter options ───────────────────── */
const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'reviews', label: 'Most Reviewed' },
  { value: 'name-asc', label: 'Name: A to Z' },
];

const PRICE_OPTIONS = [
  { value: 'all', label: 'All Prices' },
  { value: 'under50', label: 'Under $50' },
  { value: '50-100', label: '$50 – $100' },
  { value: '100-300', label: '$100 – $300' },
  { value: 'over300', label: 'Over $300' },
];

const RATING_OPTIONS = [
  { value: 'all', label: 'All Ratings' },
  { value: '5', label: '5 Stars Only' },
  { value: '4', label: '4 Stars & Above' },
  { value: '3', label: '3 Stars & Above' },
];

/* ── Main component ──────────────────────────── */
export default function ProductsClient() {
  const searchParams = useSearchParams();
  const querySearch = searchParams.get('search') || '';
  const queryCategory = searchParams.get('category') || 'all';
  const querySort = searchParams.get('sort') || 'featured';

  const [activeCategory, setActiveCategory] = useState(queryCategory);
  const [sort, setSort] = useState(querySort);
  const [priceFilter, setPrice] = useState('all');
  const [ratingFilter, setRating] = useState('all');
  const [search, setSearch] = useState(querySearch);

  useEffect(() => {
    if (querySearch) setSearch(querySearch);
    if (queryCategory) setActiveCategory(queryCategory);
    if (querySort) setSort(querySort);
  }, [querySearch, queryCategory, querySort]);

  const filtered = useMemo(() => {
    let list = [...mockProducts];

    // category
    if (activeCategory !== 'all') {
      const cat = activeCategory.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(cat) ||
          p.description.toLowerCase().includes(cat) ||
          (p.category && p.category.toLowerCase() === cat)
      );
    }

    // search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }

    // price
    if (priceFilter === 'under50') list = list.filter((p) => p.price < 50);
    if (priceFilter === '50-100') list = list.filter((p) => p.price >= 50 && p.price <= 100);
    if (priceFilter === '100-300') list = list.filter((p) => p.price > 100 && p.price <= 300);
    if (priceFilter === 'over300') list = list.filter((p) => p.price > 300);

    // rating
    if (ratingFilter === '5') list = list.filter((p) => p.rating === 5);
    if (ratingFilter === '4') list = list.filter((p) => p.rating >= 4);
    if (ratingFilter === '3') list = list.filter((p) => p.rating >= 3);

    // sort
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    if (sort === 'reviews') list.sort((a, b) => b.reviewCount - a.reviewCount);
    if (sort === 'name-asc') list.sort((a, b) => a.name.localeCompare(b.name));

    return list;
  }, [activeCategory, sort, priceFilter, ratingFilter, search]);

  const handleResetFilters = () => {
    setActiveCategory('all');
    setSort('featured');
    setPrice('all');
    setRating('all');
    setSearch('');
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-8 font-medium">
        <Link href="/" className="hover:text-[#0F3D2E] transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-semibold">All Products</span>
      </div>

      {/* Page title */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-extrabold text-[#0F3D2E] uppercase tracking-widest block mb-1">
            Audio Storefront
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">
            All Headphones & Audio
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm font-medium mt-1">
            Showing {filtered.length} products available for instant order.
          </p>
        </div>

        {(activeCategory !== 'all' ||
          priceFilter !== 'all' ||
          ratingFilter !== 'all' ||
          search !== '') && (
          <button
            onClick={handleResetFilters}
            className="flex items-center gap-1.5 text-xs font-bold text-[#0F3D2E] hover:underline underline-offset-4"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>

      {/* Category chips */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                isActive
                  ? 'bg-[#0F3D2E] shadow-md scale-[1.02]'
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-[#0F3D2E] hover:text-[#0F3D2E]'
              }`}
              style={isActive ? { color: '#ffffff' } : undefined}
            >
              <CategoryIcon name={cat.iconName} className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Filter & Sort bar */}
      <div className="flex flex-wrap items-center gap-3 mb-8 p-4 bg-gray-50/80 rounded-3xl border border-gray-100">
        {/* Search */}
        <div className="relative flex-1 min-w-[220px]">
          <input
            type="text"
            placeholder="Filter by product name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2.5 pl-10 border border-gray-200 rounded-xl text-xs font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0F3D2E]/20 focus:border-[#0F3D2E] bg-white transition"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <div className="flex flex-wrap items-center gap-3 ml-auto">
          <Dropdown label="Price Range" options={PRICE_OPTIONS} value={priceFilter} onChange={setPrice} />
          <Dropdown label="Customer Rating" options={RATING_OPTIONS} value={ratingFilter} onChange={setRating} />
          <Dropdown label="Sort by" options={SORT_OPTIONS} value={sort} onChange={setSort} />
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 max-w-lg mx-auto p-8 shadow-sm">
          <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <SearchX className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">No products found</h3>
          <p className="text-xs text-gray-500 mb-6">
            We couldn&apos;t find any items matching your active filter criteria.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-6 py-2.5 bg-[#0F3D2E] text-white rounded-full font-bold text-xs hover:bg-[#0a2b20] transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCardItem key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
