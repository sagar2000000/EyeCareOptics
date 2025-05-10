import express from "express";
import { getSalesReport,  } from "../Controllers/salesReport.controller.js";

const reportRouter = express.Router();

// Fetch complete sales report (used in frontend filtering)
reportRouter.get("/sales", getSalesReport);




export default reportRouter;
