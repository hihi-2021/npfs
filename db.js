const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

function getUsers (db = connection) {
  return db('trainers').select()
}

function getUser (id, db = connection) {
  return db('trainers').where('id', id).first()
}

module.exports = {
  getUser: getUser,
  getUsers: getUsers
}