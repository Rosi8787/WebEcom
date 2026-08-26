import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between font-sans">
      {/* Header / Navbar */}
      <header className="w-full bg-white border-b border-slate-200 py-4 px-6 sm:px-12 flex justify-between items-center shadow-sm">
        <h1 className="text-xl font-bold text-blue-600">MyBrand</h1>
        <nav className="space-x-6 text-sm font-medium">
          <a href="#features" className="hover:text-blue-600 transition">Fitur</a>
          <a href="#about" className="hover:text-blue-600 transition">Tentang</a>
          <a href="#contact" className="hover:text-blue-600 transition">Kontak</a>
          <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition shadow-sm text-xs">
            Masuk
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto px-6 py-20 text-center flex-1 flex flex-col justify-center items-center">
        <span className="text-xs uppercase tracking-widest bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold mb-4">
          Next.js App Router
        </span>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
          Selamat Datang di Website Simple
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mb-8">
          Website ini dibangun menggunakan Next.js dan Tailwind CSS untuk tampilan yang bersih, responsif, dan performa tinggi.
        </p>
        <div className="flex gap-4">
          <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow-md transition">
            Mulai Sekarang
          </Link>
          <button className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-medium px-6 py-3 rounded-lg transition">
            Pelajari Lebih Lanjut
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-slate-200 py-6 text-center text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} MyBrand. Built with Next.js.</p>
      </footer>
    </div>
  );
}