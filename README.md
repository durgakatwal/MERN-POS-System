# MERN POS System

A full-featured Point of Sale (POS) system built with the MERN stack (MongoDB, Express.js, React, Node.js).  
Designed for small to medium businesses to manage customers, products, suppliers, sales, and support tickets efficiently.  

This system supports soft delete, role-based management, and secure data validation for all entities.

---

## Features

- Customer Management: Add, update, delete, and list customers with detailed profiles.
- Product Management: Add products with categories, variations, pricing, and warehouse info.
- Supplier Management: Manage suppliers, balances, and discounts.
- Support Tickets (CRM): Create, update, and track support tickets for customers.
- Soft Delete & Audit: All deletes are soft, keeping data history intact.
- Validation & Security: All inputs are validated with strict rules for numeric, boolean, and ObjectId fields.
- API Ready: Fully RESTful API for all operations.
- Future Ready: Can integrate React frontend for a complete full-stack POS application.

---

## Tech Stack

- Backend: Node.js, Express.js, MongoDB, Mongoose
- Frontend: React.js (planned for next phase)
- Validation: express-validator
- Error Handling: Custom Error Classes (ValidationError, NotFoundError)
- Version Control: Git & GitHub

---

## Installation

1. Clone the repository:

```bash
git clone [https://github.com/durgakatwal/MERN-POS-System.git](https://github.com/durgakatwal/MERN-POS-System.git)
cd MERN-POS-System
Install dependencies:

bash
Copy code
npm install
Create a .env file in the root directory:

env
Copy code
PORT=5000
DB_URI=mongodb://localhost:27017/pos_system_db
JWT_SECRET=your_jwt_secret
Start the development server:

bash
Copy code
npm run dev
The API server will run at http://localhost:5000.
