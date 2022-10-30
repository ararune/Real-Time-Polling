const mongoose = require('mongoose');

// MAP GLOBAL PROMISES
mongoose.Promise = global.Promise;

// MONGOOSE CONNECT
mongoose.connect('mongodb+srv://root:root@cluster0.tftcpen.mongodb.net/?retryWrites=true&w=majority')
.then(() => console.log('MongoDB connected!'))
.catch(err => console.log(err));