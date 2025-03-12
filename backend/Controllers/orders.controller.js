import orderModel from "../Models/order.model.js";



const  listOrders = async(req,res) =>{

  try {
    const orders = await orderModel.find({})
  
    console.log(orders)
  
      return res.status(200).json({
        success:true,
        orderlist:orders,
        message:"Orders fetched successfully"
      })
      

    
   
  } catch (error) {
    return res.status(400).json({
      success:false,
      message:"Error while fetching orders"
    })
    
  }

}
const  userOrders = async(req,res) =>{
  try {
    const {userEmail} = req.body;
    
    const userOrder = await orderModel.find({orderedBy:userEmail});
    console.log(userOrder)

    return res.status(200).json({
      success:true,
      userOrder:userOrder,
      message:"Orders fetched successfully"
    })
    
  } catch (error) {
    return  res.status(499).json("Error while fetching orders")
    console.log("Error while fetching userOrders",error)
    
  }
}





export {listOrders,userOrders}