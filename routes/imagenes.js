'use sctrict'

const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Imagenes = mongoose.model('Imagenes')
const multer  = require('multer')
const cloudinary = require('cloudinary')

cloudinary.config({ 
  cloud_name: 'smartsystems', 
  api_key: '447887673527739', 
  api_secret: 'hIr65en2jUOBR63naXPeXdVG0tM' 
})

var upload = multer({ dest: './tempUploads/' })

//POST - Agregar tarea
router.post('/file', upload.single('face'), function(req, res, next) {

        cloudinary.uploader.upload(req.file.path,
        function(result) {
            var imagen = new Imagenes({
                nombre: req.body.nombre,
                directorio: result.url})

            imagen.save(function (err, imagen) {
                if (err) { return next(err) }
                res.json(imagen)
            })
        })
})

//GET - Listar Imagenes
router.get('/files', function (req, res, next) {
    Imagenes.find(function (err, imagen) {
        if (err) { return next(err) }
        res.json(imagen)
    })
})

module.exports = router

/*

//Estos son los valores que trae la imagen del formulario:

{ fieldname: 'face',
  originalname: 'IMG_201617:01:18.jpg',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  destination: './uploads',
  filename: '914b7455c8417c89604b7f26dcc07955',
  path: 'uploads/914b7455c8417c89604b7f26dcc07955',
  size: 189452 }



//Guarda las imagenes en el servidor:

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

    var dir = req.file.path

    var imagen = new Imagenes({nombre: req.body.nombre, directorio:  dir})
    imagen.save(function (err, imagen) {
        if (err) { return next(err) }
            res.json(imagen)
        })

    console.log(directorio + '---' + nombre)
})

*/