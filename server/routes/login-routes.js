const express = require('express');
const Users = require('../models/user-model.js');
const mongo = require("mongodb")
const {json} = require("express");
const router = express.Router();

router.use(express.json())

router.post("/", async (req, res) => {
    const user = await Users.findOne({"username": req.body.username})
    if (!user) {
        res.sendStatus(404)
    } else if (user.password === req.body.password) {
        res.send(user._id).status(200)
    } else {
        res.sendStatus(401)
    }
})


router.post("/register", async (req, res) => {
// Check if the username already exists in the database
    const existingUser = await Users.findOne({ username: req.body.username});
    const existingUserEmail = await Users.findOne({ email: req.body.email});
    if (existingUser) {
        return res.status(409).json({ message: "username taken" });
    }
    else if (existingUserEmail) {
        return res.status(410).json({message: "email taken"})
    }


    // If username does not exist, proceed to insert the new user
    delete req.body._id;
    await Users.insertMany([req.body]); // Change insertMany to insertOne
    return res.status(200).json({ message: "ok" });
});



module.exports = router;