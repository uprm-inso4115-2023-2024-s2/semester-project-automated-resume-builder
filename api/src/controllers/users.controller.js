const pool = require('../db');

// Recomendado para seguridad de contraseñas
const bcrypt = require('bcrypt'); 
const getAllUsers = async (req, res, next) => {
    try {
        const allUsers = await pool.query('SELECT * FROM users');
        res.json(allUsers.rows);
    } catch (error) {
        next(error); 
    }
};

// Obtener un usuario usando user_id
const getUser = async (req, res, next) => {
    try {
        const { user_id } = req.params;
        const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [user_id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

// Crear un nuevo usuario
const createUser = async (req, res, next) => {
    const { email, password, name, middle_initial, frst_lst_name, scnd_lst_name, phone_number, summary, profile } = req.body;

    try {
        // Aqui se usa el bcrypt para hashear la contraseña (recomendado debido a que es mejor que se genere el hash en el servidor que en el cliente)
        const password_hash = await bcrypt.hash(password, 10);

        const result = await pool.query(
            'INSERT INTO users (email, password_hash, name, middle_initial, frst_lst_name, scnd_lst_name, phone_number, summary, profile) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
            [email, password_hash, name, middle_initial, frst_lst_name, scnd_lst_name, phone_number, summary, profile]
        );

        res.json(result.rows[0]); // Para retornar el usuario creado
    } catch (error) {
        next(error);
    }
};

// Actualizar un usuario
const updateUser = async (req, res, next) => {
    const { user_id } = req.params;
    const { email, name, middle_initial, frst_lst_name, scnd_lst_name, phone_number, summary, profile } = req.body;

    try {
        const result = await pool.query(
            'UPDATE users SET email = $1, name = $2, middle_initial = $3, frst_lst_name = $4, scnd_lst_name = $5, phone_number = $6, summary = $7, profile = $8 WHERE user_id = $9 RETURNING *',
            [email, name, middle_initial, frst_lst_name, scnd_lst_name, phone_number, summary, profile, user_id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.json(result.rows[0]); // Para retornar el usuario actualizado
    } catch (error) {
        next(error);
    }
};

// Eliminar un usuario
const deleteUser = async (req, res, next) => {
    const { user_id } = req.params;

    try {
        const result = await pool.query('DELETE FROM users WHERE user_id = $1', [user_id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.sendStatus(204); // Para notificar que se elimino exitosamente
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
};
