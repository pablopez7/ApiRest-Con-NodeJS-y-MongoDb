'use sctrict'

const mongoose = require('mongoose')

var UsuariosSchema = new mongoose.Schema({
	user: String,
	pass: String,
	email: String
});

mongoose.model('Usuarios', UsuariosSchema)