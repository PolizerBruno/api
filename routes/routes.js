const express = require("express");
const router = express.Router();
const authData = require("../controllers/authDataController");
const authLogin = require("../controllers/authLoginController");
const authToken = require("../auth/token");
const taskManager = require("../controllers/taskManagerController")

router.post("/signUp", async (req, res) => {
  const retorno = await authData.registerProcess(req.body);
  if (retorno == true) {
    res.send("Cliente cadastrado com sucesso").status(200);
  } else {
    res.send(retorno).status(200);
  }
});

router.post("/signIn", async (req, res) => {
  const retorno = await authLogin.authLoginToken(req.body, res);
  if (retorno == true) {
    res.redirect("/taskManager");
  } else {
    res.send("Login inválido");
  }
});

router.get("/taskManager", async (req, res) => {
  const token = await authToken.authTokenValidate(req, res);
  if (token == true) {
    console.log(req.id)
    taskManager.selectAll(req.id)
  } else {
    res.redirect("/");
  }
});

module.exports = router;
