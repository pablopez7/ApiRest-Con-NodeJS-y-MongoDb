'use sctrict'

const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Productos = mongoose.model('Productos')

//GET - Listar Productos
router.get('/productos', function (req, res, next) {
    Productos.find(function (err, productos) {
        if (err) { return next(err) }

        res.json(productos)
    })
})

/*
//GET - Listar Productos por nombre
router.get('/producto/:nombre', function (req, res, next) {
    Productos.findOne({ nombre: req.params.nombre }, function (err, producto) {
        if (err) { return next(err) }

        res.json(producto)
    })
})
*/

//GET - Listar Productos
router.get('/producto/:id', function (req, res, next) {
    Productos.findById(req.params.id, function (err, producto) {
        if (err) { return next(err) }

        res.json(producto)
    })
})

//POST - Agregar Producto
router.post('/producto', function (req, res, next) {
    var producto = new Productos(req.body)

    Productos.findOne({ nombre: req.body.nombre }, function (err, document) {

        if (document == null) {

            if (req.body.nombre.length <= 5) {
                res.json({ message: 'No se permiten menos de 5 caracteres' })
                return
            }
            producto.save(function (err, producto) {
                if (err) { return next(err) }
                res.json(producto)
            })
        }
        else {
            res.json({ message: 'El elemento ' + document.nombre + ' ya existe' })
            return;
        }
    });

})

//PUT - Actualizar Producto
router.put('/producto/:id', function (req, res) {
    Productos.findById(req.params.id, function (err, producto) {
        producto.key = req.body.key
        producto.nombre = req.body.nombre
        producto.directorio = req.body.directorio
        producto.descripcion = req.body.descripcion
        producto.estatus = req.body.estatus

        producto.save(function (err) {
            if (err) { res.send(err) }

            res.json(producto);
        })
    })
})

//DELETE - Eliminar Producto
router.delete('/producto/:id', function (req, res) {
    Productos.findByIdAndRemove(req.params.id, function (err) {
        if (err) { res.send(err) }
        res.json({ message: 'El producto se ha eliminado' })
    })
})

module.exports = router