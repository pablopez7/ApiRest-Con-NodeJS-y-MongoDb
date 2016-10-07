'use sctrict'

const mongoose = require('mongoose')

var ProductosSchema = new mongoose.Schema({
    nombre: string,
    directorio: string,
    descripcion: string,
    estatus: boolean
})

mongoose.model('Productos', ProductosSchema)