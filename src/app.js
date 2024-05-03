const express = require('express')
const app = express()
const router = require('./routes')
const errorHandler = require('./utils/errorHandler')

// este ruta de abajo sirve para manejar datos codificados en URL, es decir datos de formularios, es decir poder leer los archivos css o jsvascript que estan en la ruta public
app.use(express.urlencoded({extended: false}))

// estos son para poder leer archivos json
app.use(express.json())

app.use('/api/v1', router)

app.get('/', (req, res)=>{
 return   res.send('Bienvenido a Express 2')
})

app.use(errorHandler)
module.exports = app




