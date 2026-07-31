import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-bold text-blue-700"
        >
          <ShoppingCart size={30} />
          Untangle Shop
        </Link>

        <div className="flex gap-8 text-lg">
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
        </div>
      </div>
    </nav>
  );
}