"use client";

import { FormEvent, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const suggestions = [
  "I need an electronic product under ₹2000",
  "Suggest something useful for college students",
  "I need a keyboard under ₹2000",
  "What can I buy under ₹1000?",
];

export default function AIAssistantPage() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! 👋 I'm your Untangle Shop AI Shopping Assistant. Tell me what you're looking for, your budget, or how you plan to use the product.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery || loading) {
      return;
    }

    setMessages((current) => [
      ...current,
      {
        role: "user",
        content: trimmedQuery,
      },
    ]);

    setQuery("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5001/ai/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: trimmedQuery,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to get AI recommendation");
      }

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: data.recommendation,
        },
      ]);
    } catch (error) {
      console.error("AI assistant error:", error);

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't connect to the shopping assistant right now. Please make sure the backend is running and try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function useSuggestion(suggestion: string) {
    setQuery(suggestion);
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-blue-600 to-cyan-500 px-6 py-16 text-white">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl" />

        <div className="relative mx-auto max-w-5xl text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-3xl shadow-xl backdrop-blur">
            🤖
          </div>

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-blue-100">
            Powered by Gemini
          </p>

          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
            AI Shopping Assistant
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-blue-50 sm:text-lg">
            Tell us what you need, your budget, or how you plan to use a
            product. Our AI will search the current Untangle Shop catalog and
            suggest suitable products.
          </p>
        </div>
      </section>

      {/* Main */}
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        {/* Suggestions */}
        <div className="mb-6">
          <p className="mb-3 text-sm font-bold text-slate-700">
            Try asking:
          </p>

          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => useSuggestion(suggestion)}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-600"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {/* Chat */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-xl">
              ✨
            </div>

            <div>
              <h2 className="font-bold text-slate-900">
                Untangle AI Assistant
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Product catalog connected
              </div>
            </div>
          </div>

          <div className="min-h-[420px] space-y-5 bg-slate-50/70 p-5 sm:p-7">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`flex ${
                  message.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-5 py-4 text-sm leading-7 shadow-sm ${
                    message.role === "user"
                      ? "rounded-br-md bg-blue-600 text-white"
                      : "rounded-bl-md border border-slate-200 bg-white text-slate-700"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="mb-2 font-bold text-blue-600">
                      🤖 Untangle AI
                    </div>
                  )}

                  <div className="whitespace-pre-wrap">
                    {message.content}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-md border border-slate-200 bg-white px-5 py-4 shadow-sm">
                  <div className="mb-2 text-xs font-bold text-blue-600">
                    🤖 Untangle AI
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.3s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.15s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="border-t border-slate-100 bg-white p-4 sm:p-5"
          >
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Ask about products, budgets, or recommendations..."
                className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                disabled={loading}
              />

              <button
                type="submit"
                disabled={loading || !query.trim()}
                className="rounded-2xl bg-blue-600 px-7 py-4 font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Thinking..." : "Ask AI ✨"}
              </button>
            </div>
          </form>
        </div>

        {/* Info cards */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 text-2xl">🎯</div>
            <h3 className="font-bold text-slate-900">Personalized</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Recommendations are based on the customer&apos;s request and
              budget.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 text-2xl">🛍️</div>
            <h3 className="font-bold text-slate-900">Catalog Grounded</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              The assistant receives the current products from the shop
              database.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 text-2xl">⚡</div>
            <h3 className="font-bold text-slate-900">Fast Assistance</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Ask naturally instead of manually searching through every
              product.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}