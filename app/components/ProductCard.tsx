"use client";

import Image from "next/image";
import { useCartStore } from "../store/cartStore";

interface ProductCardProps {
  id: string | number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
}

export default function ProductCard({ id, name, price, oldPrice, image }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  const discountPercentage =
    oldPrice && oldPrice > price
      ? Math.round(((oldPrice - price) / oldPrice) * 100)
      : null;

  return (
    <div className="bg-white rounded-xl shadow-sm p-2 w-52 shrink-0 flex flex-col justify-between h-[320px]">
      {/* Image */}
      <div className="relative w-full h-44 mb-2">
        <Image
          src={image}
          alt={name}
          fill
          className="object-contain rounded-md"
          sizes="200px"
        />
      </div>

      {/* Title */}
      <h3 className="text-sm text-gray-700 line-clamp-2 mb-1">{name}</h3>

      {/* Price + Discount */}
      <div className="flex items-center gap-2 mb-1">
        <span className="text-base font-semibold text-gray-800">${price}</span>

        {discountPercentage !== null && (
          <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">
            -{discountPercentage}%
          </span>
        )}
      </div>

      {/* Old Price (or placeholder for layout) */}
      <div className="mb-2 h-4">
        {discountPercentage !== null ? (
          <p className="text-xs text-gray-400 line-through">${oldPrice}</p>
        ) : (
          <span className="invisible text-xs">$0.00</span>
        )}
      </div>

      {/* Add to Cart Button */}
      <div className="flex justify-end">
        <button
          onClick={() => addToCart({ id, name, price, image })}
          className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full shadow text-lg"
          title="Add to cart"
        >
          🛒
        </button>
      </div>
    </div>
  );
}
