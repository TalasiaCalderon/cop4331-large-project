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

// mathQuestions schema {
// _id (auto-generated string)
// question (string)
// answer (string)
// }


// confirm the math question api is running
app.get('/api/math', async (req, res) => {
    res.send('Math API');
});

//get a random math question
app.get('/api/math/question ', async (req, res) => {
    res.send('Math Question API');
const db = client.db();
const results = await db.collection('MathQuestions').aggregate([{ $sample: { size: 1 } }]).toArray();

var question = results[0].question;
var answer = results[0].answer;
res.status(200).json({ question: question, answer: answer });
});


//get 4 random answers
app.get('/api/math/answers', async (req, res) => {
    res.send('Math Answers API');
const db = client.db();
const results = await db.collection('MathQuestions').aggregate([{ $sample: { size: 4 } }]).toArray();

var answers = [];
for (var i = 0; i < results.length; i++) {
answers.push(results[i].answer);
}
res.status(200).json({ answers: answers });
});


app.listen(5000, () => {
console.log('Math Question API listening on port 5000');
});
