import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['i.imgur.com'], // ✅ Allow external images from Imgur
  },
};

export default nextConfig;
