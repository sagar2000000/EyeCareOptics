
import { products } from "../Models/product.model.js";
import salesReportModel from "../Models/sales.model.js";

products
const updateSalesReport = async (items) => {
  for (const [productId, qty] of Object.entries(items)) {
    const product = await products.findById(productId);
    if (!product) continue;

    const category = product.category;
    const revenue = product.price * qty;
    const cost = product.costPrice * qty;

    let report = await salesReportModel.findOne({ category });
    if (!report) {
      report = new salesReportModel({ category, products: {} });
    }

    const productStats = report.products.get(productId) || {
      qtySold: 0,
      totalRevenue: 0,
      totalCost: 0,
    };

    productStats.qtySold += qty;
    productStats.totalRevenue += revenue;
    productStats.totalCost += cost;

    report.products.set(productId, productStats);
    await report.save();
  }
};

export default updateSalesReport;
