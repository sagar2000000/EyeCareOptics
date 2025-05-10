import UserModel from '../Models/user.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'




const loginUser=async(req,res)=>{
  const {email,password}=req.body
  try {
    const user= await UserModel.findOne({email})
  
    if(!user){
      return res.json({success:false,message:"User doesnt exists"})
    }

     const isMatch=await bcrypt.compare(password,user.password)
    if (!isMatch){
      return res.json({success:false,message:"Invalid credentials"})
    }
    const token=createToken(user._id)
    res.json({success:true,token})

    
    
  } catch (error) {
    console.log(error)
    res.json({success:false,message:"error",})
    
  }


}
const createToken=(id)=>{
return jwt.sign({id},process.env.JWT_SECRET)
}




const registerUser=async (req,res)=>{
   const {name,password,email}=req.body
try {
    const exists=await UserModel.findOne({email})
    if (exists) {

      return res.json({success:false,message:"User with this email already exists"})
      
    } 
    if(!validator.isEmail(email)){
      return res.json({success:false,message:"Please enter a valid email"})
    }
    if(password.length<8){
      return res.json({success:false ,message:"Please enter a strong password"})
    }

   

    const salt=await bcrypt.genSalt(10)
    const hashedPassword= await bcrypt.hash(password,salt)
     

    const newUser=new UserModel({
      name,
      email,
      password:hashedPassword
    })

    const user=await newUser.save()
    const token=createToken(user._id)
    res.json({success:true,token})


} catch (error) {
  console.log(error)
  res.json({success:false,message:"Error"})
}
}
const UserData = async (req, res) => {
  try {
   
    const users = await UserModel.find({}, 'name email');
    
   
    return res.json({success:true,users});
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ message: "Error fetching user data", error: error.message });
  }
};


export  {loginUser,registerUser,UserData}