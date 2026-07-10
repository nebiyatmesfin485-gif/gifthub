const path = require("path");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const authenticateToken = require("./middleware/authMiddleware");
const isAdmin = require("./middleware/adminMiddleware");
console.log("isAdmin =", isAdmin);

const pool = require("./config/db");

const authRoutes = require("./routes/authRoutes");

console.log(require.resolve("./routes/authRoutes"));

console.log(authRoutes);
console.log(typeof authenticateToken);

console.log(typeof isAdmin);

console.log("categoryRoutes =", categoryRoutes);


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../client")));
// Authentication Routes
app.use("/api/auth", authRoutes);
// Category Routes
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
// Home Route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/index.html"));
});

// Test Database Route
app.get("/test-db", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");

        res.json({
            success: true,
            time: result.rows[0].now
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});
app.get("/profile", authenticateToken, (req, res) => {
    res.json({
        success: true,
        message: "Protected route accessed successfully.",
        user: req.user
    });
});

app.get(
    "/admin",
    authenticateToken,
    isAdmin,
    (req, res) => {
        res.json({
            success: true,
            message: "Welcome Admin!"
        });
    }
);

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});