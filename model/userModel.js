const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username required"]
    },
    email: {
        type: String,
        required: [true, "Email required"],
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, "Password required"]
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
}, { timestamps: true });

userSchema.methods.comparePassword = function(enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
