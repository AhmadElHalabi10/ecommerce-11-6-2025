import Navbar from "./components/Navbar";
import HeroBanner from "./components/HeroBanner";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HeroBanner
        title="Upgrade Your Lifestyle with BeirutShoppers"
        description="Explore our exclusive collection and shop with confidence."
        image="hero-image.png" // must be placed in /public/
        ctaText="Shop Now"
        ctaLink="/products"
      />
    </>
  );
}
