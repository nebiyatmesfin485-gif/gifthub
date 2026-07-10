🎁 GiftHub
GiftHub is a full-stack e-commerce web application developed as a Web Programming II Final Project. It allows customers to browse products, register and log in securely, add items to a shopping cart, and place orders. Administrators can manage products, categories, and customer orders.

Features
Customer
Register a new account
Secure login using JWT authentication
Browse products
View product categories
Add products to shopping cart
Remove products from cart
Checkout and place orders
View personal order history
Admin
Secure admin login
View all customer orders
Update order status
Manage products
Manage categories
Technologies Used
Frontend
HTML5
CSS3
JavaScript (Vanilla)
Backend
Node.js
Express.js
Database
PostgreSQL
Authentication
JSON Web Token (JWT)
bcrypt password hashing
Project Structure
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
│   └── .env
Installation
Clone the repository
git clone <repository-url>
Install dependencies
npm install
Configure the .env file
PORT=3000
JWT_SECRET=your_secret_key
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=gifthub
Import the database
Import database.sql into PostgreSQL.

Start the server
npm run dev
or

npm start
Open the application
http://localhost:3000
Database
Main tables include:

users
categories
products
orders
order_items
Authentication
Passwords are encrypted using bcrypt.
JWT is used to protect customer and administrator routes.
Role-based authorization distinguishes customers from administrators.
Future Improvements
Online payment integration
Delivery management
Product search and filtering
Customer reviews and ratings
Email notifications
Order tracking
Dashboard analytics
Author
Nebiyat Mesfin

Computer Science Student

Web Programming II Final Project

2026
