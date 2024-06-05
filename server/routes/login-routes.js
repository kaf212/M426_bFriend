const express = require('express');
const Users = require('../models/user-model.js');
const mongo = require("mongodb")
const {json} = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
    const user = await Users.findOne({"username": req.body.username})
    console.log(user)
    console.log(user.password)
    console.log(req.body.password)
    if (user.password === req.body.password) {
        res.sendStatus(200)
    }
    else {
        res.sendStatus(401)
    }
})

router.post("/register", async (req, res) => {
    try {
        delete req.body._id;
        await Users.insertMany([req.body]);
        res.sendStatus(200)
    } catch (err) {
        res.status(500).json({message: err.message});
    }
})

module.exports = router;