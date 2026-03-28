const express = require('express')
const app = express()

// support import
const env = require('dotenv').config({ override: true, debug: true})

const cors = require('cors')
const allowedOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : []
const options = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
            return
        }
        callback(new Error('Akses diblokir: Domain Anda tidak terdaftar di API Center'))
    }, 
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(options));

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const path = require('path')

// component import 
const {connectMysqlDB} = require('./config/mysql');
connectMysqlDB()

const usersRouter = require('./routes/miladmantsani/users')
const adminRouter = require('./routes/miladmantsani/admin')
const authRouter = require('./routes/miladmantsani/auth')

// START
app.use('/',authRouter)
app.use('/peserta', usersRouter)
app.use('/admin', adminRouter)

// END

// listen port
app.listen(process.env.PORT, (err) => {
    err && console.log("GAGAL SAMBUNG", err) 
    console.log("BERHASIL SAMBUNG PORT",)
    console.log("MODE =", process.env.NODE_ENV)
    
})