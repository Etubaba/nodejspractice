const express = require('express');
const router = express.Router();

const newUser = require('../controller/registercontroller');

router.post('/register', newUser);



module.exports = router;
