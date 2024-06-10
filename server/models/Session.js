const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const sessionSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: "User", index: true, unique: true},
})

const sessionModel = new mongoose.model("Session", sessionSchema, "Sessions")

module.exports = {
    dbSession: sessionModel
}