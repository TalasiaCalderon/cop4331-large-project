const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://ma270662:nWOkmhYD79bIygmR@cop4331incass.pj3qn3w.mongodb.net/LargeProject?retryWrites=true&w=majority&appName=COP4331InCass';
const client = new MongoClient(url);
client.connect();


app.use(cors());
app.use(bodyParser.json());

// const user = require('./backend/user_api.js');
// const math = require('./backend/math_question_api.js');
// const english = require('./backend/english_question_api.js');



// use the api is running
app.get('/api/', (req, res) => {
    res.send('API is running');
});


// users schema: {
// _id (auto-generated string)
// username (string)
// password (string)
// mathQuestionsAnswered (int)
// mathQuestionsCorrect (int)
// englishQuestionsAnswered (int)
// englishQuestionsCorrect (int)
// }

// mathQuestions schema {
// _id (auto-generated string)
// question (string)
// answer (string)
// }

// englishQuestions schema: {
// _id (auto-generated string)
// question (string)
// answer (string)
// }


// confirm the user api is running
app.get('/api/user', (req, res) => {
    res.send('User API');
});

// check if the user exists
// and return the user id
app.get('/api/user/login', (req, res) => {
    var error = '';
    const { username, password } = req.body;
    const db = client.db();
    const results = db.collection('Users').find({ username: username, password: password }).toArray();

    var id = -1;

    if (results.length > 0) {
        id = results[0]._id;
    }
    var ret = { id: id, error: '' };

    res.status(200).json(ret);
});


// get the user question stats
app.get('/api/user/statistics', (req, res) => {
    const { id } = req.body;
    const db = client.db();
    const results = db.collection('Users').find({ _id: id }).toArray();

    var mathQuestionsAnswered = 0;
    var mathQuestionsCorrect = 0;
    var englishQuestionsAnswered = 0;
    var englishQuestionsCorrect = 0;

    if (results.length > 0) {
        mathQuestionsAnswered = results[0].mathQuestionsAnswered;
        mathQuestionsCorrect = results[0].mathQuestionsCorrect;
        englishQuestionsAnswered = results[0].englishQuestionsAnswered;
        englishQuestionsCorrect = results[0].englishQuestionsCorrect;
    }
    var ret = { mathQuestionsAnswered: mathQuestionsAnswered, mathQuestionsCorrect: mathQuestionsCorrect, englishQuestionsAnswered: englishQuestionsAnswered, englishQuestionsCorrect: englishQuestionsCorrect };

    res.status(200).json(ret);
});

// update the user question stats
app.post('/api/user/updateStatistics', (req, res) => {
    var error = '';
    const { id, mathQuestionsAnswered, mathQuestionsCorrect, englishQuestionsAnswered, englishQuestionsCorrect } = req.body;
    const db = client.db();

    try {
        db.collection('Users').updateOne({ _id: id }, { $set: { mathQuestionsAnswered: mathQuestionsAnswered, mathQuestionsCorrect: mathQuestionsCorrect, englishQuestionsAnswered: englishQuestionsAnswered, englishQuestionsCorrect: englishQuestionsCorrect } });
    } catch (e) {
        error = e;
    }

    var ret = { error: error };
    res.status(200).json(ret);
});

// add a new user
app.post('/api/user/addUser', (req, res) => {
    const error = '';
    const { _id, username, password } = req.body;
    const db = client.db();

    try {
        db.collection('Users').insertOne({ _id: _id, username: username, password: password, mathQuestionsAnswered: 0, mathQuestionsCorrect: 0, englishQuestionsAnswered: 0, englishQuestionsCorrect: 0 });
    }
    catch (e) {
        error = e;
    }
    var ret = { error: error };
    res.status(200).json(ret);

});

// deletes a user
app.delete('/api/user/deleteUser', (req, res) => {
    const error = '';
    const { _id } = req.body;
    const db = client.db();

    try {
        db.collection('Users').deleteOne({ _id: _id });
    }
    catch (e) {
        error = e;
    }
    var ret = { error: error };
    res.status(200).json(ret);

});




// confirm the math question api is running
app.get('/api/math', async (req, res) => {
    res.send('Math API');
});

//get a random math question
app.get('/api/math/question ', async (req, res) => {
    const db = client.db();
    const results = await db.collection('MathQuestions').aggregate([{ $sample: { size: 1 } }]).toArray();

    var question = results[0].question;
    var answer = results[0].answer;
    res.status(200).json({ question: question, answer: answer });
});


//get 4 random answers
app.get('/api/math/answers', async (req, res) => {
    const db = client.db();
    const results = await db.collection('MathQuestions').aggregate([{ $sample: { size: 4 } }]).toArray();

    var answers = [];
    for (var i = 0; i < results.length; i++) {
        answers.push(results[i].answer);
    }
    res.status(200).json({ answers: answers });
});





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
    console.log('Server listening on port 5000');
});

