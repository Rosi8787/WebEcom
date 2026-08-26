import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-slate-200 py-4 px-6 sm:px-12 flex justify-between items-center shadow-sm sticky top-0 z-50">
      <Link href="/" className="text-xl font-bold text-blue-600 hover:opacity-80 transition">
        MyBrand
      </Link>

      <nav className="flex items-center space-x-6 text-sm font-medium text-slate-600">
        <Link href="#features" className="hover:text-blue-600 transition">
          Fitur
        </Link>
        <Link href="#about" className="hover:text-blue-600 transition">
          Tentang
        </Link>
        <a 
          href="https://veloura-lake.vercel.app/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-blue-600 transition"
        >
          Veloura
        </a>
      </nav>
    </header>
  );
}