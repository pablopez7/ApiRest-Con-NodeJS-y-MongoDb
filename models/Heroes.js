'use sctrict'

const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment');

var HeroesSchema = new mongoose.Schema({
    name: String,
    date: { type: Date, default: Date.now }
});

HeroesSchema.plugin(autoIncrement.plugin, { model: 'Heroes', field: 'id' });

mongoose.model('Heroes', HeroesSchema)