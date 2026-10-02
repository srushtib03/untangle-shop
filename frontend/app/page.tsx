import Link from "next/link";

const features = [
  {
    icon: "📦",
    title: "Smart Inventory",
    description:
      "Manage products, descriptions and inventory from one centralized platform.",
  },
  {
    icon: "🛒",
    title: "Order Management",
    description:
      "Track customer orders, quantities, totals and order status with ease.",
  },
  {
    icon: "⚡",
    title: "Fast & Reliable",
    description:
      "Built with Next.js, Express, Prisma and PostgreSQL for a modern experience.",
  },
];

const stats = [
  { value: "24/7", label: "Availability" },
  { value: "100%", label: "Digital Management" },
  { value: "4+", label: "Core Technologies" },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-50 text-slate-900">
      {/* HERO */}
      <section className="relative">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl" />
          <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-indigo-200/40 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-100/40 blur-3xl" />
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:px-10 lg:py-28">
          {/* LEFT */}
          <div className="animate-[fadeIn_0.7s_ease-out]">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm backdrop-blur">
              <span className="h-2 w-2 animate-pulse rounded-full bg-blue-600" />
              Smart Shopping & Inventory Platform
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-[1.05] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              Everything you need to{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                manage your shop.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
              Untangle Shop brings products, customers and orders together in
              one clean and modern e-commerce management platform.
            </p>

            {/* CTA */}
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="group inline-flex items-center gap-3 rounded-xl bg-blue-600 px-7 py-4 font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-xl"
              >
                Explore Products
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <Link
                href="/orders"
                className="inline-flex items-center gap-3 rounded-xl border border-slate-300 bg-white px-7 py-4 font-bold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:text-blue-600 hover:shadow-md"
              >
                View Orders
              </Link>
            </div>

            {/* Trust line */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Secure authentication
              </span>

              <span className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Real-time order tracking
              </span>

              <span className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                PostgreSQL powered
              </span>
            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div className="relative flex items-center justify-center">
            {/* Main shopping illustration */}
            <div className="relative w-full max-w-xl">
              <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-violet-500/20 blur-2xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white p-5 shadow-2xl shadow-slate-900/10">
                {/* Fake browser/dashboard header */}
                <div className="mb-5 flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                  <div className="flex gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-400" />
                    <span className="h-3 w-3 rounded-full bg-yellow-400" />
                    <span className="h-3 w-3 rounded-full bg-green-400" />
                  </div>

                  <div className="rounded-lg bg-white px-5 py-1.5 text-xs font-medium text-slate-400 shadow-sm">
                    untangle-shop
                  </div>

                  <div className="h-6 w-6 rounded-full bg-blue-100" />
                </div>

                {/* Dashboard */}
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl bg-blue-600 p-5 text-white sm:col-span-2">
                    <p className="text-sm text-blue-100">Store Overview</p>
                    <h2 className="mt-2 text-3xl font-black">Untangle Shop</h2>

                    <div className="mt-8 h-24">
                      <div className="flex h-full items-end gap-2">
                        {[35, 52, 44, 68, 58, 78, 92].map((height, index) => (
                          <div
                            key={index}
                            className="flex-1 rounded-t-md bg-white/80 transition-all duration-500 hover:bg-white"
                            style={{ height: `${height}%` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-2xl shadow-sm">
                      🛒
                    </div>
                    <p className="mt-5 text-sm text-slate-500">Orders</p>
                    <p className="text-2xl font-black text-slate-900">Active</p>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:col-span-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-500">
                          Product Management
                        </p>
                        <p className="mt-1 text-xl font-bold text-slate-900">
                          Everything in one place
                        </p>
                      </div>

                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
                        📦
                      </div>
                    </div>

                    <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" />
                    </div>
                  </div>

                  <div className="rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 p-5 text-white">
                    <div className="text-2xl">⚡</div>
                    <p className="mt-5 text-sm text-indigo-100">Performance</p>
                    <p className="text-xl font-black">Fast</p>
                  </div>
                </div>
              </div>

              {/* Floating notification */}
              <div className="absolute -right-4 top-20 hidden animate-bounce rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-xl sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                    ✓
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">System</p>
                    <p className="text-sm font-bold text-slate-900">
                      Order processed
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating package */}
              <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-xl sm:block">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">📦</span>
                  <div>
                    <p className="text-xs text-slate-500">Inventory</p>
                    <p className="text-sm font-bold text-slate-900">
                      Organized
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-5xl grid-cols-1 divide-y divide-slate-200 px-6 py-8 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {stats.map((stat) => (
            <div key={stat.label} className="px-6 py-4 text-center">
              <p className="text-3xl font-black text-slate-900">
                {stat.value}
              </p>
              <p className="mt-1 text-sm font-medium text-slate-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
            Why Untangle Shop
          </span>

          <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            Simple tools. Powerful workflow.
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Everything is designed to keep your store management simple,
            organized and efficient.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl transition-transform duration-300 group-hover:scale-110">
                {feature.icon}
              </div>

              <h3 className="mt-7 text-2xl font-bold text-slate-900">
                {feature.title}
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                {feature.description}
              </p>

              <div className="mt-6 text-sm font-bold text-blue-600">
                Learn more →
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-8 py-16 text-center text-white shadow-2xl sm:px-16">
          <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-white/10 blur-2xl" />

          <div className="relative">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-100">
              Ready to explore?
            </p>

            <h2 className="mt-4 text-4xl font-black sm:text-5xl">
              Start managing your shop smarter.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-blue-100">
              Explore your products and keep track of your orders from one
              convenient platform.
            </p>

            <Link
              href="/products"
              className="mt-8 inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 font-bold text-blue-700 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              Browse Products
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-slate-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Untangle Shop. All rights reserved.
          </p>

          <p className="font-medium">
            Next.js · Express · Prisma · PostgreSQL
          </p>
        </div>
      </footer>
    </main>
  );
}