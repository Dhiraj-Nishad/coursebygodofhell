const express = require("express");
const { v4: uuidv4 } = require("uuid");
const Shortner = require("../models/shortner.js");
const AdminAuth = require("../middleware/AdminAuth.js")

const shortnerRouter = express.Router();


shortnerRouter.post("/shortner", async (req, res) => {
    try {
        const { originalUrl, imageurl, title } = req.body;

        if (!originalUrl) {
            return res.status(400).json({ error: "Original URL is required" });
        }

        // Generate a unique short ID
        const shortId = uuidv4().slice(0, 8); // Use the first 8 characters of UUID
        console.log("Generated Short ID:", shortId);

        // Save the original URL and short ID in the database
        const shortUrl = await Shortner.create({ originalUrl, imageurl, title, shortId });
        console.log("Short URL Object Saved:", shortUrl);

        // Render the shortner.ejs template and pass the short URL
        res.render("shorted.ejs", { shortId: `http://localhost:3000/post/${shortId}` });
    } catch (error) {
        console.error("Error shortening URL:", error.message);
        res.render("shortner.ejs", { shortid: null }); // Pass null if an error occurs
    }
});

// Route to shorten a URL
// shortnerRouter.post("/shortner", async (req, res) => {


//     try {
//         const { originalUrl, imageurl, title } = req.body;

//         if (!originalUrl) {
//             return res.status(400).json({ error: "Original URL is required" });
//         }
//         // Generate a unique short ID
//         const shortId = uuidv4().slice(0, 8); // Use the first 8 characters of UUID
//         console.log(shortId);


//         // Save the original URL and short ID in the database
//         const shortUrl = await Shortner.create({ originalUrl, imageurl, title, shortId });

//         // res.json({
//         //     message: "URL shortened successfully",
//         //     shortUrl: `${req.protocol}://${req.get("host")}/${shortId}`,
//         // });

//         res.render("shortner.ejs", { shortid: `http://localhost:3000/${shortId}` });

//     } catch (error) {
//         console.error("Error shortening URL:", error.message);
//         res.status(500).json({ error: "Failed to shorten URL" });
//     }
// });

// Route to redirect to the original URL
shortnerRouter.get("/post/:shortId", async (req, res) => {


    try {
        const { shortId } = req.params;
        // Find the original URL by short ID
        const shortUrl = await Shortner.findOne({ shortId });

        if (!shortUrl) {
            return res.status(404).json({ error: "Short URL not found" });
        }

        // Redirect to the original URL
        res.render("post.ejs", {
            imageurl: shortUrl.imageurl,
            title: shortUrl.title,
            shortid: shortUrl.shortId,
            url: shortUrl.originalUrl
        });
    } catch (error) {
        console.error("Error redirecting to original URL:", error.message);
        res.status(500).json({ error: "Failed to redirect to original URL" });
    }
});

shortnerRouter.get("/shortner", AdminAuth, async (req, res) => {
    try {

        res.render("shortner.ejs")

    } catch (error) {
        res.send("adminlogin.ejs")
    }
})




module.exports = shortnerRouter;