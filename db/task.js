const Knex = require('knex')
const knex = require('../config/connect')


module.exports.getAllTaskById = async (id) =>{
    return await knex('task').select('id','description','toDoAt','completeAt').where('user_id','=',id)
}

module.exports.insertTask = async data =>{
    return await knex('task')
    .insert(data)
    .catch(err => err.sqlMessage)
}

module.exports.deleteTask = async data =>{
    return await knex('task')
    .where('id','=',data.id)
    .del()
    .catch(err=>err.sqlMessage)
}

module.exports.updateTask = async data => {
    return await knex('task')
    .where('id','=',data.id)
    .update(data)
    .then(true)
    .catch(err=>err.sqlMessage)
}