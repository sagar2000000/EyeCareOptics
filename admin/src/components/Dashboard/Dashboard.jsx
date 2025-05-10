import React, { useContext } from "react";
import './Dashboard.css';
import { StoreContext } from "../../context/StoreContext";
import { Link } from "react-router-dom";

const Card = ({ title, value, percent, note, bgColor, icon, link }) => {
  const content = (
    <div className="card" style={{ backgroundColor: bgColor }}>
      <div className="card-icon">{icon}</div>
      <div className="card-content">
        <h3>{title}</h3>
        {value && <h1>{value}</h1>}
        {percent && note && (
          <p>
            {percent} <span>{note}</span>
          </p>
        )}
      </div>
    </div>
  );

  return link ? <Link to={link} className="card-link">{content}</Link> : content;
};

const Dashboard = () => {
  const { reportData, loadingReport } = useContext(StoreContext);

  const totalSales = reportData?.reduce((acc, category) => {
    return (
      acc +
      category.products.reduce((prodAcc, product) => {
        return prodAcc + (product.totalRevenue || 0);
      }, 0)
    );
  }, 0) || 0;

  const formattedSales = `Nrs.${totalSales.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  const cardData = [
    {
      title: "Users",
      link:"/users",
      bgColor: "#22c55e",
      icon: "👤"
    },
    {
      title: "View Orders",
      value: "",
      percent: "",
      note: "",
      bgColor: "#e879f9",
      icon: "🛒",
      link: "/orders"
    },
    {
      title: "Total Sales",
      value: loadingReport ? "Loading..." : formattedSales,
      percent: "",
      note: "",
      bgColor: "#3b82f6",
      icon: "💰"
    },
    {
      title: "View Product",
      value: "",
      percent: "",
      note: "",
      bgColor: "#38bdf8",
      icon: "🛍️",
      link: "/list"
    },
    {
      title: "Visual Report",
      value: "",
      percent: "",
      note: "",
      bgColor: "#a78bfa",
      icon: "📊",
      link: "/visual-report"
    },
    {
      title: "Revenue Report",
      value: "",
      percent: "",
      note: "",
      bgColor: "#f472b6",
      icon: "📈",
       link: "/revenue-report"
    },
    {
      title: "Add Product",
      value: "",
      percent: "",
      note: "",
      bgColor: "#fcd34d",
      icon: "➕🛍️",
      link: "/add"
    },
    {
      title: "Add Stock",
      value: "",
      percent: "",
      note: "",
      bgColor: "#34d399",
      icon: "📦➕",
      link: "/list"
    }
  ];

  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>
      <div className="cards-container">
        {cardData.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
