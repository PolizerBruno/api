const knex = require('../config/connect')


module.exports.getAllTaskById = async (id) =>{
    return await knex('task').select('id','description','toDoAt','completeAt').where('user_id','=',id)
}

module.exports.insertTask = async data =>{
    return await knex('task')
    .insert(data)
    .then(true)
    .catch(err => err.sqlMessage)
}