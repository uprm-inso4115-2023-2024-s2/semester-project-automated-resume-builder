const pool = require('../db');

const getPersonalInfo = async (req, res, next) => {
    const { user_id } = req.params; // Assuming route is defined as /personal-info/:user_id
    try {
        const info = await pool.query('SELECT * FROM personal_information WHERE user_id = $1', [user_id]);
        if (info.rows.length === 0) {
            return res.status(404).json({ message: "Personal information not found" });
        }
        res.json(info.rows);
    } catch (error) {
        next(error);
    }
};


const savePersonalInfo = async (req, res, next) => {
    const { user_id, first_name, middle_initial, last_name, phone_number, address, socials, summary, profile } = req.body;
    try {
        const newInfo = await pool.query(
            'INSERT INTO personal_information (user_id, first_name, middle_initial, last_name, phone_number, address, socials, summary, profile) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
            [user_id, first_name, middle_initial, last_name, phone_number, address, socials, summary, profile]
        );
        res.json(newInfo.rows[0]);
    } catch (error) {
        next(error);
    }
};


const deletePersonalInfo = async (req, res, next) => {
    const { personal_info_id } = req.params;
    try {
        const result = await pool.query('DELETE FROM personal_information WHERE personal_info_id = $1 RETURNING *', [personal_info_id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Personal information not found" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const updatePersonalInfo = async (req, res, next) => {
    const { personal_info_id } = req.params;
    const { first_name, middle_initial, last_name, phone_number, address, socials, summary, profile } = req.body;
    try {
        const updatedInfo = await pool.query(
            'UPDATE personal_information SET first_name = $1, middle_initial = $2, last_name = $3, phone_number = $4, address = $5, socials = $6, summary = $7, profile = $8 WHERE personal_info_id = $9 RETURNING *',
            [first_name, middle_initial, last_name, phone_number, address, socials, summary, profile, personal_info_id]
        );
        if (updatedInfo.rows.length === 0) {
            return res.status(404).json({ message: "Personal information not found" });
        }
        res.json(updatedInfo.rows[0]);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getPersonalInfo,
    savePersonalInfo,
    updatePersonalInfo,
    deletePersonalInfo,
};