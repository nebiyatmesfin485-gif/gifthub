# 🎁 GiftHub

GiftHub is a full-stack e-commerce web application developed as a **Web Programming II Final Project**. It enables customers to browse products, register and log in securely, add items to a shopping cart, and place orders. Administrators can manage products, categories, and customer orders through an admin dashboard.



## ✨ Features

### Customer
- Register a new account
- Secure login using JWT authentication
- Browse available products
- View product categories
- Add products to the shopping cart
- Remove products from the shopping cart
- Place orders
- View personal order history

### Administrator
- Secure admin login
- View all customer orders
- Update order status (Pending, Processing, Shipped, Delivered)
- Manage products
- Manage categories



## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript (Vanilla)

### Backend
- Node.js
- Express.js

### Database
- PostgreSQL

### Authentication
- JSON Web Token (JWT)
- bcrypt (Password Hashing)



## 📁 Project Structure


GIFTHUB/
│
├── client/
│   ├── index.html
│   ├── products.html
│   ├── register.html
│   ├── login.html
│   ├── cart.html
│   ├── myorders.html
│   ├── admin.html
│   ├── css/
│   ├── js/
│   └── images/
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   ├── database.sql
│   ├── package.json
│   └── .env.example
│
├── docs/
│
└── README.md




## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/nebiyatmesfin485-gif/gifthub.git
```

### 2. Navigate to the Server Folder

```bash
cd GIFTHUB/server
```

### 3. Install Dependencies

bash
npm install


### 4. Configure Environment Variables

Create a `.env` file inside the **server** folder.

.env
PORT=3000
JWT_SECRET=your_secret_key

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=gifthub


### 5. Import the Database

Open PostgreSQL and import the `database.sql` file located in the **server** folder.

### 6. Start the Server

Development Mode:

```bash
npm run dev
```

Production Mode:

```bash
npm start
```

### 7. Open the Application

Open the frontend pages from the **client** folder in your browser.

The backend API runs at:

```
http://localhost:3000
```

---

## 🗄️ Database Tables

The application uses the following main tables:

- users
- categories
- products
- orders
- order_items

---

## 🔐 Authentication & Authorization

- Passwords are securely encrypted using **bcrypt**.
- JWT is used for authentication.
- Protected routes require a valid token.
- Role-based authorization separates **Customers** and **Administrators**.

---

## 🚀 Future Improvements

- Online payment integration
- Delivery management
- Product search and filtering
- Customer reviews and ratings
- Email notifications
- Order tracking
- Dashboard analytics

---

## 👨‍💻 Author

**Nebiyat Mesfin**

Computer Science Student

Web Programming II Final Project

2026
