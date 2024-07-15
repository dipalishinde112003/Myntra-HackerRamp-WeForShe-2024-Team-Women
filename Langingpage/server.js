const fs = require('fs');
const csvWriter = require('csv-writer');

// Function to append to CSV
function appendToCSV(response) {
    const csv = csvWriter.createObjectCsvWriter({
        path: 'responses.csv',
        header: [
            {id: 'name', title: 'Name'},
            {id: 'phone', title: 'Phone'},
            {id: 'email', title: 'Email'},
            {id: 'city', title: 'City'},
            {id: 'quizType', title: 'QuizType'},
            {id: 'answers', title: 'Answers'}
        ],
        append: true
    });

    csv.writeRecords([response])
        .then(() => console.log('Response saved to CSV'));
}

app.post('/submitQuiz', (req, res) => {
    const newResponse = new Response(req.body);
    newResponse.save()
        .then(response => {
            appendToCSV(req.body);
            res.status(200).send(response);
        })
        .catch(err => res.status(400).send(err));
});
