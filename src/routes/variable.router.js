const { getAll, create, getOne, remove, update } = require('../controllers/variable.controller');
const express = require('express');

const routerVariable = express.Router();

routerVariable.route('/')
    .get(getAll)
    .post(create);

routerVariable.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = routerVariable;