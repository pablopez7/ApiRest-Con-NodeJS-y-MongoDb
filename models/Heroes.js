'use sctrict'

const mongoose = require('mongoose')

var HeroesSchema = new mongoose.Schema({
    name: String,
    id: Number
});

mongoose.model('Heroes', HeroesSchema)