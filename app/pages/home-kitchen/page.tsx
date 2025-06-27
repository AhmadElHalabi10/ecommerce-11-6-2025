"use client";

import { useEffect, useState } from "react";
import HeroBanner from "@/app/components/HeroBanner";
import ProductCard from "@/app/components/ProductCard";

interface Product {
  id: string | number;
  name: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  image: string;
  category: string;
}

const ITEMS_PER_PAGE = 20;

export default function HomeKitchenPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products?category=homekitchen");
        const data = await res.json();

        const mapped = data.map((p: Product) => ({
          ...p,
          oldPrice: p.discount
            ? Math.round(p.price * (100 + p.discount) / 100)
            : undefined,
        }));

        setProducts(mapped);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchProducts();
  }, []);

  const paginated = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  return (
    <main className="px-4 py-8 max-w-screen-xl mx-auto">
      <HeroBanner
        title="Discover Home & Kitchen Essentials"
        description="Explore top-rated items to enhance your home life."
        image="HomeBanner1.jpg"
      />

      <h2 className="text-2xl font-semibold my-8 text-gray-800">
        All Home & Kitchen Products
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {paginated.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 border rounded ${
                currentPage === i + 1
                  ? "bg-black text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </main>
  );
}
