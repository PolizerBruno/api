const knex = require('../config/connect')


module.exports.getAllTaskById = (id) =>{
    console.log(id)
    return knex('task').select('id','description','toDoAt','completeAt').where('user_id','=',id)
}