import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn("GEMINI_API_KEY is not configured.");
}

const ai = apiKey
  ? new GoogleGenAI({ apiKey })
  : null;

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
};

export async function getShoppingRecommendation(
  userQuery: string,
  products: Product[]
): Promise<string> {
  if (!ai) {
    throw new Error("Gemini API key is not configured.");
  }

  const catalog = products
    .map(
      (product) =>
        `ID: ${product.id}
Name: ${product.name}
Description: ${product.description}
Price: ₹${product.price}
Stock: ${product.stock}
Category: ${product.category}`
    )
    .join("\n\n");

  const prompt = `
You are Untangle Shop's AI Shopping Assistant.

Your job is to help customers choose products from the CURRENT PRODUCT CATALOG.

CUSTOMER REQUEST:
${userQuery}

CURRENT PRODUCT CATALOG:
${catalog}

IMPORTANT RULES:
1. Recommend ONLY products present in the catalog.
2. Never invent a product, price, stock quantity, category, or feature.
3. Use the exact product names and prices from the catalog.
4. Do not recommend products with stock = 0.
5. If the customer's budget is specified, respect it.
6. If no product matches the request, clearly say that no exact match was found.
7. You may suggest the closest available alternatives from the catalog.
8. Keep the response concise and useful.
9. Explain why each recommended product matches the customer's request.
10. Do not claim to have information that is not present in the catalog.

Respond in a friendly shopping-assistant style.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: prompt,
  });

  return response.text || "I couldn't generate a recommendation right now.";
}