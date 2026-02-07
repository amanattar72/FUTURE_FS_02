# CRM Web Application (Full-Stack)

A full-stack **CRM (Customer Relationship Management)** web application built using the **MERN stack**. This project demonstrates a real-world project structure with clean separation of concerns across backend and frontend, including customer management and call/log tracking.


---

## ✨ Features

* 🔐 **User Authentication** – Secure JWT-based auth
* 📊 **Dashboard** – Overview of leads and activities
* 👥 **Lead Management** – Create, update, view, and delete leads
* 🔍 **Advanced Filtering** – Search leads by multiple criteria
* 👤 **User Profiles** – Manage account details and preferences
* 📱 **Responsive UI** – Mobile-first design with Tailwind CSS
* ⚡ **Real-time UX** – Fast and smooth interactions
* 🛡️ **Protected Routes** – Role-based access control

---


---

## 🚀 Tech Stack

### Backend

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **JWT Authentication**
* **bcryptjs**
* **CORS**
* **Nodemon**

### Frontend

* **React 19**
* **Vite**
* **React Router**
* **Axios**
* **Tailwind CSS**
* **React Icons**
* **ESLint**

---

## 📋 Prerequisites

Make sure you have:

* Node.js **v16+**
* npm or yarn
* MongoDB (Local or Atlas)

---

---
## 🏗️ Project Structure

```
crm/
├── Backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Auth & custom middleware
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── server.js        # Server entry point
│   ├── seed.js          # DB seeding
│   └── package.json
│
└── Frontend/
    ├── src/
    │   ├── components/  # Reusable components
    │   ├── pages/       # Page-level components
    │   ├── services/    # Axios API calls
    │   ├── context/     # Auth context
    │   ├── data/        # Mock data
    │   ├── App.jsx
    │   └── main.jsx
    ├── public/
    └── package.json
```


---

## 🎨 Frontend Pages

| Page         | Route        | Description       |
| ------------ | ------------ | ----------------- |
| Home         | `/`          | Landing page      |
| Login        | `/login`     | User login        |
| Signup       | `/signup`    | User registration |
| Dashboard    | `/dashboard` | Main dashboard    |
| Leads        | `/leads`     | Leads listing     |
| Lead Details | `/leads/:id` | Lead details      |
| Profile      | `/profile`   | User profile      |
| About        | `/about`     | About page        |
| Contact      | `/contact`   | Contact page      |

---

## 🔐 Authentication Flow

1. User signs up or logs in
2. Backend validates credentials
3. JWT token is issued
4. Token stored in localStorage / context
5. Protected routes verify auth status
6. API requests include `Authorization` header

---

---

## 🔧 Installation & Setup

###  Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file in `Backend/`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/crm
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

(Optional) Seed the database:

```bash
npm run seed
```

Start the backend:

```bash
npm run dev
```

📍 Backend runs at **[http://localhost:5000](http://localhost:5000)**

---

### 3️⃣ Frontend Setup

```bash
cd Frontend
npm install
```

Create `.env` in `Frontend/` (if required):

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

📍 Frontend runs at **[http://localhost:5173](http://localhost:5173)**

---

## 🚢 Scripts

### Backend

```bash
npm start
npm run dev
npm test
```

### Frontend

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

---

---

## 🧪 Development Tools

* Nodemon for auto-reloading backend
* SWR for frontend data fetching
* Axios for API requests

---

## 📌 Notes

* `.env` files are intentionally excluded from GitHub
* Make sure MongoDB is running before starting the backend
* Backend must be running before frontend

---
