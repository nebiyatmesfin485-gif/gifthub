const express = require("express");
const router = express.Router();

console.log("Category routes loaded");

const categoryController = require("../controllers/categoryController");

const authenticateToken = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");

// Get all categories
router.get("/", categoryController.getAllCategories);

// Get category by ID
router.get("/:id", categoryController.getCategoryById);

// Create a new category
router.post("/", authenticateToken, isAdmin, categoryController.createCategory);
// Update category
router.put("/:id", authenticateToken, isAdmin, categoryController.updateCategory);

// Delete category
router.delete("/:id", authenticateToken, isAdmin, categoryController.deleteCategory);
module.exports = router;