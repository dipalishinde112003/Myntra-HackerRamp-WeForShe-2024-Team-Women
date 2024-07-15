// Example Node.js file

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { GoogleSpreadsheet } = require('google-spreadsheet');

// Initialize Express
const app = express();
app.use(bodyParser.json());

// Google Sheets credentials
const creds = require('./google-creds.json'); // Replace with your actual credentials file path

// Initialize Google Spreadsheet
const doc = new GoogleSpreadsheet('YOUR_SPREADSHEET_ID'); // Replace with your actual Google Sheet ID

// Middleware to handle user login and data storage
app.post('/submitLogin', async (req, res) => {
    try {
        // Connect to Google Sheets
        await doc.useServiceAccountAuth(creds);
        await doc.loadInfo(); // loads document properties and worksheets

        const sheet = doc.sheetsByIndex[0]; // Assuming the user login data is on the first sheet

        // Extract data from request body
        const { username, password, city } = req.body;

        // Example: Append user login data to Google Sheets
        await sheet.addRow({
            Username: username,
            Password: password, // Note: Storing passwords like this is insecure; use for example only
            City: city,
            LoginTime: new Date().toLocaleString() // Example timestamp
        });

        res.status(200).json({ message: 'User login data stored successfully.' });
    } catch (error) {
        console.error('Error storing user login data:', error);
        res.status(500).json({ error: 'Failed to store user login data.' });
    }
});

// Example endpoint to start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
