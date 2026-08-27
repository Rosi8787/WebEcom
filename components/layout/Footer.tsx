'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Send,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Mail,
  PhoneCall,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { useShop } from '@/context/ShopContext';

export default function Footer() {
  const { showToast } = useShop();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Invalid Email', 'Please enter a valid email address.', 'error');
      return;
    }
    setIsSubscribed(true);
    showToast('Subscribed!', 'Thank you for joining our newsletter.', 'success');
    setEmail('');
  };

  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">

        {/* Top Guarantee Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pb-12 border-b border-gray-100">
          {[
            {
              icon: Truck,
              title: 'Free Express Delivery',
              sub: 'On orders over $50',
              color: 'text-[#0F3D2E]',
              bg: 'bg-[#0F3D2E]/8',
            },
            {
              icon: ShieldCheck,
              title: '1 Year Warranty',
              sub: '100% Genuine products',
              color: 'text-blue-600',
              bg: 'bg-blue-50',
            },
            {
              icon: RotateCcw,
              title: '30 Days Return',
              sub: 'Hassle-free guarantee',
              color: 'text-amber-600',
              bg: 'bg-amber-50',
            },
            {
              icon: Headphones,
              title: '24/7 Support',
              sub: 'Expert audio assistance',
              color: 'text-purple-600',
              bg: 'bg-purple-50',
            },
          ].map(({ icon: Icon, title, sub, color, bg }) => (
            <div
              key={title}
              className="flex items-center gap-4 p-5 rounded-2xl border border-gray-100 bg-gray-50/60 hover:border-gray-200 transition-colors"
            >
              <div
                className={`w-11 h-11 rounded-xl ${bg} ${color} flex items-center justify-center shrink-0`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-900">{title}</h4>
                <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 py-14">

          {/* Col 1: Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center group">
              <Image
                src="/CARTO.png"
                alt="Carto logo"
                height={36}
                width={120}
                className="h-9 w-auto object-contain"
              />
            </Link>
            <p className="text-xs text-gray-500 leading-relaxed max-w-sm">
              Your premier destination for high-fidelity headphones, wireless earbuds, and
              audiophile audio equipment. Crafted for pure sound lovers worldwide.
            </p>
            <div className="space-y-2.5 text-xs text-gray-500 pt-1">
              <div className="flex items-center gap-2.5">
                <PhoneCall className="w-3.5 h-3.5 text-[#0F3D2E]" />
                <span>+62 856-9562-1422 (Mon – Sat, 9am – 8pm)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[#0F3D2E]" />
                <span>support@carto.example.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#0F3D2E]" />
                <span>120 Tech Boulevard, Suite 400</span>
              </div>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div className="lg:col-span-2 space-y-3">
            <h5 className="text-[11px] font-black uppercase tracking-wider text-gray-400">
              Categories
            </h5>
            <ul className="space-y-2.5 text-xs text-gray-600 font-medium">
              {[
                { label: 'Wireless Audio', href: '/products?category=wireless' },
                { label: 'Earbuds & In-Ear', href: '/products?category=earbuds' },
                { label: 'Noise Cancelling', href: '/products?category=noise-cancel' },
                { label: 'Gaming Headsets', href: '/products?category=gaming' },
                { label: 'Studio Monitors', href: '/products?category=studio' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="hover:text-[#0F3D2E] hover:font-semibold transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Customer Care */}
          <div className="lg:col-span-2 space-y-3">
            <h5 className="text-[11px] font-black uppercase tracking-wider text-gray-400">
              Customer Care
            </h5>
            <ul className="space-y-2.5 text-xs text-gray-600 font-medium">
              {[
                { label: 'Order Tracking', href: '/account' },
                { label: 'My Account', href: '/account' },
                { label: 'Product Catalog', href: '/products' },
                { label: 'Shopping Bag', href: '/cart' },
                { label: 'Admin Dashboard', href: '/admin' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="hover:text-[#0F3D2E] hover:font-semibold transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="lg:col-span-4 space-y-4">
            <h5 className="text-[11px] font-black uppercase tracking-wider text-gray-400">
              Newsletter
            </h5>
            <p className="text-xs text-gray-500 leading-relaxed">
              Get 15% off your first purchase, exclusive member drops, and audio gear reviews.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0F3D2E]/20 focus:border-[#0F3D2E] transition"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#0F3D2E] text-white rounded-xl font-bold text-xs hover:bg-[#0c3125] transition-colors flex items-center gap-1.5 shrink-0 shadow-sm"
                >
                  <span>Subscribe</span>
                  <Send className="w-3 h-3" />
                </button>
              </div>
              {isSubscribed && (
                <p className="text-[11px] text-[#0F3D2E] font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Subscribed successfully!
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 font-medium">
          <p>© {new Date().getFullYear()} Carto Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-gray-700 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/" className="hover:text-gray-700 transition-colors">
              Terms of Service
            </Link>
            <Link href="/" className="hover:text-gray-700 transition-colors">
              Security
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
