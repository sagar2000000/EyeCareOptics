import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    order_id: {
      type: String,
      required: true,
      unique: true, // Ensure uniqueness
    },
    fullname: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    items: {
      type:Object,
      required:true

    },
    amount: {
      required: true,
      type: Number,
    },
    region: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    orderedBy: {
      type: String, 
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["eSewa", "COD"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "COMPLETE", "FAILED", "REFUNDED"],
      default: "Pending",
    },
    date: {
      type: Date,
      default: Date.now,
    },
    delivery:{
      type:String,
      enum:["Processing","Completed"],
      default:"Processing"
    }
  },
  { timestamps: true }
);

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);
export default orderModel;

