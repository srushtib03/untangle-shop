# Untangle Shop - Solution Design

## Project Overview

Untangle Shop is a full-stack e-commerce application developed to demonstrate modern web application architecture using HTML, CSS, JavaScript, Node.js, Express.js, Prisma ORM, and PostgreSQL.

The application allows users to browse products, retrieve product details from a PostgreSQL database, and interact with backend REST APIs. The project replaces hardcoded frontend data with dynamic database-driven content, providing a scalable and maintainable solution.
## Components

### Frontend

The frontend is built using HTML, CSS, and JavaScript. It provides the user interface, displays products, and communicates with the backend using Fetch API.

### Backend

The backend is built using Node.js and Express.js. It exposes REST APIs for retrieving product information and handles requests from the frontend.

### Database

PostgreSQL is used as the relational database. Prisma ORM manages database access, schema migrations, and CRUD operations.
## System Flow

1. User opens the Products page.
2. JavaScript sends a GET request to the backend.
3. Express receives the request.
4. Prisma queries PostgreSQL.
5. Database returns product data.
6. Backend sends JSON response.
7. Frontend renders product cards.
## Known Limitations

- User authentication is not implemented.
- Shopping cart functionality is not available.
- Orders page is under development.
- Payment gateway integration is not implemented.
- Application is currently running only in a local environment.