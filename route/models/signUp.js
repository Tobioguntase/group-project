const mongoose = require('mongoose');

var SignUpSchema = new mongoose.Schema({
    fname: {
        type: String
    },
    
    lname: {
        type: String
    },

    email: {
        type: String
    },
    
    reason: {
        type: String
    },

    comment: {
        type: String
    }
});

module.exports = mongoose.model('SignUp', SignUpSchema);