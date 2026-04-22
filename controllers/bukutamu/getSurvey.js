const Survey = require('../../models/bukutamu/survey');
const response = require('../../models/bukutamu/response');
const {fn, col} = require('sequelize');

const GetSurvey = async (req, res) => {
    try {
        const data = await Survey.findAll({
            attributes: [
                'kategori',
                [fn('COUNT', col('kategori')), 'value']
            ],
            group: ['kategori']
        });
        const hasil = data.map(item => ({
            name: item.kategori,
            value: Number(item.getDataValue('value'))
        }));
        res.status(200).json(response(hasil, "Survey retrieved successfully", 200));
    } catch (err) {
        res.status(500).json(response(null, "Failed to retrieve survey", 500));
    }
}

module.exports = GetSurvey;