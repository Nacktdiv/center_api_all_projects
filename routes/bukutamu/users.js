const express = require('express')
const router = express.Router()

const CreateSurvey = require('../../controllers/bukutamu/createSurvey')
const CreateTamu = require('../../controllers/bukutamu/createTamu')
const GetSurvey = require('../../controllers/bukutamu/getSurvey')

router.post('/tamu', async (req, res) => {
    await CreateTamu(req.body, res)
})

router.post('/survey', async (req, res) => {
    await CreateSurvey(req.body, res)
})

router.get('/survey', async (req, res) => {
    await GetSurvey(req, res)
})

module.exports = router
