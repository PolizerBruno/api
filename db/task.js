const knex = require('../config/connect')


module.exports.getAllTaskById = (id) =>{
    return knex('task').select('description','toDoAt','completeAt').where('user_id','=',id)
}