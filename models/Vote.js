const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const voteSchema = new Schema({
    os: {
        type: String,
        required: true
    },
    points: {
        type: String,
        required: true
    }
});

// CREATE COLLECTION AND ADD SCHEMA
const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;