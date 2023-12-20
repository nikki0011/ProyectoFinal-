const express = require('express')
const route = express.Router()
const productsControllers = require('../controllers/productsControllers')
const auth = require('../middleWares/auth')
const isAdmin = require('../middleWares/admin')

route.get('/',auth,productsControllers.get)
route.post('/',auth,isAdmin,productsControllers.create)
route.put('/',auth,isAdmin,productsControllers.update)
route.delete('/',auth,isAdmin,productsControllers.remove)


module.exports = route