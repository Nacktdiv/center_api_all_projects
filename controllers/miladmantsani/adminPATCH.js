const {event, pembayaran, pendaftaran} = require('../../models/miladmantsani/setup');   
const resFormat = require('../../models/miladmantsani/resformat');

const updateEvent = async (res, body) => {
    const { nama_event, deskripsi, biaya_pendaftaran, status_buka, tipe_event } = body;

    try {
        const eventToUpdate = await event.findOne({where: {nama_event: nama_event}});
        const updateData = await eventToUpdate.update({
            deskripsi: deskripsi || eventToUpdate.deskripsi,
            biaya_pendaftaran: biaya_pendaftaran || eventToUpdate.biaya_pendaftaran,
            status_buka: status_buka || eventToUpdate.status_buka,
            tipe_event: tipe_event || eventToUpdate.tipe_event
        });
        resFormat(res, 200, updateData, "DATA EVENT BERHASIL DIPERBARUI");
    } catch (err) {
        resFormat(res, 500, {}, "Error updating event: " + err.message);
    }
}

const updateStatusPendaftaran = async (res, id_pendaftaran) => {
    try {
        const pendaftaranToUpdate = await pendaftaran.findByPk(id_pendaftaran)
        let state = ""
        if (pendaftaranToUpdate.status_verifikasi === "Menunggu"){
            state = "Berhasil"
        } else {
            state = "Menunggu"
        }

        const newPendaftaran = await pendaftaranToUpdate.update({
            status_verifikasi : state
        })
        resFormat(res, 200, newPendaftaran, "DATA STATUS VERIFIKASI PENDAFTARAN BERHASIL DIUBAH")
    } catch (err) {
        resFormat(res, 500, {}, "Error updating pendaftaran: " + err.message);
    }
}
const updateStatusPembayaran = async (res, id_pembayaran) => {
    try {
        const pembayaranToUpdate = await pembayaran.findByPk(id_pembayaran)
        let state = ""
        if (pembayaranToUpdate.status_konfirmasi === "Menunggu"){
            state = "Berhasil"
        } else {
            state = "Menunggu"
        }

        const newPembayaran = await pembayaranToUpdate.update({
            status_konfirmasi : state
        })
        resFormat(res, 200, newPembayaran, "DATA STATUS VERIFIKASI PEMBAYARAN BERHASIL DIUBAH")
    } catch (err) {
        resFormat(res, 500, {}, "Error updating pendaftaran: " + err.message);
    }
}

module.exports = {updateEvent, updateStatusPendaftaran, updateStatusPembayaran};