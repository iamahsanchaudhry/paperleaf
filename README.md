# 🪴 Paperleaf — Stationery & Gift Store

A modern full-stack **MERN** web application built with **Vite + React + TypeScript**, styled with **TailwindCSS** and **ShadCN UI**, featuring a clean design, responsive layout, and smooth user experience.

---

## 🚀 Tech Stack

### **Frontend**
- ⚡ Vite  
- ⚛️ React  
- 🧠 TypeScript  
- 🎨 TailwindCSS  
- 🧩 ShadCN UI  
- 🔗 React Router DOM  
- 🌙 Dark / Light Mode  

### **Backend**
- 🐍 Node.js  
- 🧱 Express.js  
- 🍃 MongoDB  
- 🪶 Mongoose  
- ☁️ Cloudinary (Image Uploads)  

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/paperleaf.git
cd paperleaf
```

### 2️⃣ Install Dependencies
#### Frontend:
```bash
cd frontend
npm install
```

#### Backend:
```bash
cd ../backend
npm install
```

### 3️⃣ Environment Variables
Create a `.env` file inside the **backend** folder:
```env
# Server
PORT=5000

# Database
MONGO_URI=your_mongodb_connection_string

# JWT Secret
JWT_SECRET=your_secret_key

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_SECRET_KEY=your_api_secret
```

Make sure `.env` is added to `.gitignore` to keep it private.

---

### 4️⃣ Run Development Servers
#### Frontend
```bash
npm run dev
```
➡️ App runs at: **http://localhost:5173**

#### Backend
```bash
npm run dev
```
➡️ API runs at: **http://localhost:5000**

---

## 🧩 Features

### 🛍️ **User Features**
- 🔍 Search products with debounce  
- 🗂️ Browse by categories & subcategories  
- 🌓 Dark / light mode toggle  
- 📱 Responsive design with mobile navigation  
- 💨 Fast, modern UI using ShadCN + TailwindCSS  

---

### 🧑‍💼 **Admin Features**
- ➕ **Add Product** — with image upload (Cloudinary)  
- ✏️ **Update Product** — edit details or replace image  
- ❌ **Delete Product** — remove from MongoDB and Cloudinary  
- 📦 **View All Products** — filter by category or subcategory  
- ☁️ **Cloudinary Integration** for secure, scalable media storage  

---

### ⚡ **Backend API Highlights**
- RESTful API with Express.js  
- Mongoose models for Product and Admin  
- CRUD operations (Create, Read, Update, Delete)  
- Middleware for error handling and validation  
- Cloudinary integration for image management  

---

## 🖼️ Cloudinary Setup Example
```js
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

export default cloudinary;
```

---

## 🗂️ Folder Structure
```
paperleaf/
├── frontend/
│   ├── src/
│   └── package.json
│
├── backend/
│   ├── config/
│   │   ├── db.js
|   |   ├── env.js
│   │   └── cloudinary.js
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── controllers/
│   ├── .env
│   └── server.js
│
└── README.md
```

---

## 👨‍💻 Author
**Ahsan Javed**  
📧 ahsanjavedd17@gmail.com  
🔗 [GitHub](https://github.com/iamahsanchaudhry)

---

### 🌟 Support
If you like this project, consider giving it a ⭐ on GitHub and sharing it with others!
