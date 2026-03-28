const resFormat = require('../../models/miladmantsani/resformat');
const {event} = require('../../models/miladmantsani/setup');

const menghapusEvent = async (res, body) => {
    const {nama_event} = body
    try {
        const hasil = await event.destroy({where : {nama_event : nama_event}})
        resFormat(res, 200, hasil, "EVENT BERHASIL DIHAPUS" )
    } catch (err) {
        resFormat(res, 500, {}, "Error deleting event: " + err.message);
    }
}

module.exports = menghapusEvent