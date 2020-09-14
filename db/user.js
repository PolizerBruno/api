const knex = require('../config/connect')

module.exports.insert = async data => {
  return await knex('user')
    .insert(data)
    .catch(err => err.sqlMessage)
}

module.exports.selectOne = (search, data) => {
  return knex('user')
    .select('id', 'email', 'password')
    .where(search, '=', data)
    .first()
}
module.exports.selectAll = (search, data) => {
  return knex('user')
    .select('id')
    .where(search, '=', data)
}
module.exports.selectInfoOnlyOne = (search, data) => {
  return knex('user')
    .select('id', 'name', 'email')
    .where(search, '=', data)
    .first()
}
