'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, SlidersHorizontal, Check, ArrowRight } from 'lucide-react';

const FILTER_CONFIG = [
  {
    id: 'type',
    label: 'Headphone Type',
    options: [
      { label: 'All Types', value: 'all', param: 'category' },
      { label: 'Wireless', value: 'wireless', param: 'category' },
      { label: 'Earbuds', value: 'earbuds', param: 'category' },
      { label: 'Wired', value: 'wired', param: 'category' },
      { label: 'Gaming', value: 'gaming', param: 'category' },
      { label: 'Noise Cancel', value: 'noise-cancel', param: 'category' },
    ],
  },
  {
    id: 'price',
    label: 'Price',
    options: [
      { label: 'All Prices', value: 'all', param: 'price' },
      { label: 'Under $50', value: 'under50', param: 'price' },
      { label: '$50 – $100', value: '50-100', param: 'price' },
      { label: '$100 – $300', value: '100-300', param: 'price' },
      { label: 'Over $300', value: 'over300', param: 'price' },
    ],
  },
  {
    id: 'review',
    label: 'Review',
    options: [
      { label: 'All Ratings', value: 'all', param: 'rating' },
      { label: '5 Stars Only', value: '5', param: 'rating' },
      { label: '4 Stars & Above', value: '4', param: 'rating' },
      { label: '3 Stars & Above', value: '3', param: 'rating' },
    ],
  },
  {
    id: 'color',
    label: 'Color',
    options: [
      { label: 'All Colors', value: 'all', param: 'search' },
      { label: 'Space Gray', value: 'gray', param: 'search' },
      { label: 'Silver', value: 'silver', param: 'search' },
      { label: 'Emerald Green', value: 'green', param: 'search' },
      { label: 'Midnight Blue', value: 'blue', param: 'search' },
    ],
  },
  {
    id: 'offer',
    label: 'Offer',
    options: [
      { label: 'All Deals', value: 'featured', param: 'sort' },
      { label: '50% Off Selected', value: 'price-asc', param: 'sort' },
      { label: 'Best Sellers', value: 'reviews', param: 'sort' },
      { label: 'Top Rated Deals', value: 'rating', param: 'sort' },
    ],
  },
];

const SORT_OPTIONS = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Highest Rated', value: 'rating' },
  { label: 'Most Reviewed', value: 'reviews' },
  { label: 'Name: A → Z', value: 'name-asc' },
];

export default function FilterBar() {
  const router = useRouter();
  const [activeOpen, setActiveOpen] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});
  const [activeSort, setActiveSort] = useState('featured');
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        setActiveOpen(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectOption = (filterId: string, param: string, value: string) => {
    setSelectedFilters((prev) => ({ ...prev, [filterId]: value }));
    setActiveOpen(null);
    if (value === 'all') {
      router.push('/products');
    } else {
      router.push(`/products?${param}=${encodeURIComponent(value)}`);
    }
  };

  const handleSelectSort = (value: string) => {
    setActiveSort(value);
    setActiveOpen(null);
    router.push(`/products?sort=${encodeURIComponent(value)}`);
  };

  return (
    <div ref={barRef} className="bg-white border-b border-gray-100 py-3.5 sticky top-[61px] z-30 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Left: Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {FILTER_CONFIG.map((f) => {
              const isOpen = activeOpen === f.id;
              const hasSelection = selectedFilters[f.id] && selectedFilters[f.id] !== 'all';

              return (
                <div key={f.id} className="relative">
                  <button
                    onClick={() => setActiveOpen(isOpen ? null : f.id)}
                    className={`px-4 py-2 border rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-1.5 active:scale-[0.97] ${
                      hasSelection
                        ? 'border-[#0F3D2E] bg-[#0F3D2E] text-white shadow-sm'
                        : 'border-gray-200 bg-white text-gray-800 hover:border-[#0F3D2E] hover:text-[#0F3D2E]'
                    }`}
                  >
                    <span>{f.label}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 opacity-100' : 'opacity-60'
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isOpen && (
                    <div className="absolute top-full left-0 mt-2 w-52 bg-white border border-gray-100 rounded-2xl shadow-xl z-40 p-2 space-y-1 animate-slide-up">
                      <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase text-gray-400 tracking-wider">
                        Filter by {f.label}
                      </div>
                      {f.options.map((opt) => {
                        const isSelected = selectedFilters[f.id] === opt.value;
                        return (
                          <button
                            key={opt.value}
                            onClick={() => handleSelectOption(f.id, opt.param, opt.value)}
                            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                              isSelected
                                ? 'bg-[#0F3D2E]/10 text-[#0F3D2E] font-bold'
                                : 'text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            <span>{opt.label}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-[#0F3D2E]" />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {/* All Filters button */}
            <button
              onClick={() => router.push('/products')}
              className="px-4 py-2 border border-gray-200 rounded-full text-xs font-bold text-gray-800 hover:border-[#0F3D2E] hover:text-[#0F3D2E] hover:bg-[#0F3D2E]/5 transition-all duration-200 bg-white flex items-center gap-1.5 active:scale-[0.97]"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>All Filters</span>
            </button>
          </div>

          {/* Right: Sort by */}
          <div className="relative">
            <button
              onClick={() => setActiveOpen(activeOpen === 'sort' ? null : 'sort')}
              className="px-4 py-2 border border-gray-200 rounded-full text-xs font-bold text-gray-800 hover:border-[#0F3D2E] hover:text-[#0F3D2E] hover:bg-[#0F3D2E]/5 transition-all duration-200 bg-white flex items-center gap-1.5 active:scale-[0.97]"
            >
              <span>Sort by:</span>
              <span className="text-[#0F3D2E] font-extrabold capitalize">
                {SORT_OPTIONS.find((s) => s.value === activeSort)?.label.split(':')[0] || 'Featured'}
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  activeOpen === 'sort' ? 'rotate-180 opacity-100' : 'opacity-60'
                }`}
              />
            </button>

            {activeOpen === 'sort' && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl z-40 p-2 space-y-1 animate-slide-up">
                <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase text-gray-400 tracking-wider">
                  Sort Products
                </div>
                {SORT_OPTIONS.map((sortOpt) => {
                  const isSelected = activeSort === sortOpt.value;
                  return (
                    <button
                      key={sortOpt.value}
                      onClick={() => handleSelectSort(sortOpt.value)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                        isSelected
                          ? 'bg-[#0F3D2E]/10 text-[#0F3D2E] font-bold'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span>{sortOpt.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#0F3D2E]" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
