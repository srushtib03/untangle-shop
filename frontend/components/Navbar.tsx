"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully!");
    router.push("/login");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">
        
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-bold text-blue-700"
        >
          <ShoppingCart size={30} />
          Untangle Shop
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-8 text-lg">
          <Link
            href="/"
            className="text-gray-800 hover:text-blue-600 font-medium transition"
          >
            Home
          </Link>

          <Link
            href="/products"
            className="text-gray-800 hover:text-blue-600 font-medium transition"
          >
            Products
          </Link>

          <Link
            href="/orders"
            className="text-gray-800 hover:text-blue-600 font-medium transition"
          >
            Orders
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-medium transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}