const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const routes = require('./routes/routes')
const express = require('express')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())
app.post('/signup', routes)
app.post('/signIn', routes)
app.post('/taskManager', routes)
app.post('/taskInsert',routes)

app.listen('3000', () => {
  console.log('Api rodando')
})
