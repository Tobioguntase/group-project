const mongoose = require('mongoose');

var logInSchema = new mongoose.Schema({
    userEmail: {
        type: String
    },
    
    userPassword: {
        type: String
    },

    rememberMe: {
        type: Boolean
    }

});

module.exports = mongoose.model('LogIn', logInSchema);