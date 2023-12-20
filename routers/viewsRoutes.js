const express = require('express')
const route = express.Router()
const viewsControllers = require('../controllers/viewsControllers')
const authMiddleware = require('../middleWares/auth')
const isAdmin = require('../middleWares/admin')
route.get('/login',viewsControllers.login)
route.get('/register',viewsControllers.register)
route.get('/',authMiddleware,viewsControllers.home)
route.get('/dashboard',authMiddleware,isAdmin,viewsControllers.dashboard)
route.get('/cart',authMiddleware,viewsControllers.cart)


module.exports = route

