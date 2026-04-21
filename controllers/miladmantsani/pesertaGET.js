const {event, user, pendaftaran, pembayaran} = require('../../models/miladmantsani/setup'); 
const resFormat = require('../../models/miladmantsani/resformat');
const env = require('dotenv').config()
const fs = require('fs')
const path = require('path');
const { parse } = require('path');

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

            if( userData.pendaftaran != null && typeof userData.pendaftaran.nama_peserta === "string") {
                userData.pendaftaran.nama_peserta = JSON.parse(userData.pendaftaran.nama_peserta);
            }

        resFormat(res, 200, [eventData,userData], "DATA PESERTA BERHASIL DIAMBIL");
    } catch (err) {
        resFormat(res, 500, {}, "Error fetching peserta data: " + err.message);
    }
}

const memintaBuktiPembayaran = async (res, id_user) => {
    try {
        const fileData = await pembayaran.findOne({
            include:[{
                model:pendaftaran,
                required:true,
                where:{id_user:id_user}
            }]
        })

        const folderPath = process.env.RECEIPT_PATH
        const filePath = path.join(folderPath, fileData?.bukti_pembayaran)


        res.sendFile(path.resolve(filePath), (err) => {
            if (err) {
                // Jika file fisik tidak ada di folder, kirim status error
                if (!res.headersSent) {
                    res.status(404).send("File fisik tidak ditemukan di server.");
                }
            }
        });
    } catch (err) {
        res.status(403).send("BUKTI PEMBAYARAN TIDAK DITEMUKAN", err);
    }
}

module.exports = {mengetahuiEvent, memintaBuktiPembayaran}