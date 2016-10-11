'use sctrict'

const mongoose = require('mongoose')

var ImagenesSchema = new mongoose.Schema({
	nombre: String,
	directorio: String
});

mongoose.model('Imagenes', ImagenesSchema)