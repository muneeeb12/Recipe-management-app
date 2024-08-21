const { body, validationResult } = require('express-validator');

const validateUserRegistration = [
  body('username')
    .notEmpty()
    .withMessage('Username is required'),

  body('email')
    .isEmail()
    .withMessage('Please enter a valid email address'),

  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),

  body('role')
    .optional()
    .isIn(['user', 'admin'])
    .withMessage('Invalid role'),

  body('answer')
    .notEmpty()
    .withMessage('Answer is required')
    .isString()
    .withMessage('Answer must be a string'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

const validateUserLogin = [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email address'),

  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
]


module.exports = {
  validateUserRegistration,
  validateUserLogin,
};
