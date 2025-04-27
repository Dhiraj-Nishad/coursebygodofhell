const Admin = require("../models/Admin.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")



const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const users = await Admin.findOne({ username: username })
        if (users) {
            return res.send("User Alredy Register")
        }

        const pass = await bcrypt.hash(password, 10)

        const adduser = await Admin.create({ username, email, password: pass })
        res.json({ message: "Signup Successful", user: adduser })

    } catch (error) {
        console.log(error);
        res.send("invalid Login Try Again")
    }

}
const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await Admin.findOne({ email: email })

        if (!user) {
            return res.send("Invalid Username and password")
        }
        const pass = await bcrypt.compare(password, user.password)

        if (!pass) {
            return res.send("Invalid Username and password")
        }

        const token = await jwt.sign({ id: user._id, email: user.email, username: user.username }, process.env.JWT_SECRET, { expiresIn: "10h" })

        res.cookie("token", token)
        // res.json({ message: "Login SuccessFul", username: user.username })
        res.redirect("/shortner")

    } catch (error) {
        console.log(error);
        res.send("Some Error Login Again ")

    }
}



module.exports = { signup, login }