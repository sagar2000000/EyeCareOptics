import express from "express";
import { listOrders,userOrders,updateDelivery } from "../Controllers/orders.controller.js";



 export const orderRouter = express.Router()

orderRouter.get("/list-orders",listOrders);
orderRouter.post("/user-orders",userOrders);
orderRouter.post("/update-delivery",updateDelivery);










