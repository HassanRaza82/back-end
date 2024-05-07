const express = require('express');
const router = express.Router();
const { signup } = require('../controler/app');


router.post('/login', signup);

module.exports = router;
