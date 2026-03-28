const {event, user, pendaftaran, pembayaran} = require('../../models/miladmantsani/setup'); 
const resFormat = require('../../models/miladmantsani/resformat');
const { Op } = require('sequelize');

const mencariEvent = async (res, query) => {

    const searchQuery = query ? query.toLowerCase() : ""

    const whereQuery = searchQuery ? {
        nama_event : {
                [Op.like]: `%${searchQuery}%` // Mencari string 'query' di mana saja (%)
            }
    } : ""

    
    try {
        const eventData = await event.findAll({
            include:[{
                model:pendaftaran,
                include:[{
                    model:pembayaran
                }]
            }],
            where:whereQuery
        });
        
        resFormat(res, 200, eventData, "DATA EVENT BERHASIL DIAMBIL");
    } catch (err) {
        resFormat(res, 500, {}, "Error fetching event data: " + err.message);
    }
}

module.exports = mencariEvent