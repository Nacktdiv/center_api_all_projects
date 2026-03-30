const app = require('express')()
const cors = require('cors')

app.use(cors())

app.get('/', (req, res) => {
    res.send('Berhasil Tampil')
})

app.listen('3000', () => {
    console.log("Server Berhasil di inisiasi")
})