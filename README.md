# untangle-shop
Internship Project for Untangle Tech
Untangle Shop is a full-stack e-commerce web application built using HTML, CSS, JavaScript, Node.js, Express.js, Prisma ORM, and PostgreSQL. It allows users to browse products stored in a PostgreSQL database through REST APIs.
## Tech Stack

- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
## Project Structure
backend/
frontend/
docs/
## Local Setup
## Installation

### Clone Repository

git clone <repo-url>

### Backend

cd backend

npm install

npm run dev

### Database

npx prisma migrate dev

npx prisma db seed

### Frontend

Open products.html using Live Server.

## APIs
GET /products

GET /products/:id

POST /products

GET /orders