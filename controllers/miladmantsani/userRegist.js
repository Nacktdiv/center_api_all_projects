const {user} = require('../../models/miladmantsani/setup'); 
const resFormat = require('../../models/miladmantsani/resformat');
const bcrypt = require('bcryptjs');

const createUser = async (res, body) => {
    const { email, password, nama_lengkap, nomor_telepon} = body;

    if (!email || !password || !nama_lengkap || !nomor_telepon) {
        resFormat(res, 400, {}, "EMAIL, PASSWORD, NAMA_LENGKAP, DAN NOMOR_TELEPON WAJIB DIISI");
        return;
    }

    let password_hash = await bcrypt.hash(password,10)

    try {

        const newUser = await user.create({
            nama_lengkap,
            email,
            nomor_telepon,
            password_hash,
            role : "peserta"
        })


        const dataKirim = {
            nama_lengkap : newUser.nama_lengkap,
            email : newUser.email,
        }

        resFormat(res, 201, dataKirim, "USER BERHASIL DIBUAT");
        
    } catch (err) {
        if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
            const detailError = err.errors.map(e => ({
                field: e.path,
                reason: e.message
            }))
            resFormat(res, 500, {}, "Error creating user: " + detailError?.[0]?.reason);
            return
        }
        resFormat(res, 500, {}, "Error creating user: " + err.message);
    }
}

module.exports = createUser;