'use sctrict'

const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Heroes = mongoose.model('Heroes')

//GET - Listar Heroes
router.get('/heroes', function (req, res, next) {
    Heroes.find(function (err, heroes) {
        if (err) { return next(err) }

        res.json(heroes)
    })
})


//GET - Detalle Heroe por id numeroco
router.get('/hero/:id', function (req, res, next) {
    Heroes.findOne({ id: req.params.id }, function (err, hero) {
        if (err) { return next(err) }

        res.json(hero)
    })
})


//GET - Detalle Heroe por nombre
router.get('/heros/:name', function (req, res, next) {
    Heroes.findOne({ name: req.params.name }, function (err, hero) {
        if (err) { return next(err) }

        res.json(hero)
    })
})

/*
//GET - Detalle Hero por su id:string
router.get('/hero/:id', function (req, res, next) {
    Heroes.findById(req.params.id, function (err, hero) {
        if (err) { return next(err) }

        res.json(hero)
    })
})
*/

//POST - Agregar Hero
router.post('/hero', function (req, res, next) {
    var hero = new Heroes(req.body)

    Heroes.findOne({ name: req.body.name }, function (err, document) {

        if (document == null) {

            if (req.body.name.length <= 5) {
                res.json({ message: 'No se permiten menos de 5 caracteres' })
                return
            }
            hero.save(function (err, hero) {
                if (err) { return next(err) }
                res.json(hero)
            })
        }
        else {
            res.json({ message: 'El elemento ' + document.name + ' ya existe' })
            return;
        }
    });

})

//PUT - Actualizar Heroe
router.put('/hero/:id', function (req, res) {
    Heroes.findOne({ id: req.params.id }, function (err, hero) {
        hero.name = req.body.name

        hero.save(function (err) {
            if (err) { res.send(err) }

            res.json(hero)
        })
    })
})

//DELETE - Eliminar Heroe
router.delete('/hero/:id', function (req, res) {
    Heroes.findOneAndRemove({ id: req.params.id }, function (err) {
        if (err) { res.send(err) }
        res.json({ message: 'El heroe se ha eliminado' })
    })
})

module.exports = router