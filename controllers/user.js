/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
const express = require('express') // need express to create router
const User = require('../models/user') // import user model to create routes
const mongoose = require('../models/connection') // connect to db


/////////////////////////////////////////////
// Create Router (the variable to attach our routes to)
/////////////////////////////////////////////
const router = express.Router()


/////////////////////////////////////////////
// Actual Routes (INDUCES)
/////////////////////////////////////////////

// The Signup Routes (GET: signup form, POST: submit form)
router.get('/signup', (req, res) => {
    res.render('user/signup.ejs')
})

router.post('/signup', (req, res) => {
    res.send("signed up")
})

// The Login Routes (GET: login form, POST: submit form)
router.get('/login', (req, res) => {
    res.render('user/login.ejs')
})

router.post('/login', (req, res) => {
    res.send("logged in")
})


/////////////////////////////////////////////
// Export Router
/////////////////////////////////////////////
module.exports = router