"use client";

import { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";

interface Product {
  id: string | number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
}

interface ProductSectionProps {
  title: string;
  category: string;
}

export default function ProductSection({ title, category }: ProductSectionProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/products?category=${encodeURIComponent(category)}`);
        const data = await res.json();
        const mapped = data.map((p: any) => ({
          ...p,
          oldPrice: p.discount ? Math.round(p.price * (100 + p.discount) / 100) : undefined,
        }));
        setProducts(mapped);
      } catch (err) {
        console.error("Failed to fetch products by category:", err);
      }
    };

    fetchProducts();
  }, [category]);

  if (products.length === 0) return null;

  return (
    <section className="relative px-4 py-10 max-w-screen-xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">{title}</h2>

      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md border px-3 py-2 rounded-full"
        >
          ◀
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-10"
        >
          {products.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md border px-3 py-2 rounded-full"
        >
          ▶
        </button>
      </div>
    </section>
  );
}
