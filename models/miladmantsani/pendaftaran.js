// models/Pendaftaran.js
const { miladmantsaniDB, DataTypes } = require('../../config/mysql');

const pendaftaran = miladmantsaniDB.define('pendaftaran', {
    id_pendaftaran: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    asal_institusi: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    nama_tim: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    nama_pembina: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    nama_peserta: {
        type: DataTypes.JSON,
        allowNull: false
    },
    status_verifikasi: {
        type: DataTypes.ENUM('Menunggu', 'Berhasil'),
        defaultValue: 'Menunggu',
        allowNull: false
    },
    tanggal_daftar: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    kode_unik_tiket: {
        type: DataTypes.STRING(50),
        unique: true
    },
    jumlah_bayar: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
    id_user: { // Foreign Key ke model User
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_event: { // Foreign Key ke model Event
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'pendaftaran',
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['id_user', 'id_event']
        }
    ]
});

module.exports = pendaftaran;