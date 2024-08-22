const User = require("../model/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userRegisterController = async (req, res) => {
  try {
    const { username, email, password, role, answer } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: 'User already exists with this email'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedAnswer = await bcrypt.hash(answer, 10); // Hashing the answer

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
      answer: hashedAnswer
    });

    await newUser.save();

    return res.status(201).send({
      success: true,
      message: 'User registered successfully',
      user: {
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt
      }
    });

  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "Error in Registration API",
      err
    });
  }
}

const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).send({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    return res.status(200).send({
      success: true,
      message: 'User logged in successfully',
      token,
      user: {
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Login API",
      error
    });
  }
}

const userPasswordResetController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: 'User not found'
      });
    }

    // Check if the answer is correct
    const isAnswerValid = await bcrypt.compare(answer, user.answer);
    if (!isAnswerValid) {
      return res.status(400).send({
        success: false,
        message: 'Incorrect answer'
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    return res.status(200).send({
      success: true,
      message: 'Password reset successfully',
    });

  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "Error in Password Reset API",
      error: err
    });
  }
}

module.exports = {
  userRegisterController,
  userLoginController,
  userPasswordResetController
};
