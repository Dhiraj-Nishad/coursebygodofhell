const { google } = require("googleapis");
const dotenv = require("dotenv").config()

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = "http://localhost:3000";

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// Define the required scopes
const SCOPES = ["https://www.googleapis.com/auth/drive"];

const url = oauth2Client.generateAuthUrl({
    access_type: "offline", // Ensures a refresh token is returned
    scope: SCOPES,
});

console.log("Authorize this app by visiting this URL:", url);

// After visiting the URL, paste the authorization code here
const code = process.env.CODE
oauth2Client.getToken(code, (err, token) => {
    if (err) return console.error("Error retrieving access token", err);
    console.log("Refresh Token:", token.refresh_token);
});