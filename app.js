const express=require('express');
const app=express();
require('dotenv').config()
//async error

const notFoundMiddleware=require('./middleware/not-found')
const errorMiddleware=require('./middleware/error-handler')


//middleware
app.use(express.json()) 

app.get('/',(req,res)=>{
    res.send('<h1>Store API</h1><a href="/api/v1/products">Products Route</a>')
})


//product route

app.use(notFoundMiddleware)
app.use(errorMiddleware)


const port =process.env.PORT || 3000;

const start=async ()=>{
try{
  //connect to
  // await connectDB(process.env.MONGO_URI)
  app.listen(port,console.log(`server is listening on port ${port}`))
}
catch(err){
  console.log(err)  
}
}
start()