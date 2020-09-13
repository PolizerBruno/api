const bcrypt = require("bcrypt");
const knex = require("../config/connect");
const { authSecret } = require("../.env");
const jwt = require("jwt-simple");

const signIn = async (data, res) => {
  if (!data.email || !data.password) {
    return new Promise((reject) => reject("Usuário ou senhas invalidos"));
  }
  const user = await knex("user").where({ email: data.email }).first();
  return new Promise((resolve, reject) => {
    if (user) {
      bcrypt.compare(data.password, user.password, (err, isMatch) => {
        if (err || !isMatch) {
          reject("Usuario ou senhas invalidos");
        }
        const payload = { id: Math.random() * 1000000000 };
        res.cookie("token", jwt.encode(payload, authSecret), {
          maxAge: 300000,
          httpOnly: true,
        });
        resolve(true);
      });
    } else {
      reject("Usuario ou senhas invalidos");
    }
  });
};

module.exports.authLoginToken = (data, res) => {
  return signIn(data, res).catch((err) => err);
};
