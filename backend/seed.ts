import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
  {
    name: "Laptop",
    description: "Dell Inspiron Laptop",
    price: 55000,
    stock: 10,
    category: "Electronics",
  },
  {
    name: "Wireless Mouse",
    description: "Logitech Mouse",
    price: 800,
    stock: 50,
    category: "Electronics",
  },
  {
    name: "Notebook",
    description: "200 Pages Notebook",
    price: 100,
    stock: 200,
    category: "Stationery",
  },
  {
    name: "Premium Pen",
    description: "Blue Ink Pen",
    price: 20,
    stock: 500,
    category: "Stationery",
  },
  {
    name: "Water Bottle",
    description: "1L Bottle",
    price: 300,
    stock: 75,
    category: "Accessories",
  },
  {
    name: "Keyboard",
    description: "Mechanical Keyboard",
    price: 1500,
    stock: 20,
    category: "Electronics",
  },
];

async function main() {
  console.log("Seeding database...");

  for (const product of products) {
    const existingProduct = await prisma.product.findFirst({
      where: {
        name: product.name,
        description: product.description,
      },
    });

    if (existingProduct) {
      console.log(`Product already exists: ${product.name}`);
      continue;
    }

    await prisma.product.create({
      data: product,
    });

    console.log(`Created product: ${product.name}`);
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });