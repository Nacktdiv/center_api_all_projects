const express = require('express')
const router = express.Router()

const {authMiddleware} = require('../../middleware/miladmantsani/auth')
const checkRoleMiddleware = require('../../middleware/miladmantsani/checkRole')

const uploadEvent = require('../../controllers/miladmantsani/adminPOST');
const {updateEvent, updateStatusPendaftaran, updateStatusPembayaran} = require('../../controllers/miladmantsani/adminPATCH');
const mencariEvent = require('../../controllers/miladmantsani/adminGET')
const menghapusEvent = require('../../controllers/miladmantsani/adminDELETE')


router.get('/', authMiddleware, checkRoleMiddleware(['admin']), (req,res) => {
    res.status(200).json("Selamat datang admin")
})

router.get('/event', authMiddleware, checkRoleMiddleware(['admin']), (req,res) => {
    mencariEvent(res, req.query.search)
})

router.post('/inputevent', authMiddleware, checkRoleMiddleware(['admin']), (req,res) => {
    uploadEvent(res, req.body)
})

router.patch('/updateevent', authMiddleware, checkRoleMiddleware(['admin']), (req,res) => {
    updateEvent(res, req.body)
})

router.delete('/deleteevent', authMiddleware, checkRoleMiddleware(['admin']), (req,res) => {
    menghapusEvent(res, req.body)
})

router.patch('/pendaftaran/updatestatus', authMiddleware, checkRoleMiddleware(['admin']), (req,res) => {
    updateStatusPendaftaran(res, req.body.id_pendaftaran)
})

router.patch('/pembayaran/updatestatus', authMiddleware, checkRoleMiddleware(['admin']), (req,res) => {
    updateStatusPembayaran(res, req.body.id_pembayaran)
})

module.exports = router