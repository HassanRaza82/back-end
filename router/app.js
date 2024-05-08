// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controler/app');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/send-reset-link',authController.sendResetLink);
router.post('/reset-password',authController.resetPassword);


module.exports = router;
