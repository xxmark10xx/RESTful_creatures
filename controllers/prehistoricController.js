const express = require('express')
const router = express.Router()

// PRE-HISTORIC CREATURES route
// List all the prehistoric creatures
router.get('/prehistoric', (req, res) =>{
    let prehistoricCreatures = fs.readFileSync('./prehistoric.json')
    let pCreaturesData = JSON.parse(prehistoricCreatures)
    res.render('prehistoric/index.ejs', {myPrehistoric: pCreaturesData})
})

// NEW route (renders the new prehistoric creature)
router.get('/prehistoric/new', (req, res) =>{
    res.render('prehistoric/new.ejs')
})

// we are showing all info about a single pCreature
router.get('/prehistoric/:idx', (req, res) =>{
    // read i the dinos from the db
    let prehistoricCreatures = fs.readFileSync('./prehistoric.json')
    let pCreaturesData = JSON.parse(prehistoricCreatures)
    // extract the dino corresponding to the index param
    let pCreaturesIndex = req.params.idx
    let targetCreature = pCreaturesData[pCreaturesIndex]
    res.render('prehistoric/show.ejs', {pCreatures: targetCreature})
})

// PUT route
router.put('/prehistoric/:idx' , (req, res) =>{
    // read in our existing prehistoric data
    let prehistoricCreatures = fs.readFileSync('./prehistoric.json')
    let pCreaturesData = JSON.parse(prehistoricCreatures)
    // replace dino fields with field from form
    pCreaturesData[req.params.idx].img_url = req.body.img_url
    pCreaturesData[req.params.idx].type = req.body.type
    // write the updated array back to the json file
    fs.writeFileSync('./prehistoric.json', JSON.stringify(pCreaturesData))
    // once the dino has been editted, do a get request to the 
    // index route
    res.redirect('/prehistoric')
})


router.post('/prehistoric', (req, res) =>{
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

// DELETE route
router.delete('/prehistoric?:idx', (req, res) =>{
    let prehistoricCreatures = fs.readFileSync('./prehistoric.json')
    let pCreaturesData = JSON.parse(prehistoricCreatures)
    // delete a dino from file
    pCreaturesData.splice(req.params.idx, 1)
    // rewrite the file
    fs.writeFileSync('./prehistoric.json', JSON.stringify(pCreaturesData))
    res.redirect('/prehistoric')
})


module.exports = router