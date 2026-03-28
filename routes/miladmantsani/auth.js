const express = require('express')
const router = express.Router()

const {authMiddleware, logout} = require('../../middleware/miladmantsani/auth');

const createUser = require('../../controllers/miladmantsani/userRegist');
const userLogin = require('../../controllers/miladmantsani/userLogin'); 

router.post('/register', (req,res) => {
    createUser(res, req.body)
})

router.post('/login', (req,res) => {
    userLogin(res, req.body)
})

router.post('/logout', authMiddleware, logout);

router.get('/role', authMiddleware, (req, res) => {
    res.status(200).json(req.user.role)
})

module.exports = router;
