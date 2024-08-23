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

const validateUserPasswordReset = [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email address'),
  body('answer')
    .notEmpty()
    .withMessage('Answer is required')
    .isString()
    .withMessage('Answer must be a string'),
]


const validateRecipeSubmission = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isString()
    .withMessage('Title must be a string'),
  body('description')
    .notEmpty()
    .withMessage('Description required')
    .isString()
    .withMessage('Description must be a string'),
  body('instructions')
  .notEmpty()
  .withMessage('Instructions are required')
  .isString()
  .withMessage('Instructions must be an array'),
  body('cookingTime')
  .isInt()
  .withMessage('Cooking time must be an integer'),
  body('servings')
  .isInt()
  .withMessage('Servings must be an integer'),
  body('category')
  .isIn(['breakfast', 'lunch', 'dinner', 'snack'])
  .withMessage('Category must be one of the following: breakfast, lunch, dinner, snack'),
  body('cuisine')
  .isIn(['italian', 'mexican', 'chinese', 'indian'])
  .withMessage('Cuisine must be one of the following'),
  ];

module.exports = {
  validateUserRegistration,
  validateUserLogin,
  validateUserPasswordReset,
  validateRecipeSubmission
};
