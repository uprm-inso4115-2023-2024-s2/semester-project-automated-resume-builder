import pool from '../db.js';
import PDFDocument from 'pdfkit';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const generateAuthToken = (userId) => {
    return jwt.sign({ userId }, 'your_secret_key', { expiresIn: '1h' });
};

async function getAllUsers(req, res, next) {
    try {
        const allUsers = await pool.query('SELECT * FROM users');
        res.json(allUsers.rows);
    } catch (error) {
        next(error);
    }
}

async function getUser(req, res, next) {
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
}

async function signUpUser(req, res, next) {
    const { email, password, name, middle_initial, frst_lst_name, scnd_lst_name, phone_number, summary, profile } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (email, password_hash, name, middle_initial, frst_lst_name, scnd_lst_name, phone_number, summary, profile) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *', // Adjusted to RETURNING *
            [email, hashedPassword, name, middle_initial, frst_lst_name, scnd_lst_name, phone_number, summary, profile]
        );
        const user = result.rows[0];
        const token = generateAuthToken(user.user_id);
        res.json({ user, token });
    } catch (error) {
        next(error);
    }
}

async function logInUser(req, res, next) {
    const { email, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid Credentials' });
        }
        const user = result.rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid Credentials' });
        }
        const token = generateAuthToken(user.user_id);
        res.json({ user, token });
    } catch (error) {
        next(error);
    }
}

async function getDownload(req, res, next) {
    try {
        const { user_id } = req.params;
        const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [user_id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        const val = result.rows[0].name;
        const doc = new PDFDocument();
        const filename = 'download.pdf';
        res.setHeader('Content-Disposition', 'attachment; filename="' + filename + '"');
        res.setHeader('Content-Type', 'application/pdf');
        doc.text(val, 50, 50);
        doc.pipe(res);
        doc.end();
    } catch (error) {
        next(error);
    }
}

async function updateUser(req, res, next) {
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

        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

async function deleteUser(req, res, next) {
    const { user_id } = req.params;

    try {
        const result = await pool.query('DELETE FROM users WHERE user_id = $1', [user_id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};

export {
    getAllUsers,
    getUser,
    getDownload,
    signUpUser,
    logInUser,
    updateUser,
    deleteUser
};