"use client";

import { useEffect, useState } from "react";
import HeroBanner from "@/app/components/HeroBanner";
import ProductCard from "@/app/components/ProductCard";
import Navbar from "@/app/components/Navbar";

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

export default function ShoesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products?category=shoes");
        const data = await res.json();

        const mapped = data.map((p: Product) => ({
          ...p,
          oldPrice: p.discount
            ? Math.round((p.price * (100 + p.discount)) / 100)
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
    <>
      <main className="px-2 sm:px-4 py-8 max-w-screen-xl mx-auto overflow-x-hidden">
        <HeroBanner
          title="Step Into Style"
          description="Browse our latest collection of stylish and comfortable shoes."
          image="shoesBanner.jpg"
        />

        <h2 className="text-2xl font-semibold my-8 text-gray-800">
          All Shoes
        </h2>

        <div className="grid grid-cols-[repeat(auto-fit,_minmax(140px,_1fr))] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {paginated.map((product) => (
            <div key={product.id} className="h-full">
              <ProductCard {...product} />
            </div>
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
    </>
  );
}
