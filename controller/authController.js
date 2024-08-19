const User = require("../model/userModel");
const bcrypt = require('bcrypt');

const registerController = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: 'User already exists with this email'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role
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

module.exports = { registerController };
