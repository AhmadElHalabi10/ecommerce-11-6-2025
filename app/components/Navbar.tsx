"use client";

import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <header className="border-b text-sm">
      <div className="bg-[#f5f5f5] text-center py-1 text-gray-600">
        Get up to 50% off new season styles, limited time only
      </div>

      <div className="flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <div className="text-xl font-bold text-red-500 flex items-center gap-2">
          <span className="text-3xl">🛒</span>
          <div>
            <div>CLASSYSHOP</div>
            <div className="text-xs text-gray-500 -mt-1">BIG MEGA STORE</div>
          </div>
        </div>

        {/* Search */}
        <div className="flex-1 mx-8">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full px-4 py-2 border rounded focus:outline-none bg-gray-100 text-sm"
          />
        </div>

        {/* Auth Links + Icons */}
        <div className="flex items-center gap-4 text-sm">
          <a href="#" className="text-gray-700 hover:underline">
            Help Center
          </a>
          <a href="#" className="text-gray-700 hover:underline">
            Order Tracking
          </a>
          <a href="/login" className="font-semibold">
            Login
          </a>
          <span>|</span>
          <a href="/register" className="font-semibold">
            Register
          </a>
          <button className="text-xl">🤍</button>
          <button className="text-xl">🛒</button>
        </div>
      </div>

      {/* Bottom Nav */}
      <nav className="flex items-center gap-6 px-6 py-2 bg-white text-gray-700 font-medium border-t">
        <button className="flex items-center gap-2 font-semibold">
          <Menu className="w-5 h-5" />
          SHOP BY CATEGORIES
        </button>
        <a href="#" className="hover:text-red-500">Home</a>
        <a href="#" className="hover:text-red-500">Fashion</a>
        <a href="#" className="hover:text-red-500">Electronics</a>
        <a href="#" className="hover:text-red-500">Bags</a>
        <a href="#" className="hover:text-red-500">Footwear</a>
        <a href="#" className="hover:text-red-500">Groceries</a>
        <a href="#" className="hover:text-red-500">Beauty</a>
        <a href="#" className="hover:text-red-500">Wellness</a>
        <a href="#" className="hover:text-red-500">Jewellery</a>
        <span className="ml-auto text-sm text-gray-500">🚀 Free International Delivery</span>
      </nav>
    </header>
  );
}
