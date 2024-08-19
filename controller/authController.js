const User = require("../model/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

const loginController = async (req,res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if(!email || !password){
            return res.status(500).send({
                success:false,
                message:"please provide all fields"
                })
        }

        if(!user){
            return res.status(400).send({
                success: false,
                message: 'Invalid email or password'
            });
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if(!isValidPassword){
            return res.status(400).send({
                success:false,
                message: 'Invalid email or password'
                });
            }
            const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY,
                {
                    expiresIn: '7d',
                });
            return res.status(200).send({
                success: true,
                message: 'User logged in successfully',
                token,
                user     
            })

        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in Login API",
            error
        })
        
    }
}

module.exports = { 
    registerController ,
    loginController,

};
