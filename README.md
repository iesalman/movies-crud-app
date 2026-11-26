# Movies CRUD Web Application

[![Node.js](https://img.shields.io/badge/Node.js-Express_5-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://expressjs.com/)
[![EJS](https://img.shields.io/badge/Templates-EJS-B4CA65?style=for-the-badge)](https://ejs.co/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

A server-rendered **Movies Catalog & CRUD Web Application** built with **Node.js**, **Express**, **EJS**, and **MongoDB**, featuring genre filtering, movie poster uploads via `Multer`, and a modern responsive cinema UI.

---

## ✨ Features

- **Genre Filtering**: Filter latest movies by **Action**, **Drama**, **Comedy**, or view **All Recent** (`/movies`, `/movies/genre/:genre`).
- **Full CRUD Operations**:
  - **Create** (`/movies/createForm` → `POST /movies/store`) with poster URL or local file upload (`Multer`) and live image preview.
  - **Read** (`/movies` grid & `/movies/show/:id` detail view).
  - **Update** (`/movies/updateForm/:id` → `POST /movies/update`) with poster replacement support.
  - **Delete** (`/movies/destroy/:id`) with confirmation prompt.
- **Cinema UI**: Sleek dark-themed layout with `Plus Jakarta Sans` typography, responsive movie grid cards, year badges, and genre tags.

---

## 🚀 Getting Started

```bash
npm install
cp .env.example .env    # Set PORT and MONGODB_CONNECTION
node index.js           # Or npx nodemon index.js
```

---

**Author:** Eyad Seleman
