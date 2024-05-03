const app = require('./app')
const sequelize = require('./utils/database')
const PORT = process.env.PORT || 3000

require('./models')

const main = async() => {
    try {
    sequelize.sync()
    console.log('Conectado a DB')
    app.listen(PORT,()=>{
        console.log(`Servidor levantado en puerto ${PORT}`)
    })
        
    } catch (error) {
        console.log(error)
    }
}

main()