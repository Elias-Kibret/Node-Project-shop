require('dotenv').config()
const connectDB=require('./db/connect')
const Product=require('./models/product')

const jsonProducts=require('./products.json')

const start =async ()=>{
    try{
        console.log(process.env.MONGO_URI)
        await connectDB(process.env.MONGO_URI)
        await Product.deleteMany()
        await Product.create(jsonProducts)
        console.log('success')
        process.exit(0)
    }
    catch(error){
    console.log(error)
    }
}
start()