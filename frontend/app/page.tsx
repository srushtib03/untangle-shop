import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 flex flex-col-reverse lg:flex-row items-center justify-between gap-16">
        {/* Left Content */}
        <div className="lg:w-1/2">
          <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
            Smart Inventory Management
          </span>

          <h1 className="mt-6 text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
            Welcome to <br />
            <span className="text-blue-600">Untangle Shop</span>
          </h1>

          <p className="mt-6 text-lg text-gray-800 leading-8">
            Manage your products, orders, and inventory with a clean,
            fast, and modern dashboard built using Next.js, Express,
            Prisma, and PostgreSQL.
          </p>

          <div className="mt-10 flex flex-wrap gap-5">
            <Link
              href="/products"
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition duration-300 shadow-lg"
            >
              Browse Products
            </Link>

            <Link
              href="/orders"
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition duration-300"
            >
              View Orders
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="lg:w-1/2 flex justify-center">
          <Image
            src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=900"
            alt="Shopping"
            width={600}
            height={450}
            className="rounded-3xl shadow-2xl object-cover"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-6 lg:px-12 pb-24">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-14">
          Why Choose Untangle Shop?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="text-5xl mb-5">📦</div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Inventory Management
            </h3>

            <p className="text-gray-700 leading-7">
              Easily organize, update and monitor all your products
              from one centralized dashboard.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="text-5xl mb-5">🛒</div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Order Tracking
            </h3>

            <p className="text-gray-700 leading-7">
              Track customer orders, delivery status and purchase
              history with ease.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="text-5xl mb-5">⚡</div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Fast Performance
            </h3>

            <p className="text-gray-700 leading-7">
              Powered by Next.js, Express, Prisma and PostgreSQL for a
              lightning-fast experience.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}