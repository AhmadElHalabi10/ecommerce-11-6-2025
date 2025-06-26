import Navbar from "./components/Navbar";
import HeroBanner from "./components/HeroBanner";
import ProductSection from "./components/ProductSection";

interface Product {
  id: number;
  name: string;
  price: number;
  discount?: number;
  image: string;
}

async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/products`, { cache: 'no-store' });
  const data = await res.json();
  return data;
}

export default async function HomePage() {
  const products = await getProducts();
  // Map discount to oldPrice for ProductSection
  const mappedProducts = products.map((p) => ({
    ...p,
    oldPrice: p.discount ? Math.round(p.price * (100 + p.discount) / 100) : undefined,
  }));

  return (
    <>
      <Navbar />
      <HeroBanner
        title="Upgrade Your Lifestyle with HappyHome"
        description="Explore our exclusive collection and shop with confidence."
        image="hero-image.png" // must be placed in /public/
        ctaText="Shop Now"
        ctaLink="/products"
      />
      <ProductSection title="Shop by Home's products!" category="homekitchen" />
      <ProductSection title="Shop by Shoes!" category="shoes" />
      {/* <ProductSection title="Shop Electronics!" category="Electronics" />
      <ProductSection title="Shop Accessories!" category="Accessories" /> */}

    </>
  );
}
