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
  const res = await fetch("http://localhost:3000/products", {
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
  "Premium Pen": "/images/pen.jpg",
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold text-gray-900 mb-10">
          Our Products
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300"
            >

              <img
                src={
                  productImages[product.name] ??
                  "/images/default.jpg"
                }
                alt={product.name}
                className="w-full h-60 object-cover"
              />

              <div className="p-6">

                <h2 className="text-3xl font-bold text-gray-900">
                  {product.name}
                </h2>

                <p className="mt-2 text-gray-600">
                  {product.description}
                </p>

                <div className="mt-4 flex justify-between items-center">

                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    {product.category}
                  </span>

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                    Stock: {product.stock}
                  </span>

                </div>

                <div className="mt-6 flex justify-between items-center">

                  <p className="text-4xl font-bold text-green-600">
                    ₹{product.price}
                  </p>

                </div>

                <div className="mt-8 flex gap-4">

                  <Link
                    href={`/products/${product.id}`}
                    className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition"
                  >
                    View Details
                  </Link>

                  <button
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition"
                  >
                    Add to Cart
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </main>
  );
}