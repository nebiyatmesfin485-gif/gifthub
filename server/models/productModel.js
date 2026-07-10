const pool = require("../config/db");

// Get all products
async function getAllProducts() {
    const query = `
        SELECT *
        FROM products
        ORDER BY id;
    `;

    const result = await pool.query(query);

    return result.rows;
}

// Get product by ID
async function getProductById(id) {
    const query = `
        SELECT *
        FROM products
        WHERE id = $1;
    `;

    const result = await pool.query(query, [id]);

    return result.rows[0];
}

// Create product
async function createProduct(
    name,
    description,
    price,
    stock,
    image,
    category_id
) {
    const query = `
        INSERT INTO products
        (name, description, price, stock, image, category_id)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
    `;

    const values = [
        name,
        description,
        price,
        stock,
        image,
        category_id
    ];

    const result = await pool.query(query, values);

    return result.rows[0];
}

// Update product
async function updateProduct(
    id,
    name,
    description,
    price,
    stock,
    image,
    category_id
) {
    const query = `
        UPDATE products
        SET name = $1,
            description = $2,
            price = $3,
            stock = $4,
            image = $5,
            category_id = $6
        WHERE id = $7
        RETURNING *;
    `;

    const values = [
        name,
        description,
        price,
        stock,
        image,
        category_id,
        id
    ];

    const result = await pool.query(query, values);

    return result.rows[0];
}

// Delete product
async function deleteProduct(id) {
    const query = `
        DELETE FROM products
        WHERE id = $1
        RETURNING *;
    `;

    const result = await pool.query(query, [id]);

    return result.rows[0];
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
