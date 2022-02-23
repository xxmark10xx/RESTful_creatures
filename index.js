const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const fs = require('fs')
const methodOverride = require('method-override')

// create instance of express
const app = express()


// MIDDLEWARE
// tell express  to use ejs as the view engine
app.set('view engine', 'ejs')
// tell express we are using ejs layouts
app.use(ejsLayouts)
// method override configuration
app.use(methodOverride('_method'))
// body-parser middleware
// this allows us to access form data via req.body
app.use(express.urlencoded({extended: false}))

// CONTROLLERS
app.use('/dinos', require('./controllers/dinoController.js'))
app.use('/prehistoric', require('./controllers/prehistoricController.js'))


// ROUTES
// HOME route
app.get('/', (req, res) =>{
    res.send('Hello Dinos')
})


app.listen(8000, () =>{
    console.log('DINO CRUD TIME 🦖')
})