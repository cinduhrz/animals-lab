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
// Actual Routes (INDUCES)
/////////////////////////////////////////////
router.get('/', (req, res) => {
    res.redirect('/animals')
})

// router.get('/animals', (req, res) => {
//     Animal.find({}, (err, animals) => {
//         // res.json(animals)
//         res.render('animals/index.ejs', { animals })
//     })
// })

// router.get('/animals', (req, res) => {
//     Animal.find({})
//     .then((animals) => {
//         res.render('animals/index.ejs', {animals})
//     })
//     .catch(err => console.log(err))
// })

// Index route
router.get('/animals', async (req, res) => {
    const animals = await Animal.find({})
    res.render('animals/index.ejs', { animals })
})

// New Route
router.get('/animals/new', (req, res) => {
    res.render('animals/new.ejs')
})

// Delete Route
router.delete('/animals/:id', (req, res) => {
    Animal.findByIdAndDelete(req.params.id, (err, deletedAnimal) => {
        console.log(err, deletedAnimal)

        // redirect user back to index
        res.redirect('/animals')
    })
})

// Update Route
// Create Route
router.post('/animals', (req, res) => {
    // test route
    // res.send(req.body)

    // add conditional logic to handle extinct boolean
    req.body.extinct = (req.body.extinct ? true : false)

    // create new animal
    Animal.create(req.body, (err, createdAnimal) => {
        console.log(createdAnimal)

        // redirect user back to index
        res.redirect('/animals')
    })
})

// Edit Route

// Show Route
router.get('/animals/:id', async (req, res) => {
    // test route
    // res.send(req.params.id)

    const animal = await Animal.findById(req.params.id)
    res.render('animals/show.ejs', { animal })
})

/////////////////////////////////////////////
// Export Router
/////////////////////////////////////////////
module.exports = router