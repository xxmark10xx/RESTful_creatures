const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const fs = require('fs')
const methodOverride = require('method-override')

// create instance of express
const app = express()


// middleware
// tell express  to use ejs as the view engine
app.set('view engine', 'ejs')
// tell express we are using ejs layouts
app.use(ejsLayouts)
// method override configuration
app.use(methodOverride('_method'))
// body-parser middleware
// this allows us to access form data via req.body
app.use(express.urlencoded({extended: false}))

// ROUTES
// home
app.get('/', (req, res) =>{
    res.send('Hello Dinos')
})
// index ie list all the dinos!
app.get('/dinosaurs', (req, res) =>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    res.render('dinos/index.ejs', {myDinos: dinoData})
})

// index list all the prehistoric creatures
app.get('/prehistoric', (req, res) =>{
    let prehistoricCreatures = fs.readFileSync('./prehistoric.json')
    let pCreaturesData = JSON.parse(prehistoricCreatures)
    res.render('prehistoric/index.ejs', {myPrehistoric: pCreaturesData})
})


// new route (renders the new dino form)
app.get('/dinosaurs/new', (req, res) =>{
    res.render('dinos/new.ejs')
})

app.get('/prehistoric/new', (req, res) =>{
    res.render('prehistoric/new.ejs')
})
// PUT ROUTE
app.put('/dinosaurs/:idx' , (req, res) =>{
    // read in our existing dino data
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    // replace dino fields with field from form
    dinoData[req.params.idx].name = req.body.name
    dinoData[req.params.idx].name = req.body.type
    // write the updated array back to the json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    // once the dino has been editted, do a get request to the 
    // index route
    res.redirect('/dinosaurs')
})

app.delete('/dinosaurs?:idx', (req, res) =>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    // delete a dino from file
    dinoData.splice(req.params.idx, 1)
    // rewrite the file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    res.redirect('/dinosaurs')
})

app.get('/dinosaurs/edit/:idx', (req, res) =>{
    // snatch the dino to the updated 
    // read i the dinos from the db
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    // extract the dino corresponding to the index param
    let dinoIndex = req.params.idx
    let targetDino = dinoData[dinoIndex]
    // snatch the dino to be updated
    res.render('dinos/edit.ejs', {dino: targetDino, dinoId: dinoIndex})
})


// show ie show all info about a single dino
// : indicates that the following is a url
app.get('/dinosaurs/:idx', (req, res) =>{
    // read i the dinos from the db
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    // extract the dino corresponding to the index param
    let dinoIndex = req.params.idx
    let targetDino = dinoData[dinoIndex]
    res.render('dinos/show.ejs', {dino: targetDino})
})
app.get('/dinosaurs/', (req, res) =>{
    // read i the dinos from the db
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    let nameFilter = req.query.nameFilter
    
    if (nameFilter) {
        dinoData = dinoData.filter(dino=>{
            return dino.name.toLowerCase() === nameFilter.toLowerCase()
        })
    }
    res.render('dinos/index.ejs', {dino: targetDino})
})



// we are showing all info about a single pCreature
app.get('/prehistoric/:idx', (req, res) =>{
    // read i the dinos from the db
    let prehistoricCreatures = fs.readFileSync('./prehistoric.json')
    let pCreaturesData = JSON.parse(prehistoricCreatures)
    // extract the dino corresponding to the index param
    let pCreaturesIndex = req.params.idx
    let targetCreature = pCreaturesData[pCreaturesIndex]
    res.render('prehistoric/show.ejs', {pCreatures: targetCreature})
})

app.post('/dinosaurs', (req, res) =>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    // add the new dino to the dinoData array
    dinoData.push(req.body)
    // save the dinos to the JSON file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    // redirect back to the index route
    // res.redirect take the url pattern for the get route tha you want to run next
    res.redirect('/dinosaurs')
})

app.post('/prehistoric', (req, res) =>{
    let prehistoricCreatures = fs.readFileSync('./prehistoric.json')
    let pCreaturesData = JSON.parse(prehistoricCreatures)
    // add the new dino to the dinoData array
    pCreaturesData.push(req.body)
    // save the dinos to the JSON file
    fs.writeFileSync('./prehistoric.json', JSON.stringify(pCreaturesData))
    // redirect back to the index route
    // res.redirect take the url pattern for the get route tha you want to run next
    res.redirect('/prehistoric')
})





app.listen(8000, () =>{
    console.log('DINO CRUD TIME 🦖')
})