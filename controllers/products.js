const Product=require('../models/product')


const getAllProductsStatic=async(req,res)=>{
    const product=await Product.find({name:'vase table'})
    res.status(200).json({product,nbHits:product.length})
}

const getAllProducts=async(req,res)=>{
    const {featured}=req.query;
const queryObject={}
if(featured){
    queryObject.featured=featured==='true'?true:false
}


    res.status(200).json({product,nbHits:product.length})
}

module.exports={
    getAllProducts,
    getAllProductsStatic
}

