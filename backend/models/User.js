const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            require: true,
            min: 3,
            max: 20,
            unique: true,
        },
        mobilenumber: {
            type: String,
            require: true,
            min: 10,
            max: 10,
            unique: true,
        },
        lastname: {
            type: String,
            require: true,
            min: 3,
            max: 20,
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 6,
        },
    },
);

module.exports = mongoose.model("User", UserSchema);