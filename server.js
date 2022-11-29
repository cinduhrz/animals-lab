/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require('dotenv').config() // load env variables (need for PORT)
const PORT = process.env.PORT || 3000
const express = require('express') // import express
const morgan = require('morgan') // import logger
const methodOverride = require('method-override') // import method-override
const mongoose = require('./models/connection') // connect to db
const AnimalRouter = require('./controllers/animal') // import animal router
const UserRouter = require('./controllers/user') // import user router
const session = require('express-session')
const MongoStore = require('connect-mongo')


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
app.use(session({
    secret: process.env.SECRET,
    store: MongoStore.create({mongoUrl: process.env.DATABASE_URL}),
    saveUninitialized: true,
    resave: false
}))
app.use(UserRouter) // use user router (has to go before animal router bc animal routes redirect to user login route, so user router has to be registered first)
app.use(AnimalRouter) // use animal router


/////////////////////////////////////////////
// Root Route
/////////////////////////////////////////////
app.get('/', (req, res) => {
    res.render("index.ejs")
})


/////////////////////////////////////////////
// Turn Server On
/////////////////////////////////////////////
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})