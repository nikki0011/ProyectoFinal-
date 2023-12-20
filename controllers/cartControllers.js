const Cart = require('../models/cartMoldel')
const Product = require('../models/productsModels')



const update = async (req,res)=>{
    try{
       const cart =  await Cart.findOne({userId:req.user._id})
       cart.products.push(req.body.productId)
       cart.save()
        res.status(200).end()

    }catch(error){
        res.status(500).end()
    }
}

// const remove = async (req,res)=>{
//     try{
//         await Product.deleteOne({name:req.body.name})
//        res.status(200).end()
   
//     }catch(error){
// res.status(500).end()
//     }
// }

// const get = async (req,res)=>{
//     try{
//         const Cart = await Cart.find({userId:req.user._id}) 
//         res.status(200).json()
//     }catch(error){
//         res.status(500).end()
//     }
// }

module.exports = {
//  create:create,
 update:update,
//  remove:remove,
//  get:get
}