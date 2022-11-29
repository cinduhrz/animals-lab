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
// Router Middleware
/////////////////////////////////////////////
// Authorization Middleware
// protects all routes in this router -- so if criteria is not met (user is not logged in), user will be redirected to login page :o coool
router.use((req, res, next) => {
    if (req.session.loggedIn) {
        next()
    } else {
        res.redirect('/login')
    }
})


/////////////////////////////////////////////
// Actual Routes (INDUCES)
/////////////////////////////////////////////

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
    const animals = await Animal.find({username: req.session.username})
    res.render('animals/index.ejs', { 
        animals: animals,
        username: req.session.username
    })
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
router.put('/animals/:id', (req, res) => {
    // add conditional logic for converting check box to boolean for extinct
    req.body.extinct = (req.body.extinct? true : false)

    // syntax: (id, info we are updating original with, {new: true}, () => {})
    Animal.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedAnimal) => {
        // function alr updates animal, now just redirect user back
        res.redirect(`/animals/${req.params.id}`)
    })

})

// Create Route
router.post('/animals', (req, res) => {
    // test route
    // res.send(req.body)

    // add conditional logic to handle extinct boolean
    req.body.extinct = (req.body.extinct ? true : false)

    // add username to req.body to track related user
    req.body.username = req.session.username

    // create new animal
    Animal.create(req.body, (err, createdAnimal) => {
        console.log(createdAnimal)

        // redirect user back to index
        res.redirect('/animals')
    })
})

// Edit Route
router.get('/animals/:id/edit', async (req, res) => {
    const animal = await Animal.findById(req.params.id)
    res.render('animals/edit.ejs', { animal })
})

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