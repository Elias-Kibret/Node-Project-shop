const Product=require('../models/product')


const getAllProductsStatic=async(req,res)=>{
    const search='ab'
    const product=await Product.find({price:{$gt:30}})
                                       .sort('name')
                                       .select('name price')
                                       .limit(4)
                                       .skip(5)
    res.status(200).json({product,nbHits:product.length})
}

const getAllProducts=async(req,res)=>{
    const {featured,company,name,sort,fields}=req.query;
const queryObject={}
if(featured){
    queryObject.featured=featured==='true'?true:false
}
let  result=Product.find(queryObject)

//sort
if(sort){
    
const sortLists=sort.split(',').join(" ")
console.log(sortLists)
result=result.sort(sortLists)
}
else{
    result=result.sort('createdAt')
}
if(fields){
    const FieldLists=fields.split(',').join(" ")
    console.log(FieldLists)
    result=result.select(FieldLists)     
}

const page =Number(req.query.page)||1;
const limit=Number(req.query.limit) || 10
const skip=(page-1)*limit;
result =result.skip(skip).limit(limit)
const product=await result


    res.status(200).json({product,nbHits:product.length})
}

module.exports={
    getAllProducts,
    getAllProductsStatic
}

