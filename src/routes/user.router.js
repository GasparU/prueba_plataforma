const { getAll, create, getOne, remove, update, login, logget, setTitulo} = require('../controllers/user.controller')
const express = require('express')
const verifyJWT = require('../utils/verifyJWT')
const routerUser = express.Router()

routerUser.route('/')
    .get(getAll)
    .post(create)

routerUser.route('/login') // users/login
    .post(login)


routerUser.route('/me') //users/me
    .get(verifyJWT, logget)   // verifyJWT

routerUser.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update)

routerUser.route('/:id/titulos')
    .post(setTitulo)
module.exports = routerUser
