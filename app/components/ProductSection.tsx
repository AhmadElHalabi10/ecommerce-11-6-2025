"use client";

import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string | number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
}

interface ProductSectionProps {
  title: string;
  products: Product[];
}

export default function ProductSection({ title, products }: ProductSectionProps) {
  return (
    <section className="px-4 py-10 max-w-screen-xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.slice(0, 8).map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition"
          >
            <Link href={`/product/${product.id}`}>
              <div className="relative w-full h-48 sm:h-52">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="p-4 text-center text-sm">
                <h3 className="font-medium mb-1">{product.name}</h3>
                <p className="text-gray-800 font-semibold">${product.price}</p>
                {product.oldPrice && (
                  <p className="text-gray-400 line-through text-xs">${product.oldPrice}</p>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
