const user = require('./user');
const event = require('./event');
const pendaftaran = require('./pendaftaran');
const pembayaran = require('./pembayaran');

// Hubungan 1:1 (Peserta ke Pendaftaran)
user.hasOne(pendaftaran, {
    foreignKey: 'id_user',
    onDelete: 'CASCADE' 
});
pendaftaran.belongsTo(user, {
    foreignKey: 'id_user'
});

// Hubungan 1:M (Kegiatan ke Pendaftaran)
event.hasMany(pendaftaran, {
    foreignKey: 'id_event',
    onDelete: 'CASCADE' 
});
pendaftaran.belongsTo(event, {
    foreignKey: 'id_event'
});

// --- 2. Relasi PENDAFTARAN dan PEMBAYARAN (1:1) ---
pendaftaran.hasOne(pembayaran, {
    foreignKey: 'id_pendaftaran',
    onDelete: 'CASCADE'
});
pembayaran.belongsTo(pendaftaran, {
    foreignKey: 'id_pendaftaran'
});

module.exports = {
    user,
    event,
    pendaftaran,
    pembayaran
};
