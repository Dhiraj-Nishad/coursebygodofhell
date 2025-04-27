const mongoose = require("mongoose");

const shortnerSchema = new mongoose.Schema({

    originalUrl: { type: String, required: true },
    shortId: { type: String, required: true, unique: true },
    imageurl: { type: String },
    title: { type: String },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Shortner", shortnerSchema);