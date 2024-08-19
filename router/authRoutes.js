const express = require('express');
const { validateUserRegistration } = require('../middleware/validator');
const { registerController } = require('../controller/authController');

const router = express.Router();

router.get('/register',validateUserRegistration,registerController);

module.exports = router;