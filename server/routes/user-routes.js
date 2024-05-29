const express = require('express');
const Users = require('../models/user-model.js');
const mongo = require("mongodb")
const {json} = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const users = await Users.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
})

router.get("/:id", async (req, res)=>{
    try {
        const user = await Users.findOne({"_id": new mongo.ObjectId(req.params.id)});
        res.json(user);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
})

router.post("/", async (req, res) => {
    try {
        delete req.body._id;
        await Users.insertMany([req.body]);
        res.sendStatus(200)
    } catch (err) {
        res.status(500).json({message: err.message});
    }
})


router.put("/", async (req, res) => {
    try {
        // Delete the original document by ID
        await Users.findByIdAndDelete(req.body._id);

        // Insert the updated document
        await Users.insertMany([req.body]);

        res.sendStatus(200);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;