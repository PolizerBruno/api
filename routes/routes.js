const express = require("express");
const router = express.Router();

const authData = require("../controllers/authUserController");
const authLogin = require("../controllers/authLoginController");
const authToken = require("../auth/token");
const taskManager = require("../controllers/taskManagerController");


router.post("/signUp", async (req, res) => {
  const retorno = await authData.registerProcess(req.body);
  if (!!retorno == true) {
    res.send("Cliente cadastrado com sucesso").status(200);
  } else {
    res.send(retorno).status(400);
  }
});

router.post("/signIn", async (req, res) => {
  const params = await authLogin.authLoginToken(req.body);
  if (!!params.token){
    setToken(params.token,res);
    res.send({"id" : params.user_id}).status(200)
  } else {
    res.send(params).status(400);
  }
});

router.post("/taskManager", async (req, res) => {
  console.log(req.body)
  const params = await authToken.authTokenValidate(req.cookies["token"]);
  if (!!params.token) {
    setToken(params.token,res);
    const query = await taskManager.selectAll(req.body.id) 
    console.log(query)
    res.send(JSON.stringify(query)).status(200);
  } else {
    res.send(params).status(400)
  }
});

const setToken = (token,res) => {
  res.cookie("token", token, {
    maxAge: 300000,
    httpOnly: true,
  });
};

module.exports = router;
