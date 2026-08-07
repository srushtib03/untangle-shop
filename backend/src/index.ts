import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import { generateToken } from "./utils/jwt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import {
  authenticateToken,
  AuthRequest,
} from "./middleware/auth";

console.log("JWT Secret:", process.env.JWT_SECRET);
const app = express();
const prisma = new PrismaClient();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Untangle Shop API is Running 🚀");
});


// ====================== PRODUCTS ======================

// Get all products
app.get("/products", async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

// Get product by ID
app.get("/products/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch product" });
  }
});

// Create product
app.post("/products", async (req, res) => {
  try {
    const { name, description, category, price, stock } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        description,
        category,
        price: Number(price),
        stock: Number(stock),
      },
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create product" });
  }
});

// Update product
app.put("/products/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const { name, description, category, price, stock } = req.body;

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        category,
        price: Number(price),
        stock: Number(stock),
      },
    });

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update product" });
  }
});

// Delete product
app.delete("/products/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.product.delete({
      where: { id },
    });

    res.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete product" });
  }
});


// ====================== ORDERS ======================

// ====================== ORDERS ======================

// Get all orders (Protected)
app.get(
  "/orders",
  authenticateToken,
  async (req: AuthRequest, res) => {
    try {
      const orders = await prisma.order.findMany({
        include: {
          customer: {
            include: {
              user: true,
            },
          },
          orderItems: {
            include: {
              product: true,
            },
          },
        },
      });

      res.json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Failed to fetch orders",
      });
    }
  }
);

// Get single order (Protected)
app.get(
  "/orders/:id",
  authenticateToken,
  async (req: AuthRequest, res) => {
    try {
      const id = Number(req.params.id);

      const order = await prisma.order.findUnique({
        where: { id },
        include: {
          customer: {
            include: {
              user: true,
            },
          },
          orderItems: {
            include: {
              product: true,
            },
          },
        },
      });

      if (!order) {
        return res.status(404).json({
          message: "Order not found",
        });
      }

      res.json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Failed to fetch order",
      });
    }
  }
);

// Create order (Protected)
app.post(
  "/orders",
  authenticateToken,
  async (req: AuthRequest, res) => {
    try {
      const { customerId, status, total } = req.body;

      const order = await prisma.order.create({
        data: {
          customerId: Number(customerId),
          status,
          total: Number(total),
        },
      });

      res.status(201).json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Failed to create order",
      });
    }
  }
);

// Delete order (Protected)
app.delete(
  "/orders/:id",
  authenticateToken,
  async (req: AuthRequest, res) => {
    try {
      const id = Number(req.params.id);

      await prisma.order.delete({
        where: { id },
      });

      res.json({
        message: "Order deleted successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Failed to delete order",
      });
    }
  }
);
// ====================== AUTH ======================

// Register User
app.post("/auth/register", async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create User
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        role: "Customer",
      },
    });

    // Create Customer
    const customer = await prisma.customer.create({
      data: {
        userId: user.id,
        address,
        phone,
      },
    });

    res.status(201).json({
      message: "User registered successfully",
      user,
      customer,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Registration failed",
    });
  }
});
// ====================== LOGIN ======================

app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Compare password
    const passwordMatch = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Generate JWT
    const token = generateToken(user.id);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Login failed",
    });
  }
});
// ====================== CURRENT USER ======================

app.get(
  "/auth/me",
  authenticateToken,
  async (req: AuthRequest, res) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: req.userId,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        },
      });

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      res.json(user);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Failed to fetch user",
      });
    }
  }
);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});