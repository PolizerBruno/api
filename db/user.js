const knex = require("../config/connect");

module.exports.insert = async (data) => {
  return await knex("user")
    .insert(data)
    .catch((err) => err.sqlMessage);
};

module.exports.selectOne = (search, data) => {
  return knex("user").select('email','password').where(search, "=", data).first();
};
module.exports.selectAll = (search, data) => {
    return knex("user").select('email','password').where(search, "=", data);
  };
