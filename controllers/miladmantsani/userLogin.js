const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const {user} = require('../../models/miladmantsani/setup'); 
const resFormat = require('../../models/miladmantsani/resformat');
const env = require('dotenv');

env.config()

const userLogin = async (res, body) => {
    const {email, password} = body
    // res.send(200, [email, password])
    try {
        const userData = await user.findOne({ where: { email } });
        if (!userData) {
            resFormat(res, 404, {}, "PESERTA TIDAK DITEMUKAN");
            return;
        }
        const passwordMatch = await bcrypt.compare(password, userData.password_hash);
        if (!passwordMatch) {
            resFormat(res, 401, {}, "PASSWORD SALAH");
            return;
        }
        const payload = {
            id_user: userData.id_user,
            nama_lengkap: userData.nama_lengkap,
            email: userData.email,
            role: userData.role
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'none', 
            maxAge: 24 * 60 * 60 * 1000 
        });

        resFormat(res, 200, userData.role, "LOGIN BERHASIL");
    } catch (err) {
        resFormat(res, 500, {}, "Error during login: " + err.message);
    }
}

module.exports = userLogin;