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
  console.log(req.body)
  const {name} = req.body
  db.createNewTrainer(name)
  .then(id => {
    res.redirect(`trainerid/${id}`)
  })
})

router.get('/trainerid/:id', (req, res) => {
  const id = req.params.id
  console.log(id)
  db.getTrainersPokemon(id)
    .then( (listOfPokemon) => {
    res.render('trainerid', {listOfPokemon})
  })
})

module.exports = router
