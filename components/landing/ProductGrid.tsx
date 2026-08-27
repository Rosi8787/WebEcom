import { mockProducts } from '@/lib/mock-products';
import ProductCard from './ProductCard';

export default function ProductGrid() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">

        {/* Section Header */}
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">
            Headphones For You!
          </h2>
          <p className="text-gray-500 text-sm font-medium mt-2">
            Curated picks across every budget and style.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
