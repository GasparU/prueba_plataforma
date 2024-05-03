
const { getAll, create, getOne, remove, update, setVariable} = require('../controllers/titulo..controller');
const express = require('express');
// const verifyJWT = require('../utils/verifyJWT')

const routerTitulo = express.Router();

routerTitulo.route('/')
    .get( getAll)
    .post( create);

routerTitulo.route('/:id')
    .get( getOne)
    .delete( remove)
    .put( update);

routerTitulo.route('/:id/variables')
    .post(setVariable)


module.exports = routerTitulo;