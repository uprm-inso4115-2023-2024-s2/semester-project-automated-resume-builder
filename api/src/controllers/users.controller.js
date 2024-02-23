const pool = require('../db');
const PDFDocument = require('pdfkit');

function buildPDF(dataCallback, endCallback) {
    const doc = new PDFDocument()
    doc.on('data', dataCallback);
    doc.on('end', endCallback);
    doc.text(val);
    doc.end();
}
// Recommended for password security
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

// Generate authentication token for session
const generateAuthToken = (userId) => {
    return jwt.sign({ userId }, 'your_secret_key', { expiresIn: '1h' });
};

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


const signUpUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING user_id, email',
            [email, hashedPassword]
        );
        const user = result.rows[0];
        const token = generateAuthToken(user.user_id);
        res.json({ user, token });
    } catch (error) {
        next(error);
    }
};

const logInUser = async (req, res, next) => {
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
};

//somewhat temporary code to convert the selected user's username into a pdf, planned for use to download resumes
const getDownload = async (req, res, next) => {
    try {
        const { user_id, name } = req.params;
        const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [user_id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        val = result.rows[0].name
        const doc = new PDFDocument()
        filename = 'download.pdf'
        res.setHeader('Content-disposition', 'attachment; filename= "download.pdf"')
        res.setHeader('Content-type', 'application/pdf')
        doc.y = 300
        doc.text(val, 50, 50)
        doc.pipe(res)
        doc.end()
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
    getDownload,
    signUpUser,
    logInUser,
    updateUser,
    deleteUser
};
