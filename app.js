// * 1-enviar el formulario al cliente (ejs) - armar la logica en el servidor para enviar
// * 2-enviar la logica del form para enviar los datos del cliente al servidor
//* 3- conectarse a la base de datos, crear el modelo de usuario
// *4-crear la ruta en el servidor para crear el usuario con la contraseña escriptada
//* 5-enviar la vista de login con la logica
//* 6- armar la ruta de login,comparar contraseñas escriptadas, enviar el token 
// * 7- enviarlo al home


const express = require('express')
const bodyParser = require('body-parser')
const viewsRouter = require('./routers/viewsRoutes')
const userRoutes = require('./routers/userRoutes')
const productsRoutes = require('./routers/productsRoute')
const cartRoutes = require('./routers/cartRoutes')

const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const port = 3000

// * middlwares
app.use(bodyParser.json())
app.use(cors())
app.use(cookieParser())
app.use(express.static('public'))
app.set('view engine', 'ejs');

// * rutes
app.use('/',viewsRouter)

// * rutas de recursos
app.use('/api/user/',userRoutes)
app.use('/api/cart/',cartRoutes)
app.use('/api/product/',productsRoutes)

app.listen(port, async () => {
  try{
    await mongoose.connect('mongodb://127.0.0.1:27017/proyecto_final_Arbrok');
    console.log(`Example app listening on port ${port}`)
  }catch(error){
    console.log('error to connect mongoDB',error)
  }
   
})
