const Product = require('../models/productsModels')
const Cart = require('../models/cartMoldel')
const login = (req,res)=>{
    res.render('pages/login');
}

const register = (req,res)=>{
    res.render('pages/register');
}

const home = async (req,res)=>{
const products = await Product.find({})
const shoppingCart = await Cart.findOne({userId:req.user._id})

    if(req.user){
        res.render('pages/home',{user:req.user,products:products,cart:shoppingCart.products})
    }else{
        res.redirect('http://localhost:3000/login')
    }

}

const dashboard = (req,res)=>{
    res.render('pages/dashboard')
}

const cart = async (req,res)=>{
    const shoppingCart = await Cart.findOne({userId:req.user._id})
    const promises = [] //* [promesa1, promesa2]
    shoppingCart.products.forEach( async (id)=>{
    const promise = Product.findById(id)
    promises.push(promise)
    })
await Promise.all(promises).then((products)=>{
     res.render('pages/shoppingCart',{products:products})
})
    
}

module.exports = {
    login:login,
    register:register,
    home:home,
    dashboard:dashboard,
    cart:cart
}