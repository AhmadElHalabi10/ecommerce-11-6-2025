"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface HeroBannerProps {
  images: string[]; // list of image filenames (in /public)
  links: string[];  // list of links to redirect on click
}

export default function HeroBanner({ images, links }: HeroBannerProps) {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => setIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () => setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  useEffect(() => {
    if (!isHovered) {
      timeoutRef.current = setTimeout(nextSlide, 5000);
    }
    return () => clearTimeout(timeoutRef.current!);
  }, [index, isHovered]);

  const handleClick = () => router.push(links[index]);

  return (
    <div
      className="relative w-full h-[500px] overflow-hidden group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Slide image */}
      <div
        className="absolute inset-0 transition-all duration-500 ease-in-out"
        style={{
          transform: `translateX(-${index * 100}%)`,
          width: `${images.length * 100}%`,
          display: "flex",
        }}
      >
        {images.map((img, i) => (
          <Image
            key={i}
            src={`/${img}`}
            alt={`Hero ${i}`}
            width={1920}
            height={500}
            className="w-full object-cover flex-shrink-0"
            style={{ width: "100%", height: "100%" }}
            priority={i === 0}
          />
        ))}
      </div>

      {/* Left arrow */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          prevSlide();
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full shadow-md z-10 transition"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Right arrow */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          nextSlide();
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-[#f5f5f5] text-black p-2 rounded-full shadow-md z-10 transition"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
