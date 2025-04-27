const mongoose = require("mongoose")
const Admin = require("../models/Admin")
const jwt = require("jsonwebtoken")



const AdminAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies
        const decode = await jwt.verify(token, process.env.JWT_SECRET)
        const user = await Admin.findById(decode.id)
        if (!user) {
            // res.send("login Again")
            res.redirect("/admin/login")
        }

        req.user = user
        next()


    } catch (error) {
        console.log(error)
        // res.send("Some Error, Login With Admin Again")
        res.redirect("/admin/login")

    }
}


module.exports = AdminAuth