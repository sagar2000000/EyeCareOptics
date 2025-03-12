import express from 'express'
import dotenv from 'dotenv';
import { dbConnection } from './db/db.js';
import bodyParser from 'body-parser';
import cors from 'cors'
import { esewaRouter } from './Routes/esewa.route.js';
import { CodController } from './Controllers/cod.controller.js';
import { productRouter } from './Routes/product.route.js';
import { orderRouter } from './Routes/order.route.js';
import userRouter from './Routes/user.route.js';
import cartRouter from './Routes/cart.route.js';


dotenv.config();
const port = process.env.PORT || 4000
const app = express();
app.use(bodyParser.json())
app.use(cors())
dbConnection()



app.get('/',(req,res)=>{
  res.send("hello")
  console.log("hello i am at landing page")
  
})


app.listen(port,()=>{
  console.log(`http://localhost:${port}`)
})

app.use('/esewa',esewaRouter)
app.use('/cod',CodController)
app.use('/product',productRouter)
app.use('/user',userRouter)
app.use('/cart',cartRouter)
app.use("/order",orderRouter)
app.use("/images",express.static("uploads"))
