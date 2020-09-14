const express = require("express");
const router = express.Router();

const authData = require("../controllers/authUserController");
const authLogin = require("../controllers/authLoginController");
const authToken = require("../auth/token");
const taskManager = require("../controllers/taskManagerController");


router.post("/signUp", async (req, res) => {
  const retorno = await authData.registerProcess(req.body);
  if (retorno == true) {
    res.send("Cliente cadastrado com sucesso").status(200);
  } else {
    res.send(retorno).status(200);
  }
});

router.post("/signIn", async (req, res) => {
  const params = await authLogin.authLoginToken(req.body);
  if (!!params.token){
    setToken(params.token,res);
    res.redirect("/taskManager");
  } else {
    res.send(params);
  }
});

router.get("/taskManager", async (req, res) => {
  const params = await authToken.authTokenValidate(req.cookies["token"]);
  if (!!params.token) {
    setToken(params.token,res);
    const query = await taskManager.selectAll(id) 
    res.send(JSON.stringify(query));
  } else {
    res.send(params)
  }
});

const setToken = (token,res) => {
  res.cookie("token", token, {
    maxAge: 300000,
    httpOnly: true,
  });
};

module.exports = router;
