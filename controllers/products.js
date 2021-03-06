const Product=require('../models/product')


const getAllProductsStatic=async(req,res)=>{
    const search='ab'
    const product=await Product.find({price:{$gt:30}})
                                       .sort('price')
                                       .select('name price')
                                       .limit(4)
                                       .skip(5)
    res.status(200).json({product,nbHits:product.length})
}

const getAllProducts=async(req,res)=>{
    const {featured,company,name,sort,fields,numericFilters}=req.query;
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
if(numericFilters){
    const operatorMap={
        '>':'$gt',
        '>=':'$gte',
        '=':'$eq',
        '<':'$lt',
        '<=':'$lte'
    }
    const regEx=/\b(<|>|>=|=|<|<=)\b/g
    let filters=numericFilters.replace(regEx,(match)=>`-${operatorMap[match]}-`)
    const options=['price','rating']

    console.log(filters.split(','))
    filters=filters.split(',').forEach((item)=>{
    console.log(item)
        const [field ,operator,value]=item.split('-')
        if(options.includes(field)){
            console.log(options)
            queryObject[field]={[operator]:Number(value)}
            console.log(queryObject)
        }
    })
    console.log(queryObject)
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

