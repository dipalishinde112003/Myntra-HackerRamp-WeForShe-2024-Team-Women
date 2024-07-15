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

// Middleware to handle quiz submissions
app.post('/submitQuiz', async (req, res) => {
    try {
        // Connect to Google Sheets
        await doc.useServiceAccountAuth(creds);
        await doc.loadInfo(); // loads document properties and worksheets

        const sheet = doc.sheetsByIndex[0]; // Assuming the quiz responses are on the first sheet

        // Extract data from request body
        const { userId, quizId, responses } = req.body;

        // Example: Append responses to Google Sheets
        await sheet.addRow({
            User_ID: userId,
            Quiz_ID: quizId,
            Responses: responses,
            Timestamp: new Date().toLocaleString() // Example timestamp
        });

        res.status(200).json({ message: 'Quiz responses stored successfully.' });
    } catch (error) {
        console.error('Error storing quiz responses:', error);
        res.status(500).json({ error: 'Failed to store quiz responses.' });
    }
});

// Example endpoint to start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
