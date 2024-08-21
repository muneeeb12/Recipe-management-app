const express = require('express');
const { validateUserRegistration, validateUserLogin } = require('../middleware/validator');
const { registerController, loginController } = require('../controller/authController');

const router = express.Router();

router.post('/register', validateUserRegistration, registerController);

router.post('/login', validateUserLogin, loginController);

module.exports = router;
