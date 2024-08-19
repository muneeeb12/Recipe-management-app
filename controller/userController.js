const User  = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getusercontroller = async(req,res) => {
    try {
        const user = await User.find();
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        user.password = undefined;
        return res.status(200).send({
            success: true,
            message: "User found",
            user,
            });
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error Occured"
        });
    }
}


const updateUser = async(req,res) => {
    try {
        const id = req.params.id;
        const user = await User.findOne(id);
        if(!user){
            return res.status(500).send({
                success: false,
                message: "User not found",
                });
            }
            const{username,email} = req.body;
            if(username) user.username = username;
            if(email) user.email = email;
            await user.save();
            return res.status(200).send({
                success: true,
                message: "User updated",
                user
                });
            
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message: "Error Occured",
            error
        });

        
    }
}

const updatepassword = async(req,res) => {
    try {
        const user = await User.findById({ _id: req.body.id });
        if (!user) {
            return res.status(404).send({
                success:false,
                message: "User not found"
                })
        }
        const { oldpassword, newpassword } = req.body;
        const isValidPassword = await bcrypt.compare(oldpassword, user.password);
        if (!isValidPassword) {
            return res.status(401).send({
                success: false,
                message: "Invalid old password"
            });
        }

        user.password = await bcrypt.hash(newpassword, 10);
        await user.save();
        return res.status(200).send({
            success: true,
            message: "Password updated",
            user
            });
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message: "Error Occured",
            error
        })        
    }
}

module.exports = {
    getusercontroller,
    updateUser,
    updatepassword
}