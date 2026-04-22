const {bukutamuDB} = require('../../config/mysql.js');
const {DataTypes} = require('sequelize');

const BukuTamu = bukutamuDB.define('buku_tamu', {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false
    }, 
    nama : {
        type : DataTypes.STRING,
        allowNull : false
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false
    },
    kategori : {
        type : DataTypes.ENUM,
        values : [
            'Umum',
            'Penting',
            'Janji Temu',
            'Buat Temu',
            'Legalisir',
            'Observasi',
            'Surat',
            'PPDBM',
            'Antar barang',
            'Lainnya'
        ],
        allowNull : false,
    },
    nomor_telepon : {
        type : DataTypes.BIGINT,
        allowNull : false
    },
    alamat : {
        type : DataTypes.TEXT,
        allowNull : false
    },
    keterangan : {
        type : DataTypes.TEXT,
        allowNull : true
    }
}, {
    timestamps : true,
    underscored : true,
    tableName : 'buku_tamu'
})

module.exports = BukuTamu;