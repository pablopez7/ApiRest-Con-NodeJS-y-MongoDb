'use sctrict'

const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Usuarios = mongoose.model('Usuarios')

//GET - Listar Usuarios
router.get('/usuarios', function (req, res, next) {
    Usuarios.find(function (err, usuarios) {
        if (err) { return next(err) }

        res.json(usuarios)
    })
})

//POST - Agregar usuario
router.post('/usuario', function (req, res, next) {
    var usuario = new Usuarios(req.body)

    Usuarios.findOne({ user: req.body.user }, function (err, document) {
        console.log(document)

        if (document == null) {

            if (req.body.user.length <= 5) {
                console.log('No se permiten menos de 5 caracteres')
                res.json({ message: 'No se permiten menos de 5 caracteres' })
                return;
            }
            usuario.save(function (err, usuario) {
                if (err) { return next(err) }
                res.json(usuario)
            })
        }
        else {
            res.json({ message: 'El Usuario ' + document.user + ' ya existe' })
            return
        }
    });

})

module.exports = router