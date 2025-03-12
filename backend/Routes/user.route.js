import { loginUser,registerUser } from '../Controllers/user.controller.js'
import express from 'express'


const userRouter=express.Router()


userRouter.post('/register',registerUser)

userRouter.post('/login',loginUser)




 
export default userRouter;