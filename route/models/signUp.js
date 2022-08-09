const mongoose = require('mongoose');

var SignUpSchema = new mongoose.Schema({
    fname: {
        type: String
    },
    
    lname: {
        type: String
    },

    userEmail: {
        type: String
    },
    
    userPassword: {
        type: String
    },

});

module.exports = mongoose.model('SignUp', SignUpSchema);