'use sctrict'

const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Eminence = mongoose.model('Eminence')
const multer  = require('multer')
const cloudinary = require('cloudinary')

cloudinary.config({ 
  cloud_name: 'smartsystems', 
  api_key: '447887673527739', 
  api_secret: 'hIr65en2jUOBR63naXPeXdVG0tM' 
})

var upload = multer({ dest: './tempUploads/' })

router.post('/filecat', upload.single('img'), function(req, res, next) {

        cloudinary.uploader.upload(req.file.path,
        function(result) {
            var imagen = new Eminence({
                category: req.body.category,
                nameCat: req.body.nameCat,
                dirCat: result.url,
                descripCat: req.body.descripCat,
                statusCat: req.body.statusCat})

            imagen.save(function (err, imagen) {
                if (err) { return next(err) }
                res.json(imagen)
            })
        })
})


router.post('/fileprod', upload.single('img'), function(req, res, next) {

        cloudinary.uploader.upload(req.file.path,
        function(result) {
            var imagen = new Eminence({
                category: req.body.category,
                nameProd: req.body.nameProd,
                dirProd: result.url,
                descripProd: req.body.descripProd,
                statusProd: req.body.statusProd})

            imagen.save(function (err, imagen) {
                if (err) { return next(err) }
                res.json(imagen)
            })
        })
})

//GET - Listar Categorias
router.get('/category', function (req, res, next) {
    Eminence.find(function (err, imagen) {
        if (err) { return next(err) }
        res.json(imagen)
    })
})

module.exports = router