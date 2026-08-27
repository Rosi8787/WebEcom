import { Suspense } from 'react';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import ProductsClient from './ProductsClient';

export const metadata = {
  title: 'All Products — Shopcart',
  description: 'Browse our full collection of headphones and earbuds.',
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Header />
      <main>
        <Suspense fallback={<div className="max-w-[1400px] mx-auto p-12 text-center text-gray-400">Loading products...</div>}>
          <ProductsClient />
        </Suspense>
      </main>
    </div>
  );
}

