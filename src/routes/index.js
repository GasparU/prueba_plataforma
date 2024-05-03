const express = require('express')
const routerUser = require('./user.router')
const routerTitulo = require('./titulo.router')
const routerVariable = require('./variable.router')
const routerPregunta = require('./pregunta.router')
const router = express.Router()

//Aqui van las rutas por cada modelo
router.use('/users', routerUser)
router.use('/titulos', routerTitulo)
router.use('/variables', routerVariable)
router.use('/preguntas', routerPregunta)


module.exports = router