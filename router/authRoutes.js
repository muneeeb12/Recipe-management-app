const express = require('express');
const { validateUserRegistration } = require('../middleware/validator');
const { registerController, loginController } = require('../controller/authController');

const router = express.Router();

router.post('/register', validateUserRegistration, registerController);

router.post('/login',loginController)

module.exports = router;
