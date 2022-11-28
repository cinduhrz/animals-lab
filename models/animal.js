/////////////////////////////////////////////
// Our Models
/////////////////////////////////////////////

// Import Dependencies
const mongoose = require('./connection') // import the mongoose that is ALREADY connected

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

// Export Animal model to use in controllers files (routes)
module.exports = Animal