const express = require('express');
const cors = require('cors');
const { ObjectId } = require('mongodb');
const app = express();

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://ma270662:nWOkmhYD79bIygmR@cop4331incass.pj3qn3w.mongodb.net/LargeProject?retryWrites=true&w=majority&appName=COP4331InCass';
const client = new MongoClient(url);

// Fix: Use async/await for consistent connection handling
async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Successfully connected to the database');
  } catch (err) {
    console.error('Failed to connect to the database:', err);
    process.exit(1); // Exit if we can't connect to the database
  }
}
connectToDatabase();

app.use(cors());
app.use(express.json());

// use the api is running
app.get('/api/', (req, res) => {
    res.send('API is running');
});

// confirm the user api is running
app.get('/api/user', (req, res) => {
    res.send('User API');
});

// check if the user exists and return the user id
app.post('/api/user/login', async (req, res) => {
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
        // Fix: Correctly assign values from database results
        mathQuestionsAnswered = results[0].mathQuestionsAnswered;
        mathQuestionsCorrect = results[0].mathQuestionsCorrect; // Fixed: was using mathQuestionsAnswered
        englishQuestionsAnswered = results[0].englishQuestionsAnswered; // Fixed: was using mathQuestionsAnswered
        englishQuestionsCorrect = results[0].englishQuestionsCorrect; // Fixed: was using mathQuestionsAnswered
    } else {
        console.log('User Not Found');
        error = 'User not found';
    }
    
    var ret = { 
        id: id, 
        username : username,
        mathQuestionsAnswered: mathQuestionsAnswered, 
        mathQuestionsCorrect: mathQuestionsCorrect, 
        englishQuestionsAnswered: englishQuestionsAnswered, 
        englishQuestionsCorrect: englishQuestionsCorrect, 
        error: error // Fix: Include the error in the response
    };

    res.status(200).json(ret);
});

// get the user question stats
app.post('/api/user/statistics', async (req, res) => {
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
            englishQuestionsCorrect: englishQuestionsCorrect,
            error: '' // Fix: Include an error field for consistency
        };

        res.status(200).json(ret);
    } catch (error) {
        console.error('Error fetching user statistics:', error);
        res.status(200).json({ // Fix: Keep consistent 200 status with error message
            mathQuestionsAnswered: 0,
            mathQuestionsCorrect: 0,
            englishQuestionsAnswered: 0,
            englishQuestionsCorrect: 0,
            error: 'Failed to fetch user statistics'
        });
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
        const result = await db.collection('users').updateOne(
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
        
        // Fix: Check if the update was successful
        if (result.matchedCount === 0) {
            error = 'User not found';
        }
    } catch (e) {
        console.error('Error updating user statistics:', e);
        error = e.message;
    }

    var ret = { 
        error: error,
        // Fix: Return updated statistics for confirmation
        mathQuestionsAnswered: mathQuestionsAnswered,
        mathQuestionsCorrect: mathQuestionsCorrect,
        englishQuestionsAnswered: englishQuestionsAnswered,
        englishQuestionsCorrect: englishQuestionsCorrect
    };
    
    res.status(200).json(ret);
});

// add a new user
app.post('/api/user/addUser', async (req, res) => {
    console.log('Add User API');
    var error = ''; // Fix: Using var instead of const to allow reassignment
    const { username, password } = req.body;
    const db = client.db('LargeProject');

    try {
        // Fix: Check if username already exists
        const existingUser = await db.collection('users').findOne({ username: username });
        if (existingUser) {
            error = 'Username already exists';
        } else {
            await db.collection('users').insertOne({ 
                username: username, 
                password: password, 
                mathQuestionsAnswered: 0, 
                mathQuestionsCorrect: 0, 
                englishQuestionsAnswered: 0, 
                englishQuestionsCorrect: 0 
            });
        }
    }
    catch (e) {
        error = e.message;
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
        error = e.message;
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
