const pool = require("../config/db");

// Get all categories
async function getAllCategories() {
    const query = `
        SELECT *
        FROM categories
        ORDER BY id;
    `;

    const result = await pool.query(query);

    return result.rows;
}

// Get category by ID
async function getCategoryById(id) {
    const query = `
        SELECT *
        FROM categories
        WHERE id = $1;
    `;

    const result = await pool.query(query, [id]);

    return result.rows[0];
}

// Create category
async function createCategory(name, description) {
    const query = `
        INSERT INTO categories (name, description)
        VALUES ($1, $2)
        RETURNING *;
    `;

    const result = await pool.query(query, [name, description]);

    return result.rows[0];
}

// Update category
async function updateCategory(id, name, description) {
    const query = `
        UPDATE categories
        SET name = $1,
            description = $2
        WHERE id = $3
        RETURNING *;
    `;

    const result = await pool.query(query, [
        name,
        description,
        id
    ]);

    return result.rows[0];
}
// Delete category
async function deleteCategory(id) {
    const query = `
        DELETE FROM categories
        WHERE id = $1
        RETURNING *;
    `;

    const result = await pool.query(query, [id]);

    return result.rows[0];
}

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};

   

