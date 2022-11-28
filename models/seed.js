/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
const mongoose = require('./connection') // import db connection
const Animal = require('./animal')

/////////////////////////////////////////////
// Seed Code
/////////////////////////////////////////////

// seeds data into database once we are connection
// so essentially resets database everytime we connect

// Make sure code is not run until connected
mongoose.connection.on("open", () => {

    // Run any database queries in this function
    const startingAnimals = [
        {
            species: "Blue Whale",
            extinct: false,
            location: "All oceans except the Arctic",
            lifeExpectancy: 90
        },
        {
            species: "Elephant",
            extinct: false,
            location: "Africa",
            lifeExpectancy: 70
        },
        {
            species: "Brontosaurus",
            extinct: true,
            location: "North America",
            lifeExpectancy: 80
        },
        {
            species: "Chipmunk",
            extinct: false,
            location: "North America",
            lifeExpectancy: 2
        },
        {
            species: "Stingray",
            extinct: false,
            location: "Coastal tropical and subtropical marine waters throughout the world",
            lifeExpectancy: 10
        }
    ]

    // Start seeding process
    // 1. Delete all prev animal data
    Animal.deleteMany({}, (err, data) => {
        // 2. Create new animals
        Animal.create(startingAnimals, (err, createdAnimals) => {
            // console.log the seed data
            console.log("--------ANIMALS CREATED--------")
            console.log(createdAnimals)
            console.log("--------ANIMALS CREATED--------")

            // close the db connection
            mongoose.connection.close()
        })
    })
})