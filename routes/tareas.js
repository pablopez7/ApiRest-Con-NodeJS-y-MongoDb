'use sctrict'

const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Tareas = mongoose.model('Tareas')

//GET - Listar tareas
router.get('/tareas', function (req, res, next) {
    Tareas.find(function (err, tareas) {
        if (err) { return next(err) }

        res.json(tareas)
    })
})

//POST - Agregar tarea
router.post('/tarea', function (req, res, next) {
    var tarea = new Tareas(req.body)

    Tareas.findOne({ nombre: req.body.nombre }, function (err, document) {
        console.log(document)

        if (document == null) {

            if (req.body.nombre.length <= 5) {
                console.log('No se permiten menos de 5 caracteres')
                res.json({ message: 'No se permiten menos de 5 caracteres' })
                return
            }
            tarea.save(function (err, tarea) {
                if (err) { return next(err) }
                res.json(tarea)
            })
        }
        else {
            res.json({ message: 'El elemento ' + document.nombre + ' ya existe' })
            return;
        }
    });

})

//PUT - Actualizar tarea
router.put('/tarea/:id', function (req, res) {
    Tareas.findById(req.params.id, function (err, tarea) {
        tarea.nombre = req.body.nombre
        tarea.prioridad = req.body.prioridad
        tarea.otro = req.body.otro

        tarea.save(function (err) {
            if (err) { res.send(err) }

            res.json(tarea);
        })
    })
})

//DELETE - Eliminar Tarea
router.delete('/tarea/:id', function (req, res) {
    Tareas.findByIdAndRemove(req.params.id, function (err) {
        if (err) { res.send(err) }
        res.json({ message: 'La tarea se ha eliminado' })
    })
})

module.exports = router