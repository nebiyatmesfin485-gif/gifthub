const productModel = require("../models/productModel");

// Get all products
async function getAllProducts(req, res) {
    try {
        const products = await productModel.getAllProducts();

        res.status(200).json({
            success: true,
            products
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error."
        });
    }
}

// Get product by ID
async function getProductById(req, res) {
    try {
        const id = req.params.id;

        const product = await productModel.getProductById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found."
            });
        }

        res.status(200).json({
            success: true,
            product
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error."
        });
    }
}

// Create product
async function createProduct(req, res) {
    try {
        const {
            name,
            description,
            price,
            stock,
            image,
            category_id
        } = req.body;

        if (
            !name ||
            !description ||
            !price ||
            !stock ||
            !image ||
            !category_id
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        const newProduct = await productModel.createProduct(
            name,
            description,
            price,
            stock,
            image,
            category_id
        );

        res.status(201).json({
            success: true,
            message: "Product created successfully.",
            product: newProduct
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error."
        });
    }
}

// Update product
async function updateProduct(req, res) {
    try {
        const id = req.params.id;

        const {
            name,
            description,
            price,
            stock,
            image,
            category_id
        } = req.body;

        if (
            !name ||
            !description ||
            !price ||
            !stock ||
            !image ||
            !category_id
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        const updatedProduct = await productModel.updateProduct(
            id,
            name,
            description,
            price,
            stock,
            image,
            category_id
        );

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully.",
            product: updatedProduct
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error."
        });
    }
}

// Delete product
async function deleteProduct(req, res) {
    try {
        const id = req.params.id;

        const deletedProduct = await productModel.deleteProduct(id);

        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully.",
            product: deletedProduct
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
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};

   
