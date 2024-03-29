// const router = require("express").Router();
const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
//REGISTER


const register = async (req, res) => {
    try {
        //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        //create new user
        const newUser = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            mobilenumber: req.body.mobilenumber,
            password: hashedPassword
        });

        //save user 
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err)
    }
};

//Login
const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.status(404).json("user not found");
            return
        }
        console.log(user)

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        console.log(validPassword)
        if (!validPassword) {
            res.status(400).json("wrong password");
            return
        }
        const token = await jwt.sign(
            { userId: user._id },
            process.env.JWT_KEY,
            { expiresIn: '1h' }
        );
        const authUser = { token: token }
        console.log(authUser);
        return res.status(200).json({
            data: authUser,
            success: true,
        })
    } catch (err) {
        res.status(500).json(err)
    }
};


module.exports = {
    register,
    login
}