const mongoose = require("mongoose");
const {Schema} = require("mongoose");



const userSchema = new Schema({
    userName: {
        required: true,
        type: String,
        index: true
    },
    password: {
        required: true,
        type: String,
    },
    firstName: {
        required: true,
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        required: true,
        type: String,
    },
    creationDate: {
        type: Number,
        required: true
    },
    permissionLevel: {
        type: String,
        required: true,
        default: 'user'
    },
    bio: {
        type: String,
        required: false,
        default: ""
    }
})

const userModel = new mongoose.model("User", userSchema, "Users")

module.exports = {
    dbUser: userModel
}