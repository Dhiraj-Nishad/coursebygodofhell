const mongoose = require("mongoose")


const AdminSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String },
}, { timestamps: true })

const Admin = mongoose.model("Admin", AdminSchema)

module.exports = Admin