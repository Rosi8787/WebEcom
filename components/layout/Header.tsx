'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, User, ShoppingBag, ShoppingCart, X, ArrowRight } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { mockProducts } from '@/lib/mock-products';

export default function Header() {
  const router = useRouter();
  const { totalItems, setIsCartOpen } = useShop();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Suggestions based on search input
  const suggestions = searchQuery.trim()
    ? mockProducts
        .filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 4)
    : [];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSelectProduct = (productId: string) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    router.push(`/products/${productId}`);
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-200/80 sticky top-0 z-40">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-3.5">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="min-w-fit flex items-center group">
            <div className="relative h-10 w-auto group-hover:opacity-90 transition-opacity duration-200">
              <Image
                src="/CARTO.png"
                alt="Carto logo"
                height={40}
                width={140}
                className="h-10 w-auto object-contain"
                priority
              />
            </div>
          </Link>

          {/* Navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold text-gray-600 tracking-wide uppercase">
            <Link href="/products" className="hover:text-[#0F3D2E] transition-colors">
              All Products
            </Link>
            <Link href="/products?category=wireless" className="hover:text-[#0F3D2E] transition-colors">
              Wireless
            </Link>
            <Link href="/products?category=earbuds" className="hover:text-[#0F3D2E] transition-colors">
              Earbuds
            </Link>
            <Link href="/products?sort=price-asc" className="hover:text-[#0F3D2E] transition-colors">
              Deals
            </Link>
            <Link href="/products?sort=rating" className="hover:text-[#0F3D2E] transition-colors">
              Top Rated
            </Link>
          </nav>

          {/* Desktop Search Bar with Live Preview */}
          <div ref={searchContainerRef} className="hidden md:block relative flex-1 max-w-sm">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder="Search headphones, earbuds..."
                value={searchQuery}
                onFocus={() => setIsSearchOpen(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                className="w-full px-4 py-2 pl-9 pr-8 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#0F3D2E]/20 focus:border-[#0F3D2E] text-xs font-medium text-gray-900 placeholder:text-gray-400 bg-gray-50/70 transition"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>

            {/* Suggestions Dropdown */}
            {isSearchOpen && searchQuery.trim().length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 z-50 animate-slide-up">
                {suggestions.length === 0 ? (
                  <div className="p-4 text-center text-xs text-gray-500">
                    No products found for &ldquo;{searchQuery}&rdquo;
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase text-gray-400 tracking-wider">
                      Matching Products
                    </div>
                    {suggestions.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSelectProduct(item.id)}
                        className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 text-left transition"
                      >
                        <div className="relative w-9 h-9 bg-gray-100 rounded-lg overflow-hidden shrink-0 border border-gray-200">
                          <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-xs text-gray-900 truncate">{item.name}</h4>
                          <span className="text-[11px] font-extrabold text-[#0F3D2E]">${item.price}.00</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-gray-300" />
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={handleSearchSubmit}
                      className="w-full text-center py-2 text-xs font-bold text-[#0F3D2E] hover:underline pt-2 border-t border-gray-100 mt-1"
                    >
                      View all results for &ldquo;{searchQuery}&rdquo; →
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Account & Cart Buttons */}
          <div className="flex items-center gap-3 text-xs font-bold text-gray-800">
            <Link
              href="/account"
              className="p-2.5 rounded-full hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900 flex items-center gap-2"
              aria-label="Account"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline text-xs font-semibold">Account</span>
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 bg-[#0F3D2E] text-white px-4 py-2 rounded-full hover:bg-[#0a2d21] transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline font-bold">Bag</span>
              <span className="bg-white text-[#0F3D2E] text-[11px] font-black px-2 py-0.5 rounded-full ml-0.5">
                {totalItems}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearchSubmit} className="md:hidden mt-3">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-9 pr-8 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#0F3D2E]/20 focus:border-[#0F3D2E] text-xs font-medium text-gray-900 placeholder:text-gray-400 bg-gray-50/60 transition"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </form>
      </div>
    </header>
  );
}
