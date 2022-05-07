const Product=require('../models/product')


const getAllProductsStatic=async(req,res)=>{
    const search='ab'
    const product=await Product.find({}).sort('-name price')
    res.status(200).json({product,nbHits:product.length})
}

const getAllProducts=async(req,res)=>{
    const {featured}=req.query;
console.log(typeof(featured))
const queryObject={}
if(featured){
    queryObject.featured=featured==='true'?true:false
}
const product=await Product.find(queryObject)

    res.status(200).json({product,nbHits:product.length})
}

module.exports={
    getAllProducts,
    getAllProductsStatic
}

