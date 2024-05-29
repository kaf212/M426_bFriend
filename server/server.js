const express = require("express");
const server = express();
const {connect} = require("mongoose");
const Users = require('./models/user-model.js');

const cors = require("cors")

server.use(cors({
    origin: "http://localhost:63342",
}));

server.use(express.json())

connect("mongodb://127.0.0.1:27017/bFriend", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('MongoDB connected');
        return insertTestdata(); // Ensure test data is inserted only after successful connection
    })
    .catch(err => console.log(err));

async function insertTestdata() {
    // insert testdata into DB
    await Users.insertMany([
        {
            username: "Test",
            email: "test@email.com",
            password: "asdfasdf"
        }
    ]);
}

insertTestdata()

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});