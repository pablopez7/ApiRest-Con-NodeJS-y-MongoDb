'use sctrict'

const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')

var EminenceSchema = new mongoose.Schema({
    category: String,
	nameCat: String,
	dirCat: String,
    descripCat: String,
    statusCat: Number,
	nameProd: String,
	dirProd: String,
    descripProd: String,
    statusProd: Number,
    date: { type: Date, default: Date.now }
})

EminenceSchema.plugin(autoIncrement.plugin, { model: 'Eminence', field: 'id' })

mongoose.model('Eminence', EminenceSchema)