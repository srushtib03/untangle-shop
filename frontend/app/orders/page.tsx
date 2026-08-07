"use client";

import { useEffect, useState } from "react";

type Order = {
  id: number;
  status: string;
  total: number;
  createdAt: string;
  customer: {
    user: {
      name: string;
      email: string;
    };
  };
  orderItems: {
    id: number;
    quantity: number;
    price: number;
    product: {
      name: string;
    };
  }[];
};

async function getOrders(): Promise<Order[]> {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:3000/orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch orders");
  }

  return res.json();
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">Loading Orders...</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-900 mb-10">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-10 text-center text-gray-600">
            No orders found.
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-3xl shadow-lg p-8"
              >
                <div className="flex justify-between items-start flex-wrap gap-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">
                      Order #{order.id}
                    </h2>

                    <p className="text-lg text-gray-700 mt-2">
                      {order.customer.user.name}
                    </p>

                    <p className="text-gray-500">
                      {order.customer.user.email}
                    </p>

                    <p className="text-gray-500 mt-2">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-4xl font-bold text-green-600">
                      ₹{order.total}
                    </p>

                    <span
                      className={`inline-block mt-3 px-5 py-2 rounded-full text-sm font-semibold ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                <hr className="my-8" />

                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Products
                </h3>

                <div className="space-y-3">
                  {order.orderItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center bg-gray-100 rounded-xl p-4"
                    >
                      <div>
                        <p className="font-semibold text-gray-900 text-lg">
                          {item.product.name}
                        </p>

                        <p className="text-gray-600">
                          Quantity: {item.quantity}
                        </p>
                      </div>

                      <p className="text-lg font-semibold text-green-700">
                        ₹{item.price}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}