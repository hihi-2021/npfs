const express = require('express')

const db = require('./db')

const router = express.Router()

router.get('/', (req, res) => {
  db.getUsers()
    .then(trainers => {
      res.render('index', { trainers })
      return null
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.post('/', (req, res) => {
  const {trainer} = req.body
  db.createNewTrainer(trainer)
  .then(id => {
    res.redirect(`trainerid/${id}`)
  })
})

router.post('/trainerid/:id/new', (req, res) => {
  const id = req.params.id
  const { pokemonId } = req.body
  db.updateTrainersPokemon(trainers_id, pokemonId)
    .then( (listOfPokemon) => {
    res.render(`trainerid/${id}/new`, {listOfPokemon})
  })
})


router.get('/trainerid/:id', (req, res) => {
  const id = req.params.id
  db.getTrainersPokemon(id)
    .then( (listOfPokemon) => {
    res.render('trainerid', {listOfPokemon, id})
  })
})

router.get('/trainerid/:id/new', (req, res) => {
  //const id = req.params.id
  db.getAllPokemon()
    .then( (listOfPokemon) => {
    res.render('new', {listOfPokemon})
  })
})




module.exports = router
