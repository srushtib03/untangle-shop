import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Clear existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.user.deleteMany();
  await prisma.product.deleteMany();

  // Products
  const laptop = await prisma.product.create({
    data: {
      name: "Laptop",
      description: "Dell Inspiron Laptop",
      price: 55000,
      stock: 10,
      category: "Electronics",
    },
  });

  const mouse = await prisma.product.create({
    data: {
      name: "Wireless Mouse",
      description: "Logitech Mouse",
      price: 800,
      stock: 50,
      category: "Electronics",
    },
  });

  const notebook = await prisma.product.create({
    data: {
      name: "Notebook",
      description: "200 Pages Notebook",
      price: 100,
      stock: 200,
      category: "Stationery",
    },
  });

  const pen = await prisma.product.create({
    data: {
      name: "Premium Pen",
      description: "Blue Ink Pen",
      price: 20,
      stock: 500,
      category: "Stationery",
    },
  });

  const bottle = await prisma.product.create({
    data: {
      name: "Water Bottle",
      description: "1L Bottle",
      price: 300,
      stock: 75,
      category: "Accessories",
    },
  });

  // Users
  const user1 = await prisma.user.create({
    data: {
      name: "Rahul",
      email: "rahul@example.com",
      passwordHash: "hashedpassword1",
      role: "Customer",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Priya",
      email: "priya@example.com",
      passwordHash: "hashedpassword2",
      role: "Customer",
    },
  });

  const user3 = await prisma.user.create({
    data: {
      name: "Amit",
      email: "amit@example.com",
      passwordHash: "hashedpassword3",
      role: "Customer",
    },
  });

  // Customers
  const customer1 = await prisma.customer.create({
    data: {
      userId: user1.id,
      address: "Mumbai",
      phone: "9876543210",
    },
  });

  const customer2 = await prisma.customer.create({
    data: {
      userId: user2.id,
      address: "Pune",
      phone: "9876543211",
    },
  });

  const customer3 = await prisma.customer.create({
    data: {
      userId: user3.id,
      address: "Nashik",
      phone: "9876543212",
    },
  });

  // Orders
  const order1 = await prisma.order.create({
    data: {
      customerId: customer1.id,
      status: "Pending",
      total: 55800,
    },
  });

  const order2 = await prisma.order.create({
    data: {
      customerId: customer2.id,
      status: "Delivered",
      total: 400,
    },
  });

  // Order Items
  await prisma.orderItem.create({
    data: {
      orderId: order1.id,
      productId: laptop.id,
      quantity: 1,
      price: 55000,
    },
  });

  await prisma.orderItem.create({
    data: {
      orderId: order1.id,
      productId: mouse.id,
      quantity: 1,
      price: 800,
    },
  });

  await prisma.orderItem.create({
    data: {
      orderId: order2.id,
      productId: notebook.id,
      quantity: 2,
      price: 100,
    },
  });

  await prisma.orderItem.create({
    data: {
      orderId: order2.id,
      productId: pen.id,
      quantity: 10,
      price: 20,
    },
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });