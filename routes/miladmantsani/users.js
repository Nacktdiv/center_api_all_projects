const express = require('express')
const router = express.Router()
const multer = require('multer')

const {authMiddleware} = require('../../middleware/miladmantsani/auth');
const checkRoleMiddleware = require('../../middleware/miladmantsani/checkRole');
const uploadBuktiBayar = require('../../middleware/miladmantsani/multer')

const {mengetahuiEvent, memintaBuktiPembayaran} = require('../../controllers/miladmantsani/pesertaGET');
const {updatePeserta, updatePendaftaran, updatePembayaran} = require('../../controllers/miladmantsani/pesertaPATCH');
const {createPendaftaran, createPembayaran} = require('../../controllers/miladmantsani/pesertaPOST');

router.get('/', authMiddleware, checkRoleMiddleware(['peserta']), (req,res) => {
    mengetahuiEvent(res, req.user.id_user)
})

router.patch('/perbaruidata', authMiddleware, checkRoleMiddleware(['peserta']), (req,res) => {
    updatePeserta(res, req.user.id_user, req.body)
})

router.post('/pendaftaran', authMiddleware, checkRoleMiddleware(['peserta']), (req,res) => {
    createPendaftaran(res, req.user.id_user, req.body)
})

router.patch('/pendaftaran/perbaruidata', authMiddleware, checkRoleMiddleware(['peserta']), (req,res) => {
    updatePendaftaran(res, req.user.id_user, req.body)
})

router.post('/pembayaran', 
    authMiddleware, 
    checkRoleMiddleware(['peserta']), 
    (req, res, next) => {
        uploadBuktiBayar(req, res, (err) => {
            if (err) {
                if (err instanceof multer.MulterError) {
                    return res.status(400).json({ message: `Upload gagal: ${err.message}` });
                }
                return res.status(400).json({ message: err.message });
            }
            next();
        });
    }, 
    (req, res) => {
        const fileBaru = req.file ? req.file.filename : null;
        createPembayaran(res, fileBaru, req.body);
    }
);

router.patch('/pembayaran/perbaruidata', 
    authMiddleware, 
    checkRoleMiddleware(['peserta']), 
    (req, res, next) => {
        uploadBuktiBayar(req, res, (err) => {
            if (err) {
                if (err instanceof multer.MulterError) {

                    return res.status(400).json({ message: `Upload gagal: ${err.message}` });
                }
                return res.status(400).json({ message: err.message });
            }
            next();
        });
    }, 
    (req, res) => {
        const fileBaru = req.file ? req.file.filename : null;
        updatePembayaran(res, fileBaru, req.body);
    }
);

router.get('/receipt/', authMiddleware, checkRoleMiddleware(['peserta']), (req, res) => {
    memintaBuktiPembayaran(res, req.user.id_user)
} )

module.exports = router;