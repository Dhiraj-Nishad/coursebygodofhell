const express = require("express");
const Key = require("../models/Key");
const { grantAccess, drive } = require("../utils/googleDriveUtils");
const Shortner = require("../models/shortner.js");

const router = express.Router();

router.post("/:id/access-file", async (req, res) => {


    try {
        const { id } = req.params; // Extract the `id` value from req.params
        const { accessKey } = req.cookies; // Get the access key from cookies
        const { email } = req.body; // Get the email from the request body

        if (!accessKey || !email) {
            // return res.status(400).json({ error: "Access key and email are required" });
            return res.render("accesserror.ejs", { errors: "Invalid Access key or email ", imageurl: shortner.imageurl, title: shortner.title, shortid: shortner.shortId });

        }

        // Find the shortened URL using the short ID
        const shortner = await Shortner.findOne({ shortId: id }); // Use `id` as a string
        if (!shortner) {
            return res.status(404).json({ error: "Shortened URL not found" });
        }

        // Find the key details in the database
        const keyDetails = await Key.findOne({ key: accessKey });
        if (!keyDetails) {
            // return res.status(400).json({ error: "Invalid access key" });
            return res.render("accesserror.ejs", { errors: "Invalid access key", imageurl: shortner.imageurl, title: shortner.title, shortid: shortner.shortId });

        }

        if (keyDetails.used) {
            // return res.status(403).json({ error: "Access key has already been used" });
            return res.render("accesserror.ejs", { errors: "Access key has already been used", imageurl: shortner.imageurl, title: shortner.title, shortid: shortner.shortId });
        }

        // Mark the key as used
        keyDetails.used = true;
        await keyDetails.save();

        // Grant access to the user
        await grantAccess(keyDetails.fileId, email);

        // Stream the file to the user
        const response = await drive.files.get(
            { fileId: keyDetails.fileId, alt: "media" },
            { responseType: "stream" }
        );

        res.setHeader("Content-Type", "application/octet-stream");
        // response.data.pipe(res);
        res.redirect(shortner.originalUrl)
    } catch (error) {
        const { accessKey } = req.cookies; // Get the access key from cookies

        const { id } = req.params; // Extract the `id` value from req.params

        const shortner = await Shortner.findOne({ shortId: id });
        if (!accessKey) {
            // return res.status(400).json({ error: "Access key and email are required" });
            return res.render("accesserror.ejs", { errors: "Invalid Access key or email ", imageurl: shortner.imageurl, title: shortner.title, shortid: shortner.shortId });

        }
        // Use `id` as a string
        if (!shortner) {
            return res.status(404).json({ error: "Shortened URL not found" });
        }
        console.error("Error accessing file:", error.message);
        // res.status(500).json({ error: "Failed to access file" });

        res.redirect(shortner.originalUrl)
    }
});

module.exports = router;