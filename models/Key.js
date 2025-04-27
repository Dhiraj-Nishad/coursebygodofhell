const mongoose = require("mongoose");

const keySchema = new mongoose.Schema({
    key: String,
    // userId: String,
    fileId: String,
    used: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Key", keySchema);