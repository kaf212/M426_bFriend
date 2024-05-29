const express = require("express");
const server = express();
const {connect} = require("mongoose");
const cors = require("cors")

server.use(cors({
    origin: "http://localhost:63342",
}));

server.use(express.json())

connect("mongodb://27017", {
    useNewUrlParser: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});