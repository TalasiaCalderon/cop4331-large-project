const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

//const MongoClient = require('mongodb').MongoClient;
//const url = 'mongodb+srv://ma270662:nWOkmhYD79bIygmR@cop4331incass.pj3qn3w.mongodb.net/LargeProject?retryWrites=true&w=majority&appName=COP4331InCass';
//const client = new MongoClient(url);
//client.connect();


app.use(cors());
app.use(bodyParser.json());



// englishQuestions schema: {
// _id (auto-generated string)
// question (string)
// answer (string)
// }


// confirm the english question api is running
app.get('/api/english/', (req, res) => {
res.send('English Question API');
});

// get a random english question
app.get('/api/english/englishQuestion', async (req, res) => {
const db = client.db();
const results = await db.collection('EnglishQuestions').aggregate([{ $sample: { size: 1 } }]).toArray();

var question = results[0].question;
var answer = results[0].answer;
res.status(200).json({ question: question, answer: answer });
});

// get 4 random answers
app.get('/api/english/englishAnswers', async (req, res) => {
const db = client.db();
const results = await db.collection('EnglishQuestions').aggregate([{ $sample: { size: 4 } }]).toArray();

var answers = [];
for (var i = 0; i < results.length; i++) {
answers.push(results[i].answer);
}
res.status(200).json({ answers: answers });
});



app.listen(5000, () => {
console.log('English Question API listening on port 5000');
});
