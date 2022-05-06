const Product=require('../models/product')


const getAllProductsStatic=async(req,res)=>{
    const product=await Product.find({})
    res.status(200).json({product})
}

const getAllProducts=async(req,res)=>{
    res.status(200).json({msg:'products route'})
}

module.exports={
    getAllProducts,
    getAllProductsStatic
}

