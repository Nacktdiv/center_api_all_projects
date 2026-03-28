const multer = require('multer');
const path = require('path');
const mime = require('mime-types');

const cleanString = (str) => {
    return str.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
};

const customStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public'); 
    },
    filename: (req, file, cb) => {
        const namaLengkap = req.user?.nama_lengkap || 'unknown_user'; 
        
        const cleanName = cleanString(namaLengkap);
        const randomChars = Math.random().toString(36).substr(2, 6).toUpperCase();
        const fileExtension = mime.extension(file.mimetype);
        
        const newFileName = `${cleanName}_${randomChars}.${fileExtension}`;
        
        cb(null, newFileName);
    }
});

const uploadInstance = multer({
    storage: customStorage,
    limits: { fileSize: 2 * 1024 * 1024 }, 
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'image/webp'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('TIPE FILE TIDAK DIIZINKAN: Harap unggah JPG, PNG, WEBP, atau PDF.'));
        }
    }
});

// Export fungsi single() untuk dipanggil di controller
const uploadBuktiBayar = uploadInstance.single('bukti_pembayaran');

module.exports = uploadBuktiBayar;