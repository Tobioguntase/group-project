const mongoose = require('mongoose');

var logInSchema = new mongoose.Schema({
    userEmail: {
        type: String
    },
    
    userPassword: {
        type: String
    },

});

module.exports = mongoose.model('LogIn', logInSchema);