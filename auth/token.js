const { authSecret } = require("../.env");
const jwtVerify = require("jsonwebtoken");
const jwt = require("jwt-simple");

const verifyTokenIsset = (req) => {
  return new Promise((resolve, reject) => {
    if (req.cookies["token"]) {
      resolve(req.cookies["token"]);
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
        resolve(true);
      }
    });
  });
};

const newToken = (res) => {
  return new Promise((resolve, reject) => {
    const payload = { id: Math.random() * 1000000000 };
    res.cookie("token", jwt.encode(payload, authSecret), {
      maxAge: 300000,
      httpOnly: true,
    });
    resolve(true);
  });
};

module.exports.authTokenValidate = (req, res) => {
  return verifyTokenIsset(req)
    .then(validateToken)
    .then(newToken(res))
    .catch((err) => err);
};
