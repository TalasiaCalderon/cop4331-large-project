const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { ObjectId } = require('mongodb');
const app = express();

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://ma270662:nWOkmhYD79bIygmR@cop4331incass.pj3qn3w.mongodb.net/LargeProject?retryWrites=true&w=majority&appName=COP4331InCass';
const client = new MongoClient(url);
client.connect((err) => {
    if (err) {
        console.error('Failed to connect to the database:', err);
    } else {
        console.log('Successfully connected to the database');
    }
});


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
// qid (int 32)
// question (string)
// answer (string)
// }

// englishQuestions schema: {
// _Id (auto-generated string)
// wordId (int 32)
// word (string)
// definition (string)
// }




// confirm the user api is running
app.get('/api/user', (req, res) => {
    res.send('User API');
});

// check if the user exists
// and return the user id

//************ BELOW IS THE REAL LOGIN API CALL *******************

app.get('/api/user/login',async (req, res) => {
    console.log('Login API');
    var error = '';
    const { username, password } = req.body;
    const db = client.db('LargeProject');
    const results = await db.collection('users').find({ "username": username, "password": password }).toArray();

    var id = -1;
    var mathQuestionsAnswered = 0;
    var mathQuestionsCorrect = 0;
    var englishQuestionsAnswered = 0;
    var englishQuestionsCorrect = 0;

    if (results.length > 0) {
        console.log('User Found');
        id = results[0]._id;
        mathQuestionsAnswered = results[0].mathQuestionsAnswered;
        mathQuestionsCorrect = results[0].mathQuestionsAnswered;
        englishQuestionsAnswered = results[0].mathQuestionsAnswered;
        englishQuestionsCorrect = results[0].mathQuestionsAnswered;
    } else {
        console.log('User Not Found');
        error = 'User not found';
    }
    var ret = { id: id, mathQuestionsAnswered: mathQuestionsAnswered, mathQuestionsCorrect: mathQuestionsCorrect, englishQuestionsAnswered: englishQuestionsAnswered, englishQuestionsCorrect: englishQuestionsCorrect, error: '' };

    res.status(200).json(ret);
});



// get the user question stats
app.get('/api/user/statistics', async (req, res) => {
    console.log('Get User Statistics API');
    const { id } = req.body; // Extract the id from the request body
    const db = client.db("LargeProject");

    try {
        // Convert the id to an ObjectId
        const objectId = new ObjectId(id);

        // Query the database using the ObjectId
        const results = await db.collection('users').find({ _id: objectId }).toArray();

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

        var ret = {
            mathQuestionsAnswered: mathQuestionsAnswered,
            mathQuestionsCorrect: mathQuestionsCorrect,
            englishQuestionsAnswered: englishQuestionsAnswered,
            englishQuestionsCorrect: englishQuestionsCorrect
        };

        res.status(200).json(ret);
    } catch (error) {
        console.error('Error fetching user statistics:', error);
        res.status(500).json({ error: 'Failed to fetch user statistics' });
    }
});

// update the user question stats
app.post('/api/user/updateStatistics', async (req, res) => {
    console.log('Update User Statistics API');
    var error = '';
    const { id, mathQuestionsAnswered, mathQuestionsCorrect, englishQuestionsAnswered, englishQuestionsCorrect } = req.body;
    const db = client.db('LargeProject');

    try {
        // Convert the id to an ObjectId
        const objectId = new ObjectId(id);

        // Update the user's statistics in the database
        await db.collection('users').updateOne(
            { _id: objectId }, // Use the ObjectId for the query
            {
                $set: {
                    mathQuestionsAnswered: mathQuestionsAnswered,
                    mathQuestionsCorrect: mathQuestionsCorrect,
                    englishQuestionsAnswered: englishQuestionsAnswered,
                    englishQuestionsCorrect: englishQuestionsCorrect
                }
            }
        );
    } catch (e) {
        console.error('Error updating user statistics:', e);
        error = e.message;
    }

    var ret = { error: error };
    res.status(200).json(ret);
});

// add a new user
app.post('/api/user/addUser', async (req, res) => {
    console.log('Add User API');
    const error = '';
    const { username, password } = req.body;
    const db = client.db('LargeProject');

    try {
        await db.collection('users').insertOne({ username: username, password: password, mathQuestionsAnswered: 0, mathQuestionsCorrect: 0, englishQuestionsAnswered: 0, englishQuestionsCorrect: 0 });
    }
    catch (e) {
        error = e;
    }
    var ret = { error: error };
    res.status(200).json(ret);

});

// deletes a user
app.delete('/api/user/deleteUser', async (req, res) => {
    console.log('Delete User API');
    let error = '';
    const { id } = req.body;
    const db = client.db('LargeProject');

    try {
        const objectId = new ObjectId(id);

        const result = await db.collection('users').deleteOne({ _id: objectId });
            
        if (result.deletedCount === 0) {
            error = 'User not found';
        }
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
app.get('/api/math/question', async (req, res) => {
    console.log('Math Question API');
    const db = client.db('LargeProject');
    const results = await db.collection('mathQuestions').aggregate([{ $sample: { size: 1 } }]).toArray();


    var question = 'No Question Found';
    var answer = 'No Answer Found';
    if (results.length > 0) {
        question = results[0].question;
        answer = results[0].answer;
    }
    res.status(200).json({ "question": question, "answer": answer });
});


//get 4 random answers
app.get('/api/math/answers', async (req, res) => {
    console.log('Math Answers API');
    const db = client.db('LargeProject');
    const results = await db.collection('mathQuestions').aggregate([{ $sample: { size: 3 } }]).toArray();

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
app.get('/api/english/question', async (req, res) => {
    console.log('English Question API');
    const db = client.db('LargeProject');
    const results = await db.collection('englishQuestions').aggregate([{ $sample: { size: 1 } }]).toArray();

    var question = 'No Question Found';
    var answer = 'No Answer Found';
    if (results.length > 0) {
        question = results[0].word;
        answer = results[0].definition;
    }
    res.status(200).json({ word: question, definition: answer });
});

// get 3 random answers
app.get('/api/english/answers', async (req, res) => {
    console.log('English Answers API');
    const db = client.db('LargeProject');
    const results = await db.collection('englishQuestions').aggregate([{ $sample: { size: 3 } }]).toArray();

    var answers = [];
    for (var i = 0; i < results.length; i++) {
        answers.push(results[i].definition);
    }
    res.status(200).json({ answers: answers });
});



app.listen(5000, () => {
    console.log('Server listening on port 5000');
});

