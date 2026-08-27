'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ShoppingBag, Zap, Award } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { mockProducts } from '@/lib/mock-products';

const SLIDES = [
  {
    id: 1,
    image: '/hero/hero.png',
    badge: 'Limited Offer',
    badgeIcon: Zap,
    headline: ['Grab Upto', '50% Off', 'On Selected Headphone'],
    headlineAccentIndex: 1,
    subtext: 'Premium sound quality at unbeatable prices.\nLimited time offer — don\'t miss out.',
    ctaLabel: 'Buy Now',
    ctaLink: '/products',
    accentColor: '#0F3D2E',
    productIndex: 0,
  },
  {
    id: 2,
    image: '/hero/hero2.png',
    badge: 'New Arrivals',
    badgeIcon: Award,
    headline: ['Discover', 'Pure Sound', 'Engineered for You'],
    headlineAccentIndex: 1,
    subtext: 'Next-gen wireless technology.\nCrystal clear audio for every moment.',
    ctaLabel: 'Explore Now',
    ctaLink: '/products?sort=featured',
    accentColor: '#1B5E3B',
    productIndex: 1,
  },
  {
    id: 3,
    image: '/hero/hero3.png',
    badge: 'Top Rated',
    badgeIcon: Award,
    headline: ['Audiophile', 'Grade Audio', 'For Every Budget'],
    headlineAccentIndex: 1,
    subtext: 'Studio-quality sound in everyday gear.\nWorn by professionals, loved by everyone.',
    ctaLabel: 'Shop Top Rated',
    ctaLink: '/products?sort=rating',
    accentColor: '#2D4A3E',
    productIndex: 2,
  },
];

const AUTOPLAY_INTERVAL = 5000;

export default function HeroBanner() {
  const { addToCart, setIsCartOpen } = useShop();
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent(index);
        setIsTransitioning(false);
      }, 300);
    },
    [isTransitioning]
  );

  const next = useCallback(() => {
    goTo((current + 1) % SLIDES.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + SLIDES.length) % SLIDES.length);
  }, [current, goTo]);

  // Autoplay
  useEffect(() => {
    const timer = setInterval(next, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [next]);

  const slide = SLIDES[current];
  const BadgeIcon = slide.badgeIcon;

  const handleBuyNow = () => {
    addToCart(mockProducts[slide.productIndex]);
    setIsCartOpen(true);
  };

  return (
    <section className="relative bg-[#F5EDE3] overflow-hidden min-h-[420px] md:min-h-[500px] select-none">
      {/* Slides */}
      {SLIDES.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-500 ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
        >
          <Image
            src={s.image}
            alt={`Banner slide ${s.id}`}
            fill
            priority={i === 0}
            quality={95}
            className="object-cover object-center"
          />
        </div>
      ))}

      {/* Content — sits on top */}
      <div
        className={`relative z-20 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 transition-all duration-300 ${isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
          }`}
      >
        <div className="flex flex-col justify-center gap-6 py-20 md:py-28 max-w-xl">

          {/* Promo badge */}
          <span
            className="inline-flex w-fit items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full tracking-widest uppercase"
            style={{ backgroundColor: `${slide.accentColor}18`, color: slide.accentColor }}
          >
            <BadgeIcon className="w-3 h-3" />
            {slide.badge}
          </span>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-extrabold text-gray-950 leading-[1.1] tracking-tight">
            {slide.headline.map((part, i) =>
              i === slide.headlineAccentIndex ? (
                <span key={i} style={{ color: slide.accentColor }}>
                  {part}{' '}
                </span>
              ) : (
                <span key={i}>{part} </span>
              )
            )}
          </h1>

          {/* Subtext */}
          <p className="text-gray-700 text-base font-medium max-w-sm leading-relaxed whitespace-pre-line">
            {slide.subtext}
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleBuyNow}
              className="flex items-center gap-2 font-bold px-8 py-4 rounded-full text-sm tracking-wide shadow-md transition-all duration-200 ease-out hover:shadow-xl hover:scale-[1.03] active:scale-[0.98] text-white"
              style={{ backgroundColor: slide.accentColor }}
            >
              <ShoppingBag className="w-4 h-4" />
              Buy Now
            </button>
            <Link
              href={slide.ctaLink}
              className="bg-white/80 hover:bg-white text-gray-900 font-bold px-8 py-4 rounded-full text-sm shadow hover:shadow-lg transition-all duration-200"
            >
              {slide.ctaLabel} →
            </Link>
          </div>
        </div>
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white hover:scale-110 transition-all duration-200"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 text-gray-800" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white hover:scale-110 transition-all duration-200"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 text-gray-800" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${i === current
              ? 'w-6 h-2 bg-gray-900'
              : 'w-2 h-2 bg-gray-400/60 hover:bg-gray-600'
              }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
