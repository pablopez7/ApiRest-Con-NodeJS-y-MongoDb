'use sctrict'

const mongoose = require('mongoose')

var ProductosSchema = new mongoose.Schema({
    key: Number,
    nombre: String,
    directorio: String,
    descripcion: String,
    estatus: Boolean
})

mongoose.model('Productos', ProductosSchema)