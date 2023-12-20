const User = require('../models/usersModels')
const userUtils = require('../utils/userUtils')
const Cart = require('../models/cartMoldel')
const login = async (req,res)=>{
    try{
        const email= req.body.email
        const password = req.body.password
        const user = await User.findOne({email: email})
        const matchPassword = userUtils.comparePasswords(password,user.password,user.salt)
          if(matchPassword){
          const token = userUtils.createToken(user)
          res.status(200).send(token)
        }else{
          res.status(400).send('password no match')
        }
    }catch(error){
res.status(500).send(error)
    }
  
}

const register = async (req,res)=>{
    try{
        const email = req.body.email
        const password = req.body.password
        const photo = req.body.photo
        const name = req.body.name
       if(email && password && photo){
          const hashSalt = userUtils.createHasAndSalt(password)
          const user = await User.create({
            name:name,
            email:email,
            password:hashSalt.hash,
            salt:hashSalt.salt,
            photo:photo,
            isAdmin:false
          })

          await Cart.create({
            userId:user._id,
               
        })
        res.status(201).end()  

       }else{
        res.status(400).send('datos imcompletos')
       }
    }catch(error){
      res.status(500).send(error)
    }
    
}

const logout = (req,res)=>{
res.user = null,
res.clearCookie('token');
res.status(200).end()
}


module.exports = {
    login:login,
    register:register,
    logout:logout
}