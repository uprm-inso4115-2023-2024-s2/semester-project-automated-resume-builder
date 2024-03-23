const pool = require('../db');

const getPersonalInfo = async (req, res, next) => {
    const { personal_info_id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM personal_information WHERE personal_info_id = $1', [personal_info_id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Personal information not found" });
        }

        res.json(result.rows);
    } catch (error) {
        next(error);
    }
}

const savePersonalInfo = async (req, res, next) => {
    const { user_id, first_name, middle_initial, last_name, email, phone_number, address, socials, summary } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO personal_information (user_id, first_name, middle_initial, last_name, email, phone_number, address, socials, summary) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING personal_info_id',
            [user_id, first_name, middle_initial, last_name, email, phone_number, address, socials, summary]
        );

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

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

module.exports = {
    getPersonalInfo,
    savePersonalInfo,
    deletePersonalInfo,
};
