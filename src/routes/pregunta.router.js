const { getAll, create, getOne, remove, update } = require('../controllers/pregunta.controller');
const express = require('express');

const routerPregunta = express.Router();

routerPregunta.route('/')
    .get(getAll)
    .post(create);

routerPregunta.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = routerPregunta;