const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const shortnerRouter = require("./routes/shortner");
const AdminRouter = require("./routes/admin");
const cookieparser = require("cookie-parser")
const path = require("path")

const generateKeyRouter = require("./routes/generateKey");
const accessFileRouter = require("./routes/accessFile");

const app = express();
app.use(bodyParser.json());
app.use(cookieparser());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }))

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/coursebygodofhell",);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
    console.log("Connected to MongoDB");
});

// Routes
app.use("/", generateKeyRouter);
app.get("/", (req, res) => {
    res.render("home.ejs")
})
app.use("/", accessFileRouter);
app.use("/", shortnerRouter);
app.use("/", AdminRouter);
app.use((req, res) => {
    res.render("error.ejs")
})

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});