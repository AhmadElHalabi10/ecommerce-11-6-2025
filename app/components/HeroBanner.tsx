"use client";

import Image from "next/image";

interface HeroBannerProps {
  title: string;
  description: string;
  image: string;
  ctaText?: string;
  ctaLink?: string;
}

export default function HeroBanner({
  title,
  description,
  image,
  ctaText,
  ctaLink,
}: HeroBannerProps) {
  return (
    <section className="w-full bg-[#f9f9f9] shadow-sm overflow-hidden">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 py-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* Text */}
        <div className="w-full md:w-1/2 text-center md:text-left px-4 md:px-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 mb-4 leading-snug">
            {title}
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mb-6">{description}</p>
          {ctaText && ctaLink && (
            <a
              href={ctaLink}
              className="inline-block px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition"
            >
              {ctaText}
            </a>
          )}
        </div>

        {/* Image */}
        <div className="w-full md:w-1/2 aspect-[16/9] relative">
          <Image
            src={`/${image}`}
            alt="Hero Banner"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
