const db = require('../db/user')
const bcrypt = require("bcrypt");


const insert = async data => {
  return new Promise((resolve)=>{
    resolve(db.insert(data))
  })
}
const passwordToHash = data => {
  return new Promise((resolve) => {
    data.password = bcrypt.hashSync(String(data.password), 10)
    resolve(data)
  })
}

const verifySignPassword = async data => {
  const request = await db.selectAll('email',data.email)
  return new Promise((resolve, reject) => {
    if (request.length == 0) {
      resolve(data)
    } else {
      reject('Cliente já cadastrado')
    }
  })
}

const verifySignData = data => {
  return new Promise((resolve, reject) => {
    if (data.name.trim() && data.email.trim() && data.password.trim()){
      /* Essa regex valida email no seguinte formato 
        : xxxxxxxxx@xxxxx.xxx.xx, 
        com ponto antes do @ 
         xxxxxxx.xxxxxxxxx@xxx.xxx.xx*/
      if (String(data.email).match(/[\w.+]+@[\w+]+\.[\w+]{2,3}.[\w+]{2}/gm)) {
        reject('Email invalido')
      }
      if (
        /* Essa regex valida senhas no seguinte formato 
           6 caracteres ate 10 obrigadorio letras e numeros */
        !String(data.password).match(
          /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,10}$/gm
        )
      ) {
        reject(
          'A senha deve conter pelo menos 6 caracteres e no máximo 10, letras numeros'
        )
      }
      resolve(data)
    } else {
      reject('Insira dados válidos')
    }
  })
}

module.exports.registerProcess = data => {
  return verifySignData(data)
    .then(verifySignPassword)
    .then(passwordToHash)
    .then(insert)
    .catch(err => err)
}
