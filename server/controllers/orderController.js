const orderModel = require("../models/orderModel");

// Create Order


async function createOrder(req, res) {

    try {

        const { items } = req.body;

        const user_id = req.user.id;

        if (!items || items.length === 0) {

            return res.status(400).json({
                success: false,
                message: "Your cart is empty."
            });

        }

        let totalPrice = 0;

        items.forEach(item => {
            totalPrice += Number(item.price) * Number(item.quantity);
        });

        const order = await orderModel.createOrder(
            user_id,
            totalPrice
        );

        for (const item of items) {

            await orderModel.addOrderItem(
                order.id,
                item.id,
                item.quantity,
                Number(item.price) * Number(item.quantity)
            );

        }

        res.status(201).json({
            success: true,
            message: "Order placed successfully.",
            order
        });

    } catch (error) {

        console.error("ORDER ERROR:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

}
// Customer: Get My Orders
async function getMyOrders(req, res) {

    try {

        const user_id = req.user.id;

        const orders = await orderModel.getMyOrders(user_id);

        res.status(200).json({
            success: true,
            orders
        });

    } catch (error) {

        console.error("MY ORDERS ERROR:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

}




// Get All Orders
async function getAllOrders(req, res) {

    try {

        const orders = await orderModel.getAllOrders();

        res.status(200).json({
            success: true,
            orders
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

}
// Admin updates order status
async function updateOrderStatus(req, res) {

    try {

        const { payment_status, status } = req.body;

        const order = await orderModel.updateOrder(
            req.params.id,
            payment_status,
            status
        );

        res.json({
            success: true,
            order
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error."
        });

    }

}

module.exports = {
    createOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus
};
