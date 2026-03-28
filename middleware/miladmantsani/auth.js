const env = require('dotenv');
const jwt = require('jsonwebtoken');

env.config()
const jwtSecret = process.env.JWT_SECRET

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'COOKIES TOKEN TIDAK ADA' });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(403).json({ message: 'INVALID ATAU TOKEN KADALUARSA' });
    }
}

const logout = (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/'
        });

        return res.status(200).json({ 
            success: true, 
            message: "LOGOUT BERHASIL" 
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: "GAGAL LOGOUT" + error.message 
        });
    }
};

module.exports = {authMiddleware, logout}
