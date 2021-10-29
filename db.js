const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

function getUsers (db = connection) {
  return db('trainers').select()
}

function getUser (id, db = connection) {
  return db('trainers').where('id', id).first()
}

function getTrainersPokemon (id, db = connection) {
  return db('tPokemon').where('trainer_id', id)
  .join('pokemonList', 'pokemonList.id', 'tPokemon.id')
  .select('pokemonList.name', 'pokemonList.image')
}

function getAllPokemon(db = connection){
  return db('pokemonList')

  .select('pokemonList.id','pokemonList.name', 'pokemonList.image')
}

function updateTrainersPokemon(trainers_id, pokemon_id, db = connection){
  return db('tPokemon')
  .insert({trainer_id: trainers_id, pokemon_id: pokemon_id})

}

function createNewTrainer(name, db = connection){
  console.log(name)
  return db('trainers')
    .insert({name})
}


module.exports = {
  getUser: getUser,
  getUsers: getUsers,
  getTrainersPokemon,
  getAllPokemon,
  createNewTrainer,
  updateTrainersPokemon
}