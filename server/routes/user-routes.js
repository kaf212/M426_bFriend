const express = require('express');
const Users = require('../models/user-model.js');
const PayHistory = require('../models/paymentHistory-model.js');
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

//ein admin löscht den user
/*router.delete("/:id", async (req, res) => {
    try {
        const result = await Users.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: "Benutzer nicht gefunden" });
        }
        res.json({ message: "Benutzer erfolgreich gelöscht" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});*/

//der user löscht sich selbst
router.delete("/:id", async  (req, res) =>{
    const id = req.params.id;
    console.log(id)
    let successful = false
    //add more tables if exists
    try {
        let result = await Users.deleteOne({
            "_id": id
        });
        if (!result){
            res.status(400).json({message: "User doesn't exist"})
        }
        result = await PayHistory.deleteMany({
            "UserID": id
        })
        if (!result){successful = false}
        if (successful){
            res.json({ message: "Benutzer erfolgreich gelöscht" });
        }else{
            res.json({message: "Etwas ist schiefgelaufen..."})
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({message: err.message})
    }
})

module.exports = router;