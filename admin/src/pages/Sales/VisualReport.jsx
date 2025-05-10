import React, { useState, useContext } from "react";
import "./VisualReport.css";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import { isWithinInterval } from "date-fns";
import { StoreContext } from "../../context/StoreContext";

const COLORS = [
  "#FFBB28", "#0088FE", "#00C49F", "#FF8042",
  "#A28BFE", "#FF6F91", "#6A89CC", "#F7B731"
];

function VisualReport() {
  const { reportData, list: productList, loadingReport } = useContext(StoreContext);
  const [category, setCategory] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filteredData = () => {
    return reportData.map((entry) => {
      const filteredProducts = entry.products.map((product) => {
        const filteredHistory = product.salesHistory.filter((sale) => {
          if (!startDate && !endDate) return true;

          const saleDate = new Date(sale.date);
          const start = startDate ? new Date(startDate) : new Date("1970-01-01");
          const end = endDate ? new Date(endDate) : new Date();

          return isWithinInterval(saleDate, { start, end });
        });

        const recalculated = filteredHistory.reduce(
          (acc, sale) => {
            acc.qtySold += sale.qty;
            acc.totalRevenue += sale.revenue;
            acc.totalCost += sale.cost;
            return acc;
          },
          { qtySold: 0, totalRevenue: 0, totalCost: 0 }
        );

        return {
          ...product,
          ...recalculated,
          salesHistory: filteredHistory,
        };
      });

      return {
        ...entry,
        products: filteredProducts.filter((p) => p.qtySold > 0),
      };
    }).filter((entry) => entry.products.length > 0 && (category === "all" || entry.category === category));
  };

  const pieData = () => {
    const productSummary = [];
    const categorySummary = {};

    filteredData().forEach((entry) => {
      if (category === "all" || entry.category === category) {
        entry.products.forEach((product) => {
          if (category === "all") {
            if (!categorySummary[entry.category]) categorySummary[entry.category] = 0;
            categorySummary[entry.category] += product.totalRevenue;
          } else {
            productSummary.push({
              name: product.name,
              value: product.totalRevenue,
            });
          }
        });
      }
    });

    if (category === "all") {
      return Object.keys(categorySummary).map((key) => ({
        name: key,
        value: categorySummary[key],
      }));
    }

    return productSummary;
  };

  const barData = () => {
    const result = {};

    filteredData().forEach((entry) => {
      if (category === "all" || entry.category === category) {
        entry.products.forEach((product) => {
          const productInfo = productList.find(p => p._id === product.productId);
          const productName = productInfo ? productInfo.name : product.productId;

          if (!result[product.productId]) {
            result[product.productId] = {
              name: productName,
              qtySold: 0,
              totalRevenue: 0,
              totalCost: 0,
            };
          }

          result[product.productId].qtySold += product.qtySold;
          result[product.productId].totalRevenue += product.totalRevenue || 0;
          result[product.productId].totalCost += product.totalCost || 0;
        });
      }
    });

    if (category !== "all") {
      return Object.values(result);
    }

    const categoryData = {
      sunglass: { qtySold: 0, totalRevenue: 0, totalCost: 0 },
      eyeglass: { qtySold: 0, totalRevenue: 0, totalCost: 0 },
      lens: { qtySold: 0, totalRevenue: 0, totalCost: 0 },
    };

    filteredData().forEach((entry) => {
      entry.products.forEach((product) => {
        if (entry.category === "sunglass") {
          categoryData.sunglass.qtySold += product.qtySold;
          categoryData.sunglass.totalRevenue += product.totalRevenue || 0;
          categoryData.sunglass.totalCost += product.totalCost || 0;
        } else if (entry.category === "eyeglass") {
          categoryData.eyeglass.qtySold += product.qtySold;
          categoryData.eyeglass.totalRevenue += product.totalRevenue || 0;
          categoryData.eyeglass.totalCost += product.totalCost || 0;
        } else if (entry.category === "lens") {
          categoryData.lens.qtySold += product.qtySold;
          categoryData.lens.totalRevenue += product.totalRevenue || 0;
          categoryData.lens.totalCost += product.totalCost || 0;
        }
      });
    });

    return [
      { name: "Sunglasses", ...categoryData.sunglass },
      { name: "Eyeglasses", ...categoryData.eyeglass },
      { name: "Lenses", ...categoryData.lens },
    ];
  };

  if (loadingReport) return <div className="sales-report-container">Loading Report...</div>;

  const salesReportData = barData();
  const netProfit = salesReportData.reduce((acc, curr) => acc + curr.totalRevenue - curr.totalCost, 0);

  return (
    <div className="sales-report-container">
      <h2>Visual Reports</h2>

      <div className="filters">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <select onChange={(e) => setCategory(e.target.value)} value={category}>
          <option value="all">All Categories</option>
          <option value="sunglass">Sunglasses</option>
          <option value="eyeglass">Eyeglasses</option>
          <option value="lens">Lenses</option>
        </select>
      </div>

      <div className="charts-section">
        <div className="chart-box">
          <h3>{category === "all" ? "Revenue per Category (Pie Chart)" : "Revenue per Product (Pie Chart)"}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData()}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                dataKey="value"
                label
              >
                {pieData().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h3>{category === "all" ? "Quantity Sold by Category (Bar Chart)" : `${category.charAt(0).toUpperCase() + category.slice(1)} Sales`}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData()}>
              <XAxis
                dataKey="name"
                angle={-25}
                textAnchor="end"
                interval={0}
                height={90}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="qtySold" name="Quantity Sold">
                {barData().map((entry, index) => (
                  <Cell key={`bar-cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="lower-section">
        <div className="chart-box">
          <div className="sales-report-header">
            <h3>Sales Report</h3>
          </div>
          <div className="net-profit">
            <p>Net Profit</p>
            <h2>Nrs. {netProfit}</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesReportData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend verticalAlign="top" />
              <Bar dataKey="totalRevenue" fill="#f59e0b" name="Income" />
              <Bar dataKey="totalCost" fill="#3b82f6" name="Cost of Sales" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default VisualReport;
