const {miladmantsaniDB, DataTypes} = require('../../config/mysql');

const user = miladmantsaniDB.define('user', {
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nama_lengkap: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    nomor_telepon: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    password_hash: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('peserta', 'admin'),
        allowNull: false,
        defaultValue: 'peserta'
    }
}, {
    tableName: 'user'
});

module.exports = user;