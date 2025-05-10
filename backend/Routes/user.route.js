import { loginUser,registerUser ,UserData} from '../Controllers/user.controller.js'
import express from 'express'


const userRouter=express.Router()


userRouter.post('/register',registerUser)

userRouter.post('/login',loginUser)
userRouter.get('/data',UserData)




 
export default userRouter;