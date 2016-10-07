'use sctrict'

const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/prueba', (err, resp) => {
  if (err) {
    return console.log(`Error al conectar la base de datos ${err}`)
  }
  console.log('Conexión a la base de datos establecida...')

  app.listen(port, () => {
    console.log(`API REST corriendo en http://localhost:${port}`)
  })

})

require('./models/Tareas')
const tareas = require('./routes/tareas')

require('./models/Usuarios')
const users = require('./routes/usuarios')

require('./models/Productos')
const users = require('./routes/productos')

const app = express()
const port = process.env.PORT || 3030

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/', tareas)
app.use('/', users)
app.use('/', productos)