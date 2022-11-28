/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
const express = require('express') // bring this in so we can make our router obj
const Animal = require('../models/animal') // import animal model for routes
const mongoose = require('../models/connection') // connect to db


/////////////////////////////////////////////
// Create Router (the variable to attach our routes to)
/////////////////////////////////////////////
const router = express.Router()


/////////////////////////////////////////////
// Actual Routes
/////////////////////////////////////////////
router.get('/', (req, res) => {
    res.redirect('/animals')
})

router.get('/animals', (req, res) => {
    Animal.find({}, (err, animals) => {
        // res.json(animals)
        res.render('../views/animals/index.ejs', { animals })
    })
})


/////////////////////////////////////////////
// Export Router
/////////////////////////////////////////////
module.exports = router