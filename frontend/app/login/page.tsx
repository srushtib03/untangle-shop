"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      // Save JWT Token
      localStorage.setItem("token", data.token);

        // Show success
        alert("Login Successful ✅");

        // Redirect to Orders page
        router.push("/orders");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label className="font-semibold text-black">Email</label>

            <input
                type="email"
                placeholder="Enter email"
                className="w-full mt-2 border border-gray-300 rounded-lg p-3 bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="font-semibold text-black">Password</label>

            <input
            type="password"
            placeholder="Enter password"
            className="w-full mt-2 border border-gray-300 rounded-lg p-3 bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
          >
            Login
          </button>

        </form>

      </div>
    </main>
  );
}