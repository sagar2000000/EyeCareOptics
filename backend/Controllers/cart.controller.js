import UserModel from "../Models/user.model.js";

const  addToCart= async (req,res)=>{
 try {
  let userData=await UserModel.findById(req.body.userId)
  let cartData = await userData.cartData;
  if(!cartData[req.body.itemId]){
    cartData[req.body.itemId]=1
  }
  else{
    cartData[req.body.itemId]+=1;

  }
  await UserModel.findByIdAndUpdate(req.body.userId,{cartData});
  res.json({success:true,message:"Added to Cart"})

  
 } catch (error) {
  console.log(error);
  res.json({success:false,message:"Error"})
  
 }
}






const removeFromCart= async (req,res)=>{
  try {
    let userData = await UserModel.findById(req.body.userId)
      const cartData= await userData.cartData;
      if(cartData[req.body.itemId]>0){
          cartData[req.body.itemId]-=1

      }
      await UserModel.findByIdAndUpdate(req.body.userId,{cartData})
     res.json({success:true,message:"Removed from Cart"})
  } catch (error) {
    console.log(error)
    res.json({success:true,message:"Error"})
  }
}




const getCart = async (req,res)=>{
  try {
    let userData = await UserModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    res.json({success:true,cartData})

    
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
    
  }
}


export {addToCart,removeFromCart,getCart}