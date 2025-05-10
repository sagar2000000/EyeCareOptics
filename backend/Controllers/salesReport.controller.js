import salesReportModel from "../Models/sales.model.js";
import { products } from "../Models/product.model.js";

const getSalesReport = async (req, res) => {
  try {
    // Fetching all reports
    const reports = await salesReportModel.find({});

    if (!reports || reports.length === 0) {
      return res.status(404).json({ success: false, message: "No sales report found." });
    }

    // Formatting data for the frontend
    const formattedReports = await Promise.all(
      reports.map(async (report) => {
        const productReports = [];

        for (const [productId, stats] of report.products.entries()) {
          const product = await products.findById(productId);

          if (product) {
            productReports.push({
              productId,
              name: product.name,
              price: product.price,
              costPrice: product.costPrice,
              qtySold: stats.qtySold,
              totalRevenue: stats.totalRevenue,
              totalCost: stats.totalCost,
              profit: stats.totalRevenue - stats.totalCost,
              salesHistory: stats.salesHistory.map((entry) => ({
                date: entry.date,
                qty: entry.qty,
                revenue: entry.revenue,
                cost: entry.cost,
              })),
            });
          }
        }

        return {
          category: report.category,
          products: productReports,
        };
      })
    );

    res.status(200).json({
      success: true,
      report: formattedReports,
    });
  } catch (err) {
    console.error("Error fetching sales report:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export { getSalesReport };
