const express = require('express');
const router = express.Router()
const { getAllData, getSingleData, update, deleteData, createNew } = require('../controller/apicallback')

router.get('/data', getAllData)

router.post('/data', createNew)

router.get('/data/:id', getSingleData)

router.put('/data/:id', update)

router.delete('/data/:id', deleteData)



module.exports = router