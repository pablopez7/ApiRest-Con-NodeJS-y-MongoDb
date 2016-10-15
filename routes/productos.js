'use sctrict'

const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Productos = mongoose.model('Productos')
const multer  = require('multer')
const cloudinary = require('cloudinary')

cloudinary.config({ 
  cloud_name: 'smartsystems', 
  api_key: '447887673527739', 
  api_secret: 'hIr65en2jUOBR63naXPeXdVG0tM' 
})

var upload = multer({ dest: './tempUploads/' })

router.post('/fileProducto', upload.single('img'), function(req, res, next) {

        cloudinary.uploader.upload(req.file.path,
        function(result) {
            var imagen = new Productos({
                catalogo: req.body.catalogo,
                categoria: req.body.categoria,
                producto: req.body.producto,
                nombre: req.body.nombre,
                directorio: result.url,
                descripcion: req.body.descripcion,
                status: req.body.status})

            imagen.save(function (err, imagen) {
                if (err) { return next(err) }
                res.json(imagen)
            })
        })
})

//GET - Listar Categorias
router.get('/catalogo', function (req, res, next) {
    Productos.find(function (err, imagen) {
        if (err) { return next(err) }
        res.json(imagen)
    })
})

module.exports = router