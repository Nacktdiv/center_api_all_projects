const mysql2 = require('mysql2')
const { Sequelize, DataTypes } = require('sequelize');
const env = require('dotenv');
env.config();

const templateEnv = ['NAME', 'USER', 'PASS', 'HOST', 'PORT']
const nameProject = ['MILAD', 'BUKUTAMU']

const setupData = nameProject.reduce((acc, curr) => {
  acc[curr] = templateEnv.map((item, index) => {
    const data = process.env[`MYSQL_${curr}_${item}`]
    if (!data) throw new Error (`Variabel di env ada yang kosong! Cek file .env kamu, hint = MYSQL_${curr}_${item}`)
    return data
  })
  return acc
}, {})

db = Object.entries(setupData).reduce((acc, [name, property]) => {
  acc[name] = new Sequelize(property[0], property[1], property[2], {
    host: property[3],
    port: property[4],
    dialect: 'mysql',
    dialectModule: mysql2,
    logging:false
  })
  return acc
}, {})

// const MYSQL_MILAD_NAME = process.env.MYSQL_MILAD_NAME 
// const MYSQL_MILAD_USER = process.env.MYSQL_MILAD_USER 
// const MYSQL_MILAD_PASS = process.env.MYSQL_MILAD_PASS 
// const MYSQL_MILAD_HOST = process.env.MYSQL_MILAD_HOST
// const MYSQL_MILAD_PORT = process.env.MYSQL_MILAD_PORT


// const miladmantsaniDB = new Sequelize(MYSQL_MILAD_NAME, MYSQL_MILAD_USER, MYSQL_MILAD_PASS, {
//     dialect:'mysql',
//     dialectModule: mysql2,
//     host: MYSQL_MILAD_HOST,
//     port: MYSQL_MILAD_PORT,
//     logging: false
// });

const connectMysqlDB = async () => {
    // try {
    //     templateEnv.map((items, index) => {
    //         nameProject.map((item, index) => {
    //             if(!`MYSQL_${item}_${items}`){
    //                 throw new Error(`Variabel di env ada yang kosong! Cek file .env kamu, hint = MYSQL_${item}_${items}`)
    //             }
    //         })
    //     })

    //     await Promise.all([
    //         miladmantsaniDB.authenticate(),
    //         miladmantsaniDB.sync()
    //     ])

    //     if (process.env.NODE_ENV == 'production') {
    //         await Promise.all ([
    //             miladmantsaniDB.sync({ alter: true })
    //         ]) 
    //     }

    //     console.log('✅ Koneksi ke database berhasil.');
    // } catch (error) {
    //     console.error('❌ Gagal terhubung ke database:', error.message);
    //     process.exit(1); 
    // }
    try {
        await Promise.all(
            nameProject.map(async (item, index) => {
                await Promise.all([
                    db[item].authenticate(),
                    db[item].sync()
                ])

                if (process.env.NODE_ENV == 'production') {
                    await Promise.all ([
                        db[item].sync({ alter: true })
                    ]) 
                }

                console.log(`✅ Koneksi ke database ${item} berhasil.`);
            })
        )
    
        console.log('✅ MySQL connection successful');
    } catch (err) {
        console.error('❌ MySQL connection error:', err);
        process.exit(-1);
    }
}

module.exports = {miladmantsaniDB : db['MILAD'], bukutamuDB : db['BUKUTAMU'], connectMysqlDB, DataTypes};