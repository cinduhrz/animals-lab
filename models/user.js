/////////////////////////////////////////////
// Our User Model
/////////////////////////////////////////////

// Import Dependencies
const mongoose = require('./connection') // import alr connected mongoose to use its schema and model

// pull schema and model from mongoose
const {Schema, model} = mongoose

// make user Schema
const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

// make user model
// syntax model("collection name", schema to use)
const User = model("User", userSchema)

// Export User model
module.exports = User