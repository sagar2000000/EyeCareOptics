import express from 'express'
import { addToCart,removeFromCart,getCart } from '../Controllers/cart.controller.js'
import authMiddleware from '../Middleware/auth.js'

const cartRouter=express.Router()

cartRouter.post("/add",authMiddleware,addToCart)
cartRouter.post("/remove",authMiddleware,removeFromCart)
cartRouter.post("/get",authMiddleware,getCart)



export default cartRouter