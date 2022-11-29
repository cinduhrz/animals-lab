/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
const express = require('express') // need express to create router
const User = require('../models/user') // import user model to create routes
const mongoose = require('../models/connection') // connect to db
const bcrypt = require('bcryptjs') // import bcrypt to use in signup/login routes


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

router.post('/signup', async (req, res) => {
    // encrypt newly created user password
    // hash method takes 2 args: (og password, salt (randomly generated string to add to pw before hashing to make more secure))
    req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))
    // create the new user
    User.create(req.body, (err, user) => {
        // redirect to login page
        res.redirect('/login')
    })
})

// The Login Routes (GET: login form, POST: submit form)
router.get('/login', (req, res) => {
    res.render('user/login.ejs')
})

router.post('/login', (req, res) => {
    // get data from req body using destructuring
    const { username, password } = req.body
    User.findOne({ username }, (err, user) => {
        // checking if user exists
        if (!user) {
            res.send("User doesn't exist")
        } else {
            // check if password matches
            const result = bcrypt.compareSync(password, user.password)
            if (result) {
                res.redirect('/animals')
            } else {
                res.send("Wrong password")
            }
        }
    })
})


/////////////////////////////////////////////
// Export Router
/////////////////////////////////////////////
module.exports = router