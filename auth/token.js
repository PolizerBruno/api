const { authSecret } = require("../.env");
const jwtVerify = require("jsonwebtoken");
const jwt = require("jwt-simple");

const verifyTokenIsset = (token) => {
  return new Promise((resolve, reject) => {
    if (token) {
      resolve(token);
    } else {
      reject("Sua sessão expirou");
    }
  });
};

const validateToken = (token) => {
  return new Promise((resolve, reject) => {
    jwtVerify.verify(token, authSecret, (err, decoded) => {
      if (err) {
        reject("Token inválido");
      } else {
        resolve(newToken());
      }
    });
  });
};

const newToken = () => {
  return new Promise((resolve, reject) => {
    const payload = { id: Math.random()};
    resolve({ "token" : jwt.encode(payload, authSecret) });
  });
};

module.exports.authTokenValidate = (token) => {
  return verifyTokenIsset(token)
    .then(validateToken)
    .catch((err) => err);
};
