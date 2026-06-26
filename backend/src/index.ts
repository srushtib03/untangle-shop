import express from "express";
import cors from "cors";

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
app.get("/products", (req, res) => {
  res.json(products);
});
// GET PRODUCT BY ID
app.get("/products/:id", (req, res) => {

    const id = Number(req.params.id);

    const product = products.find(product => product.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    res.json(product);

});
// POST NEW PRODUCT
app.post("/products", (req, res) => {

    const newProduct = req.body;

    products.push(newProduct);

    res.status(201).json({
        message: "Product added successfully",
        product: newProduct
    });

});
// DELETE PRODUCT
app.delete("/products/:id", (req, res) => {

    const id = Number(req.params.id);

    const productIndex = products.findIndex(
        product => product.id === id
    );

    if (productIndex === -1) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    const deletedProduct = products.splice(productIndex, 1);

    res.json({
        message: "Product deleted successfully",
        product: deletedProduct[0]
    });

});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});