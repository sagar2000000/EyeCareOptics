import mongoose from 'mongoose'



export const dbConnection = async () =>{
  try {
   await mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("DB connected sucessfully")
   })
 
  } catch (error) {
    console.log('error in db con',error)
  }



}
