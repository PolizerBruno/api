const bcrypt = require('bcrypt')
const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const db = require('../db/user')

const signIn = async data => {
  if (!data.email || !data.password) {
    return new Promise(reject => reject('Preecha os campos corretamente'))
  }
  const user = await db.selectOne('email', data.email)
  return new Promise((resolve, reject) => {
    if (user) {
      bcrypt.compare(data.password, user.password, (err, isMatch) => {
        if (err || !isMatch) {
          reject('senha invalida')
        }
        const payload = { id: Math.random()}
        resolve({
          "token": jwt.encode(payload, authSecret),
          "user_id": user.id
        })
      })
    } else {
      reject('Usuario não encontrado')
    }
  })
}

module.exports.authLoginToken = data => {
  return signIn(data).catch(err => err)
}
