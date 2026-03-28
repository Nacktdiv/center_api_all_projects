const {pendaftaran, pembayaran, event, user} = require('../../models/miladmantsani/setup'); 
const resFormat = require('../../models/miladmantsani/resformat');

const createPendaftaran = async (res, id_user, body) => {

    const { id_event,  asal_institusi, nama_tim, nama_pembina, nama_peserta} = body;

    if (!id_user || !id_event || !asal_institusi || !nama_pembina ) {
        resFormat(res, 400, {}, "USER TIDAK DITEMUKAN SERTA ID_EVENT, ASAL_INSTITUSI, NAMA_TIM, NAMA_PEMBINA, DAN NAMA_PESERTA WAJIB DIISI");
        return;
    }

    const kode_unik_tiket = 'TICKET-' + Math.random().toString(36).substr(2, 9).toUpperCase();

    try {
        const data_event = await event.findOne({
            where:{id_event:id_event},
            attributes:["biaya_pendaftaran", "tipe_event"]
        })

        const userData = await user.findOne({
            where:{id_user: id_user},
            attributes:["nama_lengkap", "nomor_telepon"]
        })


        let listPeserta = [{ nama: userData.nama_lengkap, nohp: userData.nomor_telepon }];

        let dataPendaftaran = {
            id_user : id_user,
            id_event,
            asal_institusi,
            nama_pembina,
            kode_unik_tiket,
            jumlah_bayar: data_event ? data_event.biaya_pendaftaran : null
        };

        if (data_event && data_event.tipe_event === "Kelompok") {
            dataPendaftaran.nama_tim = nama_tim;

            if (!nama_tim || !nama_peserta) {
                return resFormat(res, 400, {}, "UNTUK LOMBA TIM, NAMA TIM DAN ANGGOTA WAJIB DIISI");
            }

            const anggotaTambahan = Array.isArray(nama_peserta) ? nama_peserta : [nama_peserta];
            listPeserta = [...listPeserta, ...anggotaTambahan];
        }

        dataPendaftaran.nama_peserta = listPeserta;

        const newPendaftaran = await pendaftaran.create(dataPendaftaran);
        resFormat(res, 201, newPendaftaran, "PENDAFTARAN BERHASIL DIBUAT");
    } catch (err) {
        resFormat(res, 500, {}, "Error creating pendaftaran: " + err.message);
    }
}

const createPembayaran = async (res, file, body) => {
    const { id_pendaftaran, metode_pembayaran} = body;

    try {

        let dataPembayaran = {
            id_pendaftaran, 
            metode_pembayaran 
        };

        if (file) {
            // Jika ada file ada, simpan file nya
            dataPembayaran.bukti_pembayaran = file;
        } else if (metode_pembayaran === 'Cash') {
            // Jika pakai Cash, kosongkan kolom bukti
            dataPembayaran.bukti_pembayaran = null;
        }

        const newPembayaran = await pembayaran.create(dataPembayaran)
        resFormat(res, 201, newPembayaran, "PEMBAYARAN BERHASIL DIBUAT");
    } catch (err) {
        resFormat(res, 500, {}, "Error creating pembayaran: " + err.message);
    }
}

module.exports = {createPendaftaran, createPembayaran}