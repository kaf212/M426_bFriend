const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    location: String,
    birthdate: Date,
    hobbies: Array,
});


const User = mongoose.model("bFriend", userSchema, "users");

module.exports = User;
