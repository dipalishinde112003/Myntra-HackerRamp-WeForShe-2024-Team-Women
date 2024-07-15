const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/myntra_challenge', { useNewUrlParser: true, useUnifiedTopology: true });

const responseSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    city: String,
    quizType: String,
    answers: Array,
    date: { type: Date, default: Date.now }
});

const Response = mongoose.model('Response', responseSchema);

app.post('/submitQuiz', (req, res) => {
    const newResponse = new Response(req.body);
    newResponse.save()
        .then(response => res.status(200).send(response))
        .catch(err => res.status(400).send(err));
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
