const BukuTamu = require('../../models/bukutamu/buku-tamu');
const response = require('../../models/bukutamu/response');

const CreateTamu = async (body, res) => {
    try {
        const tamu = await BukuTamu.create(body);
        res.status(201).json(response(tamu, "Tamu created successfully", 201));
    } catch (err) {
        res.status(500).json(response(null, "Failed to create tamu", 500));
    }
}

module.exports = CreateTamu;