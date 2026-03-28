// models/Pembayaran.js
const { miladmantsaniDB, DataTypes } = require('../../config/mysql');

const pembayaran = miladmantsaniDB.define('pembayaran', {
    id_pembayaran: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    metode_pembayaran: {
        type: DataTypes.ENUM('Cash', 'Transfer')
    },
    bukti_pembayaran: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    tanggal_pembayaran: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    status_konfirmasi: {
        type: DataTypes.ENUM('Menunggu', 'Berhasil'),
        defaultValue: 'Menunggu',
        allowNull: false
    },
    id_pendaftaran: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'pembayaran',
    timestamps: false,
    indexes: [
        {
            fields: ['id_pendaftaran'],
        }
    ]
});

module.exports = pembayaran;