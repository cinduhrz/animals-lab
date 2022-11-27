/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require('dotenv').config() // load env variables
const PORT = process.env.PORT || 3500
const express = require('express') // import express
const morgan = require('morgan') // import logger
const methodOverride = require('method-override') // import method-override
const mongoose = require('mongoose') // import mongoose


/////////////////////////////////////////////
// Database Connection
/////////////////////////////////////////////
const DATABASE_URL = process.env.DATABASE_URL
// const CONFIG = {}

// Establish Connection
mongoose.connect(DATABASE_URL)

// Events for when connection opens/disconnects/errors
mongoose.connection
.on("open", () => console.log("Connected to Mongoose"))
.on("close", () => console.log("Disconnected from Mongoose"))
.on("error", (error) => console.log(error))


/////////////////////////////////////////////
// Our Models
/////////////////////////////////////////////
// pull mongoose.Schema and mongoose.model from mongoose via destructuring
const {Schema, model} = mongoose

// make animal Schema
const animalSchema = new Schema({
    species: String,
    extinct: Boolean,
    location: String,
    lifeExpectancy: Number
})

// make animal model
const Animal = model("Animal", animalSchema)


/////////////////////////////////////////////
// Create Express App Object
/////////////////////////////////////////////
const app = express()


/////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////
app.use(morgan("dev")) // logging
app.use(methodOverride("_method")) // override for PUT and DELETE requests from forms
app.use(express.urlencoded({extended:true})) // parses urlencoded request bodies (body-parser)
app.use("/static", express.static("public")) // serves files from public statically


/////////////////////////////////////////////
// Routes
/////////////////////////////////////////////
app.get('/', (req, res) => {
    res.send("You got / route :)")
})

/////////////////////////////////////////////
// Turn Server On
/////////////////////////////////////////////
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})