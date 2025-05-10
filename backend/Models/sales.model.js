import mongoose from "mongoose";

const saleEntrySchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  qty: { type: Number, required: true },
  revenue: { type: Number, required: true },
  cost: { type: Number, required: true },
});

const productStatsSchema = new mongoose.Schema({
  qtySold: { type: Number, default: 0 },
  totalRevenue: { type: Number, default: 0 },
  totalCost: { type: Number, default: 0 },
  salesHistory: [saleEntrySchema], // ⬅️ New addition
});

const categoryReportSchema = new mongoose.Schema({
  category: { type: String, required: true, unique: true },
  products: {
    type: Map, // productId as key
    of: productStatsSchema,
  },
});

const salesReportModel = mongoose.models.salesReport || mongoose.model("salesReport", categoryReportSchema);
export default salesReportModel;
