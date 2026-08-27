'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, PhoneCall, Globe, MapPin, Check } from 'lucide-react';

const LANGUAGES = [
  { code: 'en', name: 'English (US)' },
  { code: 'id', name: 'Bahasa Indonesia' },
  { code: 'ja', name: '日本語' },
];

const LOCATIONS = [
  { id: 'id', name: 'Indonesia (IDR)' },
  { id: 'us', name: 'United States (USD)' },
  { id: 'sg', name: 'Singapore (SGD)' },
  { id: 'eu', name: 'Europe (EUR)' },
];

export default function TopBar() {
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
  const [selectedLoc, setSelectedLoc] = useState(LOCATIONS[1]);
  const [openDropdown, setOpenDropdown] = useState<'lang' | 'loc' | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-[#0F3D2E] text-white/90 text-xs py-2 px-4 sm:px-6 lg:px-12 border-b border-white/10 relative z-50"
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        {/* Left: Phone */}
        <div className="hidden sm:flex items-center gap-1.5 text-white/80 font-medium tracking-wide">
          <PhoneCall className="w-3 h-3 text-emerald-400" />
          <span>+62 856-9562-1422</span>
        </div>

        {/* Center: Promo */}
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <span className="font-medium text-white/90">Get 50% Off on Selected Items</span>
          <span className="text-white/30 hidden md:inline">|</span>
          <Link
            href="/products"
            className="font-bold underline underline-offset-4 hover:text-white transition-colors text-emerald-200 hover:text-emerald-100"
          >
            Shop Now
          </Link>
        </div>

        {/* Right: Language & Location */}
        <div className="hidden sm:flex items-center gap-5 font-medium">
          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(openDropdown === 'lang' ? null : 'lang')}
              className="flex items-center gap-1.5 hover:text-white transition-colors py-0.5 text-white/80 hover:text-white"
            >
              <Globe className="w-3 h-3 text-emerald-300" />
              <span>{selectedLang.name.split(' ')[0]}</span>
              <ChevronDown className="w-3 h-3 opacity-70" />
            </button>

            {openDropdown === 'lang' && (
              <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-xl shadow-xl border border-gray-100 text-gray-800 p-1.5 z-50 animate-slide-up">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLang(lang);
                      setOpenDropdown(null);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-between transition-colors ${selectedLang.code === lang.code
                        ? 'bg-[#0F3D2E]/10 text-[#0F3D2E] font-bold'
                        : 'hover:bg-gray-100 text-gray-700'
                      }`}
                  >
                    <span>{lang.name}</span>
                    {selectedLang.code === lang.code && <Check className="w-3 h-3 text-[#0F3D2E]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Location Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(openDropdown === 'loc' ? null : 'loc')}
              className="flex items-center gap-1.5 hover:text-white transition-colors py-0.5 text-white/80 hover:text-white"
            >
              <MapPin className="w-3 h-3 text-emerald-300" />
              <span>{selectedLoc.name.split(' ')[0]}</span>
              <ChevronDown className="w-3 h-3 opacity-70" />
            </button>

            {openDropdown === 'loc' && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 text-gray-800 p-1.5 z-50 animate-slide-up">
                {LOCATIONS.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => {
                      setSelectedLoc(loc);
                      setOpenDropdown(null);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-between transition-colors ${selectedLoc.id === loc.id
                        ? 'bg-[#0F3D2E]/10 text-[#0F3D2E] font-bold'
                        : 'hover:bg-gray-100 text-gray-700'
                      }`}
                  >
                    <span>{loc.name}</span>
                    {selectedLoc.id === loc.id && <Check className="w-3 h-3 text-[#0F3D2E]" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
