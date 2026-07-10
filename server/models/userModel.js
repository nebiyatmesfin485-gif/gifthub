const pool = require("../config/db");

async function findUserByEmail(email) {
    const result = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    );

    return result.rows[0];
}

async function createUser(full_name, email, password, role) {
    const result = await pool.query(
        `INSERT INTO users (full_name, email, password, role)
         VALUES ($1, $2, $3, $4)
         RETURNING id, full_name, email, role`,
        [full_name, email, password, role]
    );

    return result.rows[0];
}

module.exports = {
    findUserByEmail,
    createUser
};