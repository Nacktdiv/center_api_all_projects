const checkRoleMiddleware = (allowedRoles) => (req, res, next) => {
    if (!req.user || !req.user.role) {
        return res.status(500).json({ message: 'ERROR SERVER: Informasi role tidak tersedia.' });
    }

    const userRole = req.user.role;

    if (allowedRoles.includes(userRole)) {
        next();
    } else {
        return res.status(403).json({ 
            message: 'AKSES DITOLAK: Anda tidak memiliki izin yang diperlukan.' 
        });
    }
};

module.exports = checkRoleMiddleware;