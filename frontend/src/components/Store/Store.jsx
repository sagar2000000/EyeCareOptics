import React from 'react'
import './Store.css'
import { stores } from '../../assets/assets';
const Store = () => {
  return (
    <div className="main-store">

    
    <center className='center1'>STORE IMAGES</center>
    <center className='center2'>Come see the best of MountOptics at our stores.</center>
    <div className='store-container'>
    
     {stores.map((index)=>{
      return(

      
      <div className="store">
      <img src={index.image} alt="" />
      
     </div>
      )
     })}
    </div>
     
   </div>
);
};


export default Store