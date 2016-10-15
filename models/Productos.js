'use sctrict'

const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')

var ProductosSchema = new mongoose.Schema({
    catalogo: String,
    categoria: String,
    producto: String,
    nombre: String,
    directorio: String,
    descripcion: String,
    status: Number,
    date: { type: Date, default: Date.now },

})

ProductosSchema.plugin(autoIncrement.plugin, { model: 'Productos', field: 'id' })

mongoose.model('Productos', ProductosSchema)