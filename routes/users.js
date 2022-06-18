const express = require('express');
const router = express.Router()
const { getAllUsers, getSingleUser } = require('../controller/userList')




router.get('/user', getAllUsers)
router.get('/user/:id', getSingleUser)

module.exports = router