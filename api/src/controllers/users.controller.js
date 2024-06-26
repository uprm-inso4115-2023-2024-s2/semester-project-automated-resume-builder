const pool = require('../db');
const PDFDocument = require('pdfkit');
const { Resend } = require('resend');
const resend = new Resend('re_cnazMdWM_FS1Zo3ce1vrAFm3XiboSRCzd');
const crypto = require('crypto');


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

const verifiedEmail = async (req, res, next) => {
    const { token } = req.query; // Extraes el token de la URL
    // Aquí buscas en la base de datos el usuario con este token y actualizas su estado a verificado
    try {
        const result = await pool.query(
            'UPDATE users SET email_verified = true WHERE email_verification_token = $1 RETURNING *',
            [token]
        );
        
        if (result.rows.length > 0) {
            res.redirect("http://localhost:3000/");
        } else {
            res.redirect("http://localhost:3000/");
        }
    } catch (error) {
        next(error)
    }
    
};

const signUpUser = async (req, res, next) => {
    const { email, password } = req.body;
    const emailVerificationToken = crypto.randomBytes(20).toString('hex');
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await pool.query(
            'INSERT INTO users (email, password_hash, email_verification_token) VALUES ($1, $2, $3) RETURNING *',
            [email, hashedPassword, emailVerificationToken]
        );
        const user = newUser.rows[0];
        const token = generateAuthToken(user.user_id);
        res.json({ user, token });
        
        resend.emails.send({
            from: 'onboarding@resend.dev',
            to: [email],
            subject: 'Verify Your Email',
            html: `<strong>Click this link to verify your email:</strong> <a href="http://localhost:4000/verify-email?token=${emailVerificationToken}">Verify Email</a>`,
        });
    } catch (error) {
        next(error);
    }
};


//save Resume
const saveResume = async (req, res, next) => {
    const {name, email, phone, city, country, title, summary, experience, education, skills, pdfFormat} = req.body;
        const resumeVerificationToken = crypto.randomBytes(20).toString('hex');
    try {
        const result = await pool.query(
            'INSERT INTO resumes (name, email, phone, city, country, title, summary, experience, education, skills, pdfFormat,resume_verification_token) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
            [name, email, phone, city, country, title, summary, experience, education, skills, pdfFormat, resumeVerificationToken]
        );
        const resume = result.rows[0];
        const token = generateAuthToken(resume.resume_id);
        res.json({ resume, token });
} catch (error) {
        next(error);
    }

};

//\get a particular resume
const getResume = async (req, res, next) => {
    try {
        const { resume_id } = req.params;
        const result = await pool.query('SELECT * FROM resumes WHERE resume_id = $1', [resume_id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

//get all resumes
const getAllResumes = async (req, res, next) => {
    try {
        const allResumes = await pool.query('SELECT * FROM resumes');
        res.json(allResumes.rows);
    } catch (error) {
        next(error);
    }
};

// Log user in
const logInUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userResult.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid Credentials' });
        }
        const user = userResult.rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid || !user.email_verified) {
            return res.status(401).json({ message: 'Invalid Credentials or Email not verified' });
        }
        const token = generateAuthToken(user.user_id);
        res.json({ user, token });
    } catch (error) {
        next(error);
    }
};


const getUserDetailsByToken = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; // "Bearer TOKEN"
    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. No se proporcionó token.' });
    }

    try {
        const verified = jwt.verify(token, 'your_secret_key');
        const userId = verified.userId;
        const userResult = await pool.query('SELECT * FROM users WHERE user_id = $1', [userId]);

        if (userResult.rows.length > 0) {
            const user = userResult.rows[0];
            // Excluye datos sensibles como password_hash antes de enviar la respuesta
            const { password_hash, ...userData } = user;
            res.json(userData);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado.' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Token inválido.' });
    }
};


//somewhat temporary code to convert the selected user's username into a pdf, planned for use to download resumes
const getDownload = async (req, res, next) => {
    try {
        const { resume_id, name } = req.params;
        const result = await pool.query('SELECT * FROM resumes WHERE resume_id = $1', [resume_id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Resume not found" });
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
    saveResume,
    getResume,
    getAllResumes,
    updateUser,
    deleteUser,
    verifiedEmail,
    getUserDetailsByToken
};
