const User = require("../models/User");
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken")
const userFromToken = async (req, res) => {
    try {
        // Extract the token from the Authorization header
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        if (decoded) {
            const userId = decoded.userId;
            console.log(userId)
            // Fetch the user by userId
            const user = await User.findById(userId);
            console.log(user)
            if (!user) {
                res.status(404).json("user not found");
                return
            }
            // Exclude sensitive fields
            // Send the user object without the password and updatedAt fields
            res.status(200).json({
                data: { user },
                success: true
            });
        }
        else {
            res.status.json("can't decode the token")
        }
    } catch (err) {
        res.status(500).json(err);
    }
};
const getUser = async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
        const user = userId ? await User.findById(userId) : await User.findOne({ username });
        if (user) {
            const { password, updatedAt, ...other } = user._doc;
            res.status(200).json(other);
        }
        else {
            res.status(404).json("user not found")
        }
    } catch (err) {
        res.status(500).json(err);
    }
}
const getUserProfile = ('/api/users/:username', async (req, res) => {
    try {
        const user = await User.findOne({ firstname: req.params.username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Optionally, you can remove the password from the response
        const { password, ...userWithoutPassword } = user._doc;
        res.json(userWithoutPassword);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
module.exports = {
    userFromToken,
    getUser,
    getUserProfile
}