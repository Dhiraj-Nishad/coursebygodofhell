const express = require("express");
const { v4: uuidv4 } = require("uuid");
const Key = require("../models/Key");
const { extractFileId } = require("../utils/googleDriveUtils");
const Shortner = require("../models/shortner.js");

const generateKeyRouter = express.Router();

// router.get("/:id/generate-key", async (req, res) => {

//     try {
//         const id = req.params.id; // Get the short ID from the URL
//         console.log("Drive Link (shortId):", id);
//         // Find the original URL using the short ID
//         const shortner = await Shortner.findOne({ shortId: id });
//         console.log(shortner.originalUrl)
//         if (!shortner) {
//             return res.status(404).json({ error: "Shortened URL not found" });
//         }

//         const fileId = extractFileId(shortner.originalUrl); // Extract the file ID from the original URL
//         if (!fileId) {
//             return res.status(400).json({ error: "Invalid Google Drive link" });
//         }
//         console.log("Original URL:", shortner.originalUrl);


//         const key = uuidv4(); // Generate a unique key
//         await Key.create({ key, fileId }); // Store the key and file ID in MongoDB

//         // Save the key in a cookie
//         res.cookie("accessKey", key, {
//             httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
//             secure: process.env.NODE_ENV === "production", // Use secure cookies in production
//             maxAge: 24 * 60 * 60 * 1000, // Cookie expires in 1 day
//         });

//         // res.render("access.ejs", {
//         //     imageurl: shortner.imageurl,
//         //     title: shortner.title,
//         //     shortid: shortner.shortId
//         // });
//         res.redirect(`http://localhost:3000/post/${shortner.shortId}`)
//         // res.send(key)
//     } catch (error) {
//         console.error("Error generating key:", error.message);
//         res.status(500).json({ error: "Failed to generate key" });
//     }
// });



// generateKeyRouter.get("/:id/generate-key", async (req, res) => {
//     try {
//         const id = req.params.id; // Get the short ID from the URL
//         console.log("Drive Link (shortId):", id);

//         // Find the original URL using the short ID
//         const shortner = await Shortner.findOne({ shortId: id });
//         if (!shortner) {
//             return res.status(404).json({ error: "Shortened URL not found" });
//         }

//         console.log("Original URL:", shortner.originalUrl);

//         // Extract the file ID from the original URL
//         const fileId = extractFileId(shortner.originalUrl);
//         if (!fileId) {
//             return res.status(400).json({ error: "Invalid Google Drive link" });
//         }

//         console.log("Extracted File ID:", fileId);

//         // Generate a unique key
//         const key = uuidv4();
//         await Key.create({ key, fileId }); // Store the key and file ID in MongoDB

//         console.log("Generated Key:", key);

//         // Save the key in a cookie
//         res.cookie("accessKey", key, {
//             httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
//             secure: process.env.NODE_ENV === "production", // Use secure cookies in production
//             maxAge: 24 * 60 * 60 * 1000, // Cookie expires in 1 day
//         });

//         // Redirect to the original URL or another page
//         res.redirect(`http://localhost:3000/post/${shortner.shortId}`)
//     } catch (error) {
//         console.error("Error generating key:", error.message);
//         res.status(500).json({ error: "Failed to generate key" });
//     }
// });

generateKeyRouter.get("/:id/generate-key", async (req, res) => {
    try {
        const id = req.params.id; // Get the short ID from the URL
        console.log("Drive Link (shortId):", id);

        // Find the original URL using the short ID
        const shortner = await Shortner.findOne({ shortId: id });
        if (!shortner) {
            return res.status(404).json({ error: "Shortened URL not found" });
        }

        console.log("Original URL:", shortner.originalUrl);

        // Extract the file or folder ID from the original URL
        const fileId = extractFileId(shortner.originalUrl);
        if (!fileId) {
            return res.status(400).json({ error: "Invalid Google Drive link" });
        }

        console.log("Extracted File/Folder ID:", fileId);

        // Generate a unique key
        const key = uuidv4();
        await Key.create({ key, fileId }); // Store the key and file ID in MongoDB

        console.log("Generated Key:", key);

        // Save the key in a cookie
        res.cookie("accessKey", key, {
            httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            maxAge: 24 * 60 * 60 * 1000, // Cookie expires in 1 day
        });

        // Redirect to the original URL or another page
        res.redirect(`http://localhost:3000/post/${shortner.shortId}`);
    } catch (error) {
        console.error("Error generating key:", error.message);
        res.status(500).json({ error: "Failed to generate key" });
    }
});

module.exports = generateKeyRouter;