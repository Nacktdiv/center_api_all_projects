const {user, pendaftaran, pembayaran} = require('../../models/miladmantsani/setup'); 
const resFormat = require('../../models/miladmantsani/resformat');
const fs = require('fs')

const updatePeserta = async (res, id, body) => {
    const { nama_lengkap, nomor_telepon } = body;

    try {
        const pesertaToUpdate = await user.findByPk(id);
        const updateData = await pesertaToUpdate.update({
            nama_lengkap: nama_lengkap || pesertaToUpdate.nama_lengkap,
            nomor_telepon: nomor_telepon || pesertaToUpdate.nomor_telepon,
        });
        resFormat(res, 200, updateData, "DATA PESERTA BERHASIL DIPERBARUI");
    } catch (err) {
        resFormat(res, 500, {}, "Error updating peserta: " + err.message);
    }
}

const updatePendaftaran = async (res, id_user, body) => {
    const { id_event, asal_institusi, nama_tim, nama_pembina, nama_peserta} = body;

    try {
        const pendaftaranToUpdate = await pendaftaran.findOne({where: {id_user: id_user, id_event: id_event}});

        if (pendaftaranToUpdate.status_verifikasi === "Berhasil") {
            resFormat(res, 400, {}, "PENDAFTARAN SUDAH DIVERIFIKASI, TIDAK DAPAT DIPERBARUI");
            return;
        }

        const newPendaftaran = await pendaftaranToUpdate.update({
            asal_institusi,
            nama_tim,
            nama_pembina,
            nama_peserta
        })
        resFormat(res, 201, newPendaftaran, "PERUBAHAN PENDAFTARAN BERHASIL DIBUAT");
    } catch (err) {
        resFormat(res, 500, {}, "Error updating pendaftaran: " + err.message);
    }
}

const updatePembayaran = async (res, file, body) => {
    const {metode_pembayaran, id_pembayaran} = body;

    try {
        const pembayaranToUpdate = await pembayaran.findByPk(id_pembayaran)

        if (!pembayaranToUpdate) {
            return resFormat(res, 404, {}, "DATA PEMBAYARAN TIDAK DITEMUKAN");
        }

        if(pembayaranToUpdate.bukti_pembayaran && (file || metode_pembayaran === 'Cash')) {
            const filepath = `./public/${pembayaranToUpdate.bukti_pembayaran}`
            if (fs.existsSync(filepath)) {
                try {
                    fs.unlinkSync(filepath);
                } catch (e) {
                    console.log("Gagal hapus file, tapi lanjut update DB:", e.message);
                }
            }
        }
        
        let dataPembayaran = { 
            metode_pembayaran 
        };

        if (file && metode_pembayaran === 'Transfer') {
            // Jika ada file baru, simpan nama filenya
            dataPembayaran.bukti_pembayaran = file;
        } else if (metode_pembayaran === 'Cash') {
            // Jika pindah ke Cash, kosongkan kolom bukti
            dataPembayaran.bukti_pembayaran = null;
        } else {
            // Jika Transfer tapi tidak kirim file baru, 
            // tetap gunakan bukti_pembayaran yang lama (jangan di-null-kan)
            dataPembayaran.bukti_pembayaran = pembayaranToUpdate.bukti_pembayaran;
        }

        const newPembayaran = await pembayaranToUpdate.update(dataPembayaran)

        resFormat(res, 200, newPembayaran, "PERUBAHAN PEMBAYARAN BERHASIL DIBUAT")
    } catch (err) {
        resFormat(res, 500, {}, "Error updating pembayaran: " + err.message);
    }
}
module.exports = {updatePeserta, updatePendaftaran, updatePembayaran};
