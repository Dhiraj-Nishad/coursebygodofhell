const express = require("express")
const AdminRouter = express.Router()
const Admin = require("../models/Admin.js")
const { signup, login } = require("../controllers/admin.js")


AdminRouter.post("/admin/signup", signup)
AdminRouter.post("/admin/login", login)
AdminRouter.get("/admin/login", (req, res) => {
    try {
        res.render("adminlogin.ejs")

    } catch (error) {
        res.render("adminlogin.ejs")
    }
})



module.exports = AdminRouter
