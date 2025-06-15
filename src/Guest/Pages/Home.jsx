import HeroSection from '../Components/HeroSection';
import TrendingProducts from '../Components/TrendingProducts';
import BestSelling from '../Components/BestSelling';
import Testimonial from '../Components/Testimonial';
import Banner from '../Components/Banner';
import BrandPartners from '../Components/BrandPartners';

export default function Home() {
  return (
    <>
      <HeroSection />
      <BrandPartners/>
      <TrendingProducts />
      <BestSelling />
      <Banner/>
      <Testimonial />
    </>
  );
}