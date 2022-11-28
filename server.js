/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require('dotenv').config() // load env variables (need for PORT)
const PORT = process.env.PORT || 3500
const express = require('express') // import express
const morgan = require('morgan') // import logger
const methodOverride = require('method-override') // import method-override
const mongoose = require('./models/connection') // connect to db
const AnimalRouter = require('./controllers/animal') // import animal router


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
app.use(AnimalRouter) // use animal router



/////////////////////////////////////////////
// Turn Server On
/////////////////////////////////////////////
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})