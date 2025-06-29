"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useCartStore } from "../store/cartStore";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const totalCount = useCartStore((state) => state.totalCount);

  return (
    <header className="text-white text-sm">
      {/* Top bar */}
      <div className="bg-neutral-100 text-center text-gray-600 py-1 text-xs">
        Get up to 50% off new season styles, limited time only
      </div>

      {/* Main nav bar */}
      <div className="bg-red-600 px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-white text-base sm:text-lg">
          <span className="text-2xl">🛒</span>
          Happy Home
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex gap-6 font-semibold text-white text-sm">
          <Link href="/pages/home-kitchen" className="hover:text-yellow-300">Home&Kitchen</Link>
          <Link href="/pages/shoes" className="hover:text-yellow-300">Shoes</Link>
          <Link href="/pages/electronics" className="hover:text-yellow-300">Electronics</Link>
          <Link href="/pages/accessories" className="hover:text-yellow-300">Accessories</Link>
          <Link href="/pages/contact" className="hover:text-yellow-300">Contact Us</Link>
        </nav>

        {/* Right icons */}
        <div className="hidden md:flex items-center gap-4">
          {!session?.user ? (
            <Link href="/auth/login" className="hover:underline">Log In</Link>
          ) : (
            <button onClick={() => signOut()} className="hover:underline">
              Sign Out
            </button>
          )}
          <Link href="/cart" className="relative text-xl">
            🛒
            {totalCount > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-white text-red-600 rounded-full px-1.5">
                {totalCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile icons */}
        <div className="flex md:hidden items-center gap-4">
          <Link href="/cart" className="relative text-xl">
            🛒
            {totalCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 text-xs bg-white text-red-600 rounded-full px-1">
                {totalCount}
              </span>
            )}
          </Link>
          <button onClick={() => setOpen(!open)}>
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {open && (
        <div className="md:hidden bg-red-600 text-white font-medium text-sm">
          <Link href="/pages/home-kitchen" className="block border-b px-4 py-2">Home&Kitchen</Link>
          <Link href="/pages/shoes" className="block border-b px-4 py-2">Shoes</Link>
          <Link href="/pages/electronics" className="block border-b px-4 py-2">Electronics</Link>
          <Link href="/pages/accessories" className="block border-b px-4 py-2">Accessories</Link>
          <Link href="/pages/contact" className="block border-b px-4 py-2">Contact Us</Link>

          {!session?.user ? (
            <Link href="/auth/login" className="block border-b px-4 py-2">Log In</Link>
          ) : (
            <button
              onClick={() => signOut()}
              className="block border-b px-4 py-2 text-left w-full"
            >
              Sign Out
            </button>
          )}

          <Link href="/cart" className="block border-b px-4 py-2">Cart</Link>
        </div>
      )}
    </header>
  );
}
