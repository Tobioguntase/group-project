const mongoose = require('mongoose');

var mathQuizSchema = new mongoose.Schema({
    s: {
        type: String
    },
    
    uname: {
        type: String
    },

    pword: {
        type: String
    }
});

module.exports = mongoose.model('MathQuiz', mathQuizSchema);