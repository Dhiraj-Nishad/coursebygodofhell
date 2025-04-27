const mongoose = require("mongoose")


const coursesSchema = new mongoose.Schema({
    drivelink: { type: String, required: true },
    key: { type: mongoose.Schema.Types.ObjectId }

})

const courses = mongoose.model("courses", coursesSchema)


module.exports = courses