const {bukutamuDB} = require('../../config/mysql.js');
const {DataTypes} = require('sequelize');

const Survey = bukutamuDB.define('survey', {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false
    }, 
    kategori : {
        type : DataTypes.ENUM,
        values : [
            'Tidak Puas',
            'Cukup Puas',
            'Puas',
            'Sangat Puas'
        ],
        allowNull : false,
    }
}, {
    timestamps : true,
    underscored : true,
    tableName : 'survey'
})

module.exports = Survey;