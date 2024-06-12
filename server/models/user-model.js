const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    isBanned: { type: Boolean, default: false }
});


const User = mongoose.model("bFriend", userSchema, "users");

module.exports = User;
