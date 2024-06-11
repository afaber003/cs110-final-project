const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const postSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    creationDate: {
        type: Number,
        required: true
    },
    comments: {
        type: Array, // Array<Comment> : check ./models/classes for Comment Schema
        default: []
    },
    likes: {
        type: Array,
        default: []
    },
    description: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    }
})

const postModel = new mongoose.model("Post", postSchema, "Posts")

module.exports = {
    dbPost: postModel
}