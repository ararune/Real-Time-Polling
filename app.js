const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

// DB
require('./config/db');

const app = express();

const poll = require('./routes/poll');
// SET PUBLIC FOLDER
app.use(express.static(path.join(__dirname, 'public')))

// BODY PARSER MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// ENABLE CORS
app.use(cors());

app.use('/poll', poll);

const port = 3000;

// START SERVER
app.listen(port, () => console.log(`Server started at port ${port}`));
