import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import HeroBanner from '@/components/landing/HeroBanner';
import ShopCategories from '@/components/landing/ShopCategories';
import FilterBar from '@/components/landing/FilterBar';
import BentoGrid from '@/components/landing/BentoGrid';
import WeeklyPopular from '@/components/landing/WeeklyPopular';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Header />
      <main>
        <HeroBanner />
        <ShopCategories />
        <FilterBar />
        <BentoGrid />
        <WeeklyPopular />
      </main>
    </div>
  );
}
