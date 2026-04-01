const mysql2 = require('mysql2')
const { Sequelize, DataTypes } = require('sequelize');
const env = require('dotenv');
env.config();

const templateEnv = ['NAME', 'USER', 'PASS', 'HOST', 'PORT']
const nameProject = ['MILAD']

const MYSQL_MILAD_NAME = process.env.MYSQL_MILAD_NAME || 'miladmantsani';
const MYSQL_MILAD_USER = process.env.MYSQL_MILAD_USER 
const MYSQL_MILAD_PASS = process.env.MYSQL_MILAD_PASS || '';
const MYSQL_MILAD_HOST = process.env.MYSQL_MILAD_HOST || '127.0.0.1'
const MYSQL_MILAD_PORT = process.env.MYSQL_MILAD_PORT || '3306'


const miladmantsaniDB = new Sequelize(MYSQL_MILAD_NAME, MYSQL_MILAD_USER, MYSQL_MILAD_PASS, {
    dialect:'mysql',
    dialectModule: mysql2,
    host: MYSQL_MILAD_HOST,
    port: MYSQL_MILAD_PORT,
    logging: false
});

const connectMysqlDB = async () => {
    try {
        templateEnv.map((items, index) => {
            nameProject.map((item, index) => {
                if(!`MYSQL_${item}_${items}`){
                    throw new Error(`Variabel di env ada yang kosong! Cek file .env kamu, hint = MYSQL_${item}_${items}`)
                }
            })
        })

        await Promise.all([
            miladmantsaniDB.authenticate()
        ])

        if (process.env.NODE_ENV == 'production') {
            await Promise.all ([
                miladmantsaniDB.sync({ alter: true })
            ]) 
        }

        console.log('✅ Koneksi ke database berhasil.');
    } catch (error) {
        console.error('❌ Gagal terhubung ke database:', error.message);
        process.exit(1); 
    }
}

module.exports = {miladmantsaniDB, connectMysqlDB, DataTypes};