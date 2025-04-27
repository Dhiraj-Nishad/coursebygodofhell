
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { google } = require("googleapis");
const Key = require("../models/Key");
const Shortner = require("../models/shortner.js");

const generateKeyRouter = express.Router();

// Google API Configuration
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

if (!CLIENT_ID || !CLIENT_SECRET || !REDIRECT_URI || !REFRESH_TOKEN) {
    console.error("Missing required environment variables. Please check your .env file.");
    process.exit(1);
}
const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
    version: "v3",
    auth: oauth2Client,
    scopes: ["https://www.googleapis.com/auth/drive"]
});

// Function to extract folder ID
function extractFileId(driveLink) {
    if (!driveLink) return null;

    // Match folder ID in folder links
    const folderMatch = driveLink.match(/\/folders\/([a-zA-Z0-9_-]+)/);
    if (folderMatch) {
        return folderMatch[1]; // Return folder ID
    }

    return null; // Return null if no match is found
}

// Function to grant access to a folder
async function grantAccess(folderId, email) {
    try {
        await drive.permissions.create({
            fileId: folderId,
            requestBody: {
                role: "reader", // Role can be 'reader', 'commenter', or 'writer'
                type: "user",   // Type can be 'user', 'group', 'domain', or 'anyone'
                emailAddress: email, // Email of the user to grant access
            },
        });
        console.log("Access granted successfully!");
    } catch (error) {
        console.error("Error granting access:", error.message);
        throw new Error("Failed to grant access");
    }
}
module.exports = { extractFileId, grantAccess, drive };


















// const { google } = require("googleapis");

// const CLIENT_ID = process.env.CLIENT_ID;
// const CLIENT_SECRET = process.env.CLIENT_SECRET;
// const REDIRECT_URI = process.env.REDIRECT_URI;
// const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

// if (!CLIENT_ID || !CLIENT_SECRET || !REDIRECT_URI || !REFRESH_TOKEN) {
//     console.error("Missing required environment variables. Please check your .env file.");
//     process.exit(1);
// }

// const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
// oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// const drive = google.drive({ version: "v3", auth: oauth2Client });

// function extractFileId(driveLink) {
//     const match = driveLink.match(/\/d\/([a-zA-Z0-9_-]+)/);
//     return match ? match[1] : null;
    
// }

// async function grantAccess(fileId, email) {
//     try {
//         await drive.permissions.create({
//             fileId: fileId,
//             requestBody: {
//                 role: "reader", // Role can be 'reader', 'commenter', or 'writer'
//                 type: "user",   // Type can be 'user', 'group', 'domain', or 'anyone'
//                 emailAddress: email, // Email of the user to grant access
//             },
//         });
//         console.log("Access granted successfully!");
//     } catch (error) {
//         console.error("Error granting access:", error.message);
//         throw new Error("Failed to grant access");
//     }
// }

// module.exports = { extractFileId, grantAccess, drive };