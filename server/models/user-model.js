const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});


const User = mongoose.model("bFriend", userSchema, "users");

module.exports = User;
