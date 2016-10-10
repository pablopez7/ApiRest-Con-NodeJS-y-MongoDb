'use sctrict'

const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment');

const connection = mongoose.connect('mongodb://localhost:27017/angular', (err, resp) => {
  if (err) {
    return console.log(`Error al conectar la base de datos ${err}`)
  }
  console.log('Conexión a la base de datos establecida...')

  app.listen(port, () => {
    console.log(`API REST corriendo en http://localhost:${port}`)
  })

})

autoIncrement.initialize(connection);

require('./models/Tareas')
const tareas = require('./routes/tareas')

require('./models/Usuarios')
const users = require('./routes/usuarios')

require('./models/Productos')
const productos = require('./routes/productos')

require('./models/Heroes')
const heroes = require('./routes/heroes')

const app = express()
const port = process.env.PORT || 3030

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
  res.header('Access-Control-Expose-Headers', 'Content-Length')
  res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range')
  if (req.method === 'OPTIONS') {
    return res.send(200)
  } else {
    return next()
  }
});

app.use('/', tareas)
app.use('/', users)
app.use('/', productos)
app.use('/', heroes)