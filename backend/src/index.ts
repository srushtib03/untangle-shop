import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Hardcoded Products Array
const products = [
  {
    id: 1,
    name: "Laptop",
    price: 55000,
    category: "Electronics",
    stock: 10,
  },
  {
    id: 2,
    name: "Wireless Mouse",
    price: 800,
    category: "Electronics",
    stock: 50,
  },
  {
    id: 3,
    name: "Notebook",
    price: 100,
    category: "Stationery",
    stock: 200,
  },
  {
    id: 4,
    name: "Premium Pen",
    price: 20,
    category: "Stationery",
    stock: 500,
  },
  {
    id: 5,
    name: "Water Bottle",
    price: 300,
    category: "Accessories",
    stock: 75,
  },
  {
    id: 6,
    name: "Shoes",
    price: 1200,
    category: "Footwear",
    stock: 40,
  },
];

// Home Route
app.get("/", (req, res) => {
  res.send("Welcome to Untangle Shop Products API 🚀");
});

// GET ALL PRODUCTS
app.get("/products", async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});
// GET PRODUCT BY ID
app.get("/products/:id", async (req, res) => {
  const id = Number(req.params.id);

  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.json(product);
});

// POST NEW PRODUCT
app.post("/products", async (req, res) => {
  console.log("Request Body:", req.body);

  const product = await prisma.product.create({
    data: req.body,
  });

  res.status(201).json(product);
});

app.put("/products/:id", async (req, res) => {

  const id = Number(req.params.id);

  const product = await prisma.product.update({
    where: {
      id,
    },
    data: req.body,
  });

  res.json(product);

});
// DELETE PRODUCT
app.delete("/products/:id", async (req, res) => {

  const id = Number(req.params.id);

  await prisma.product.delete({
    where: {
      id,
    },
  });

  res.json({
    message: "Deleted successfully",
  });

});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});