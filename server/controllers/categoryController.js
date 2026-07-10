const categoryModel = require("../models/categoryModel");

// Get all categories
async function getAllCategories(req, res) {
    try {
        const categories = await categoryModel.getAllCategories();

        res.status(200).json({
            success: true,
            categories
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error."
        });
    }
}

// Get one category
async function getCategoryById(req, res) {
    try {
        const id = req.params.id;

        const category = await categoryModel.getCategoryById(id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found."
            });
        }

        res.status(200).json({
            success: true,
            category
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error."
        });
    }
}

// Create category
async function createCategory(req, res) {
    try {
        const { name, description } = req.body;

        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "Name and description are required."
            });
        }

        const newCategory = await categoryModel.createCategory(
            name,
            description
        );

        res.status(201).json({
            success: true,
            message: "Category created successfully.",
            category: newCategory
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error."
        });
    }
}

/// Update category
async function updateCategory(req, res) {
    try {
        const id = req.params.id;
        const { name, description } = req.body;

        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "Name and description are required."
            });
        }

        const updatedCategory = await categoryModel.updateCategory(
            id,
            name,
            description
        );

        if (!updatedCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Category updated successfully.",
            category: updatedCategory
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error."
        });
    }
}
// Delete category
async function deleteCategory(req, res) {
    try {
        const id = req.params.id;

        const deletedCategory = await categoryModel.deleteCategory(id);

        if (!deletedCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Category deleted successfully.",
            category: deletedCategory
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
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};
  