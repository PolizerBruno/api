const express = require("express");
const router = express.Router();

const authData = require("../controllers/authUserController");
const authLogin = require("../controllers/authLoginController");
const authToken = require("../auth/token");
const taskManager = require("../controllers/taskManagerController");


router.post("/signUp", async (req, res) => {
  const retorno = await authData.registerProcess(req.body);
  console.log(retorno)
  if (retorno == true) {
    res.send("Cliente cadastrado com sucesso").status(200);
  } else {
    res.send(retorno).status(200);
  }
});

router.post("/signIn", async (req, res) => {
  const retorno = await authLogin.authLoginToken(req.body);
  if (!!retorno.token) {
    setToken(retorno.token,res)
    res.redirect("/taskManager");
  } else {
    res.send("Login inválido");
  }
});

router.get("/taskManager", async (req, res) => {
  const retorno = await authToken.authTokenValidate(req.cookies["token"]);
  if (!!retorno.token) {
    setToken(retorno.token,res);
    res.send(200);
  } else {
    res.send('token invalido')
  }
});

const setToken = (token,res) => {
  res.cookie("token", token, {
    maxAge: 1000 * 60 * 5,
    httpOnly: true,
  });
};

module.exports = router;
