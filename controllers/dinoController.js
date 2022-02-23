const express = require('express')
const router = express.Router()

// DINOSAURS route
// index ie-- List of all the Dinosaurs
router.get('/dinosaurs', (req, res) =>{
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

// NEW route (renders the new dino form)
router.get('/dinosaurs/new', (req, res) =>{
    res.render('dinos/new.ejs')
})

// view the edit form
router.get('/dinosaurs/edit/:idx', (req, res) =>{
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

// PUT route
router.put('/dinosaurs/:idx' , (req, res) =>{
    // read in our existing dino data
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    // replace dino fields with field from form
    dinoData[req.params.idx].name = req.body.name
    dinoData[req.params.idx].type = req.body.type
    // write the updated array back to the json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    // once the dino has been editted, do a get request to the 
    // index route
    res.redirect('/dinosaurs')
})
 
// show ie show all info about a single dino
// : indicates that the following is a url
router.get('/dinosaurs/:idx', (req, res) =>{
    // read i the dinos from the db
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    // extract the dino corresponding to the index param
    let dinoIndex = req.params.idx
    let targetDino = dinoData[dinoIndex]
    res.render('dinos/show.ejs', {dino: targetDino})
})

// post a new dino
router.post('/dinosaurs', (req, res) =>{
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

// DELETE route
router.delete('/dinosaurs?:idx', (req, res) =>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    // delete a dino from file
    dinoData.splice(req.params.idx, 1)
    // rewrite the file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    res.redirect('/dinosaurs')
})

module.exports = router