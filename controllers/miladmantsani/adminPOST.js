const {event} = require('../../models/miladmantsani/setup'); 
const resFormat = require('../../models/miladmantsani/resformat');

const uploadEvent = async (res, body) => {
    const { nama_event, deskripsi, biaya_pendaftaran, status_buka, tipe_event } = body;

    if (!nama_event || !deskripsi || !biaya_pendaftaran || !tipe_event) {
        resFormat(res, 400, {}, "NAMA_EVENT, DESKRIPSI_EVENT, DAN BIAYA_PENDAFTARAN WAJIB DIISI");
        console.log('gagal')
        return;
    }

    console.log('berhasil')

    try {
        const newEvent = await event.create({
            nama_event,
            deskripsi,
            biaya_pendaftaran,
            status_buka,
            tipe_event
        })
        resFormat(res, 201, newEvent, "EVENT BERHASIL DIBUAT");
    } catch (err) {
        resFormat(res, 500, {}, "Error creating event: " + err.message);
    }
}

module.exports = uploadEvent;