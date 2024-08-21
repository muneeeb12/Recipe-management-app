const express = require('express');
const { validateUserRegistration, validateUserLogin, validateUserPasswordReset } = require('../middleware/validator');
const { userRegisterController, userLoginController } = require('../controller/authController');

const router = express.Router();

router.post('/register', validateUserRegistration, userRegisterController);

router.post('/login', validateUserLogin, userLoginController);

router.post('/resetPassword', validateUserPasswordReset,);

module.exports = router;
