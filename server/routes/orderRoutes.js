const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");
const authenticateToken = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");

// Customer places an order
router.post(
    "/",
    authenticateToken,
    orderController.createOrder
);

// Customer views their own orders
router.get(
    "/my",
    authenticateToken,
    orderController.getMyOrders
);

// Admin views all orders
router.get(
    "/",
    authenticateToken,
    isAdmin,
    orderController.getAllOrders
);

// Admin updates order status
router.put(
    "/:id",
    authenticateToken,
    isAdmin,
    orderController.updateOrderStatus
);

module.exports = router;