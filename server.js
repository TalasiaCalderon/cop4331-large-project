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

const user = require('./backend/user_api.js');
const math = require('./backend/math_question_api.js');
const english = require('./backend/english_question_api.js');



// use the api is running
app.get('/api/', (req, res) => {
res.send('API is running');
});


app.listen(5000, () => {
console.log('Server listening on port 5000');
});

