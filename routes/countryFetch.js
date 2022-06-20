const express = require('express');
const router = express.Router()

const getAllCountries= require('../controller/countryController')

router.get('/country', getAllCountries)


module.exports = router