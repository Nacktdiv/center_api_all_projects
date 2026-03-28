const { miladmantsaniDB, DataTypes } = require('../../config/mysql');

const event = miladmantsaniDB.define('event', {
    id_event: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nama_event: {
        type: DataTypes.STRING(255),
        allowNull: false, 
        unique: true
    },
    deskripsi: {
        type: DataTypes.TEXT
    },
    biaya_pendaftaran: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00
    },
    status_buka: {
        type: DataTypes.ENUM('Buka', 'Tutup'),
        defaultValue: 'Buka'
    },
    tipe_event: {
        type: DataTypes.ENUM('Individual', 'Kelompok'),
    }
}, {
    tableName: 'event',
    timestamps: false
});

module.exports = event;