'use sctrict'

const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Imagenes = mongoose.model('Imagenes')

const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/uploads')
    },
    filename: function(req, file, cb){
        var ext = file.originalname.substr(file.originalname.lastIndexOf('.') + 1)
        cb(null, file.fieldname + '-' + Date.now() + '.' + ext)
    },

})
const upload = multer({ storage: storage })

//POST - Agregar tarea
router.post('/file', upload.single('face'), function(req, res, next) {

    var directorio = req.file.path

    var imagen = new Imagenes({nombre: req.body.nombre, directorio:  req.file.path})
    imagen.save(function (err, imagen) {
        if (err) { return next(err) }
            res.json(imagen)
        })

    console.log(directorio + '---' + nombre)
})

module.exports = router