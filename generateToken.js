const { google } = require("googleapis");

const CLIENT_ID = "841273180638-dc30p3onqnosbojc889e1kmapiija9l3.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
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
const code = "4/0Ab_5qlnH06wB5LMjaLAJTEo_CJZd8MjnF_aHiTuA-uv2xLbCmvnvRCA6naGSBgrHjcssqw";

oauth2Client.getToken(code, (err, token) => {
    if (err) return console.error("Error retrieving access token", err);
    console.log("Refresh Token:", token.refresh_token);
});