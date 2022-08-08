const express = require('express');
const router = express.Router();
const Contact = require('./models/contact');

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/mathQuiz', (req, res) => {
    res.render('mathQuiz')
})

router.get('/readingWritingQuiz', (req, res) => {
    res.render('readingWritingQuiz')
})

router.get('/scienceQuiz', (req, res) => {
    res.render('scienceQuiz')
})

router.get('/socialStudiesQuiz', (req, res) => {
    res.render('socialStudiesQuiz')
})

router.get('/contact', (req, res) => {
    res.render('contact')
})

router.get('/logIn', (req, res) => {
    res.render('logIn')
})

router.get('/signUp', (req, res) => {
    res.render('signUp')
})

router.post('/submitContact', (req, res) => {
    const contact = new Contact ({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        reason: req.body.reason,
        comment: req.body.comment
    })

    Contact.collection.insertOne(contact)
    .then(result => {
        res.render('contact')
    })

    .catch(err => console.log(err));

})

module.exports = router;