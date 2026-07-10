const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

const authenticateToken = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");

// Get all products
router.get("/", productController.getAllProducts);

// Get product by ID
router.get("/:id", productController.getProductById);

// Create product
router.post("/", authenticateToken, isAdmin, productController.createProduct);

// Update product
router.put("/:id",authenticateToken,
isAdmin, productController.updateProduct);

// Delete product
router.delete("/:id", authenticateToken,
isAdmin,productController.deleteProduct);

module.exports = router;