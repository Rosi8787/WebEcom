import Image from 'next/image';

const shopCategories = [
  {
    id: 'wireless',
    label: 'Wireless',
    image: '/categories/wireless.png',
    bg: '#1B6B4A',
    hasImage: true,
  },
  {
    id: 'earbuds',
    label: 'Earbuds',
    image: '/categories/earbuds.png',
    bg: '#E8A020',
    hasImage: true,
  },
  {
    id: 'wired',
    label: 'Wired',
    image: '/categories/wired.png',
    bg: '#B84040',
    hasImage: true,
  },
  {
    id: 'gaming',
    label: 'Gaming',
    image: '/categories/gaming.png',
    bg: '#1A7A6E',
    hasImage: true,
  },
  {
    id: 'noise-cancel',
    label: 'Noise Cancel',
    image: '/categories/noise-cancel.png',
    bg: '#C97090',
    hasImage: true,
  },
  {
    id: 'studio',
    label: 'Studio',
    image: '/categories/studio.png',
    bg: '#D4943A',
    hasImage: true,
  },
];

export default function ShopCategories() {
  return (
    <section className="py-14 md:py-18 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">

        {/* Section Title */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight mb-8">
          Shop Our Top Categories
        </h2>

        {/* Category Cards — horizontal scroll on mobile */}
        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {shopCategories.map((cat) => (
            <a
              key={cat.id}
              href={`/products?category=${cat.id}`}
              className="group relative rounded-2xl overflow-hidden cursor-pointer hover:scale-[1.03] hover:shadow-xl transition-all duration-300 aspect-[3/4]"
              style={{ backgroundColor: cat.bg }}
            >
              {/* Label — centered, white, bold */}
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <span
                  className="font-black text-xl sm:text-2xl text-center leading-tight"
                  style={{ color: '#ffffff' }}
                >
                  {cat.label}
                </span>
              </div>

              {/* Category photo — only if real image exists */}
              {cat.hasImage && cat.image && (
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              )}
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
