const express = require("express");
const router = express.Router();

const authData = require("../controllers/authUserController");
const authLogin = require("../controllers/authLoginController");
const authToken = require("../auth/token");
const taskManager = require("../controllers/taskManagerController");


router.post("/signUp", async (req, res) => {
  const retorno = await authData.registerProcess(req.body);
  console.log(retorno)
  if (retorno === true) {
    res.status(201).send("Cliente cadastrado com sucesso")
  } else {
    res.status(404).send(retorno)
  }
});

router.post("/signIn", async (req, res) => {
  const params = await authLogin.authLoginToken(req.body);
  if (!!params.token){
    setToken(params.token,res);
    return res.status(201).send({"id" : params.user_id})
  } else {
    return res.status(404).send("Preencha os campos corretamente")
  }
});

router.post("/taskManager", async (req, res) => {
  const params = await authToken.authTokenValidate(req.cookies["token"]);
  if (!!params.token) {
    setToken(params.token,res);
    const query = await taskManager.selectAll(req.body.id) 
    res.status(201).send(JSON.stringify(query))
  } else {
    res.status(404).send(params)
  }
});
router.post("/taskInsert", async (req, res) => {
  console.log(req.body)
  const params = await authToken.authTokenValidate(req.cookies["token"]);
  if (!!params.token) {
    setToken(params.token,res);
    const query = await taskManager.insertTask(req.body) 
    console.log(query)
    res.status(201).send(JSON.stringify(query))
  } else {
    res.status(404).send(params)
  }
});

const setToken = (token,res) => {
  res.cookie("token", token, {
    maxAge: 300000,
    httpOnly: true,
  });
};

module.exports = router;
