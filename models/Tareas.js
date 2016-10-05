'use sctrict'

const mongoose = require('mongoose')

var TareasSchema = new mongoose.Schema({
	nombre: String,
	prioridad: Number,
	otro: String
});

mongoose.model('Tareas', TareasSchema)