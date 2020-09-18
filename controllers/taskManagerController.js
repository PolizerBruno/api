const db = require("../db/task");

module.exports.selectAll = (id) => {
    return db.getAllTaskById(id)
}

module.exports.insertTask = (data) => {
    return db.insertTask(data)
}