import Link from "next/link";

type Product = {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
};

async function getProducts(): Promise<Product[]> {
  const res = await fetch("http://localhost:5001/products", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

const productImages: Record<string, string> = {
  Laptop: "/images/laptop.jpg",
  "Wireless Mouse": "/images/mouse.jpg",
  Notebook: "/images/notebook.jpg",
  "Premium Pen": "/images/pen.jpeg",
  "Water Bottle": "/images/bottle.jpg",
  Keyboard: "/images/keyboard.jpg",
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute -left-24 -top-32 h-80 w-80 rounded-full bg-blue-100/60 blur-3xl" />
        <div className="absolute -right-24 top-10 h-80 w-80 rounded-full bg-indigo-100/60 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              Untangle Shop Collection
            </span>

            <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Explore our{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                products.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Browse our collection of products and find everything you need
              from one simple shopping platform.
            </p>
          </div>

          {/* Product count */}
          <div className="mt-8 flex flex-wrap gap-3">
            <div className="rounded-xl border border-slate-200 bg-white px-5 py-3 shadow-sm">
              <span className="text-2xl font-black text-slate-900">
                {products.length}
              </span>
              <span className="ml-2 text-sm font-medium text-slate-500">
                Products
              </span>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white px-5 py-3 shadow-sm">
              <span className="text-2xl font-black text-slate-900">
                {products.reduce((total, product) => total + product.stock, 0)}
              </span>
              <span className="ml-2 text-sm font-medium text-slate-500">
                Items in stock
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        {products.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white px-6 py-20 text-center shadow-sm">
            <div className="text-5xl">📦</div>

            <h2 className="mt-5 text-2xl font-bold text-slate-900">
              No products available
            </h2>

            <p className="mt-2 text-slate-500">
              There are currently no products to display.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
                  Our collection
                </p>

                <h2 className="mt-2 text-3xl font-black text-slate-950">
                  Featured Products
                </h2>
              </div>

              <div className="hidden rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-500 shadow-sm ring-1 ring-slate-200 sm:block">
                {products.length} items available
              </div>
            </div>

            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => {
                const image =
                  productImages[product.name] ?? "/images/default.jpg";

                const isOutOfStock = product.stock <= 0;
                const isLowStock = product.stock > 0 && product.stock <= 5;

                return (
                  <article
                    key={product.id}
                    className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl"
                  >
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden bg-slate-100">
                      <img
                        src={image}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Image overlay */}
                      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent" />

                      {/* Category */}
                      <div className="absolute left-4 top-4">
                        <span className="rounded-full border border-white/50 bg-white/90 px-3 py-1.5 text-xs font-bold text-blue-700 shadow-sm backdrop-blur">
                          {product.category}
                        </span>
                      </div>

                      {/* Stock */}
                      <div className="absolute right-4 top-4">
                        {isOutOfStock ? (
                          <span className="rounded-full bg-red-500 px-3 py-1.5 text-xs font-bold text-white shadow-sm">
                            Out of stock
                          </span>
                        ) : isLowStock ? (
                          <span className="rounded-full bg-amber-500 px-3 py-1.5 text-xs font-bold text-white shadow-sm">
                            Only {product.stock} left
                          </span>
                        ) : (
                          <span className="rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-bold text-white shadow-sm">
                            In stock
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-2xl font-black text-slate-900 transition-colors duration-300 group-hover:text-blue-600">
                        {product.name}
                      </h3>

                      <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-500">
                        {product.description}
                      </p>

                      {/* Price + stock */}
                      <div className="mt-5 flex items-end justify-between border-t border-slate-100 pt-5">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Price
                          </p>

                          <p className="mt-1 text-3xl font-black text-slate-950">
                            ₹{product.price.toLocaleString("en-IN")}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Available
                          </p>

                          <p
                            className={`mt-1 font-bold ${
                              isOutOfStock
                                ? "text-red-500"
                                : isLowStock
                                  ? "text-amber-600"
                                  : "text-emerald-600"
                            }`}
                          >
                            {product.stock} units
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-6 flex gap-3">
                        <Link
                          href={`/products/${product.id}`}
                          className="flex flex-1 items-center justify-center rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-bold text-white shadow-md shadow-blue-600/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg"
                        >
                          View Details
                        </Link>

                        <button
                          disabled={isOutOfStock}
                          className={`flex flex-1 items-center justify-center rounded-xl px-4 py-3.5 text-sm font-bold transition-all duration-300 ${
                            isOutOfStock
                              ? "cursor-not-allowed bg-slate-100 text-slate-400"
                              : "bg-slate-900 text-white hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg"
                          }`}
                        >
                          {isOutOfStock ? "Unavailable" : "Add to Cart"}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        )}
      </section>

      {/* Bottom CTA */}
      <section className="px-6 pb-16 lg:px-10">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-8 py-12 text-center text-white shadow-xl sm:px-12">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-100">
            Untangle Shop
          </p>

          <h2 className="mt-3 text-3xl font-black sm:text-4xl">
            Everything you need, in one place.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-blue-100">
            Explore products, manage your orders and enjoy a simple shopping
            experience.
          </p>

          <Link
            href="/orders"
            className="mt-7 inline-flex rounded-xl bg-white px-7 py-3.5 font-bold text-blue-700 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            View My Orders →
          </Link>
        </div>
      </section>
    </main>
  );
}