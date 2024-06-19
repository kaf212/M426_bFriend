const mongoose = require('mongoose');


const historySchema = new mongoose.Schema({
    userID: String,
    price: String,
    name: String
});


const PayHistory = mongoose.model("PayHistory", historySchema, "paymentHistories");

module.exports = PayHistory;
