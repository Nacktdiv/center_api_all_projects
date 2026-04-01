const {event, user, pendaftaran, pembayaran} = require('../../models/miladmantsani/setup'); 
const resFormat = require('../../models/miladmantsani/resformat');
const env = require('dotenv').config()

const mengetahuiEvent = async (res, id_user) => {
    try {
        const eventData = await event.findAll();
        const userData = await user.findOne({
            include:[{
                model: pendaftaran,
                include:[{
                    model:pembayaran
                }]
            }],
            where:{id_user:id_user}})
        resFormat(res, 200, [eventData,userData], "DATA PESERTA BERHASIL DIAMBIL");
    } catch (err) {
        resFormat(res, 500, {}, "Error fetching peserta data: " + err.message);
    }
}

const memintaBuktiPembayaran = async (res, id_user) => {
    try {
        const fileData = await pembayaran.findOne({
            include:{
                model:pendaftaran,
                required:true,
                include: {
                    model:user,
                    required:true,
                    where:{id_user:id_user}
                }
            }
        })
        const folderPath = process.env.RECEIPT_PATH
        const filePath = path.join(folderPath, fileData.buktipembayaran)

        res.sendFile(filePath)
    } catch (err) {
        res.status(403).send(err)
    }
}

module.exports = {mengetahuiEvent, memintaBuktiPembayaran}