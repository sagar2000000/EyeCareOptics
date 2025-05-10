import React, { useContext, useEffect, useState } from 'react';
import './RevenueReport.css';
import { StoreContext } from '../../context/StoreContext';

const RevenueReport = () => {
  const { reportData, loadingReport } = useContext(StoreContext);

  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    let data = [...reportData];

    if (selectedCategory !== 'All') {
      data = data.filter(report => report.category === selectedCategory);
    }

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      data = data.map(report => ({
        ...report,
        products: report.products.map(prod => ({
          ...prod,
          salesHistory: prod.salesHistory.filter(sale => {
            const saleDate = new Date(sale.date);
            return saleDate >= start && saleDate <= end;
          }),
        })).filter(prod => prod.salesHistory.length > 0),
      })).filter(report => report.products.length > 0);
    }

    setFilteredData(data);
  }, [selectedCategory, startDate, endDate, reportData]);

  const getProductTotals = (salesHistory) => {
    return salesHistory.reduce((totals, sale) => {
      totals.revenue += sale.revenue;
      totals.cost += sale.cost;
      return totals;
    }, { revenue: 0, cost: 0 });
  };

  const getCategoryTotals = (products) => {
    return products.reduce((totals, prod) => {
      const { revenue, cost } = getProductTotals(prod.salesHistory);
      totals.cost += cost;
      totals.sales += revenue;
      totals.profit += (revenue - cost);
      return totals;
    }, { cost: 0, sales: 0, profit: 0 });
  };

  const totalAll = filteredData.reduce((all, report) => {
    const { cost, sales, profit } = getCategoryTotals(report.products);
    all.cost += cost;
    all.sales += sales;
    all.profit += profit;
    return all;
  }, { cost: 0, sales: 0, profit: 0 });

  const downloadCSV = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    if (selectedCategory === 'All') {
      csvContent += 'Category,Nrs. Cost,Nrs. Sales,Nrs. Profit\n';
      filteredData.forEach(({ category, products }) => {
        const { cost, sales, profit } = getCategoryTotals(products);
        csvContent += `${category},${cost},${sales},${profit}\n`;
      });
    } else {
      csvContent += 'Category,Product,Nrs. Cost,Nrs. Sales,Nrs. Profit\n';
      filteredData.forEach(({ category, products }) => {
        products.forEach((prod) => {
          const { revenue, cost } = getProductTotals(prod.salesHistory);
          csvContent += `${category},${prod.name},${cost},${revenue},${revenue - cost}\n`;
        });
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'revenue_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const uniqueCategories = ['All', ...new Set(reportData.map(r => r.category))];

  if (loadingReport) return <div className="revenue-report-container">Loading...</div>;

  return (
    <div className="revenue-report-container">
      <div className="report-header">
        <h2>Revenue Report</h2>
        <button className="download-btn" onClick={downloadCSV}>Download CSV</button>
      </div>

      <div className="filters" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <div className="filter-item">
          <label htmlFor="start-date">Start Date</label>
          <input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="filter-item">
          <label htmlFor="end-date">End Date</label>
          <input
            id="end-date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="filter-item">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {uniqueCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <table className="revenue-table">
        <thead>
          <tr>
            <th>{selectedCategory === 'All' ? 'Category' : 'Product'}</th>
            {selectedCategory !== 'All' && <th>Category</th>}
            <th>Nrs. Cost</th>
            <th>Nrs. Sales</th>
            <th>Nrs. Profit</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(({ category, products }) => {
            if (selectedCategory === 'All') {
              const { cost, sales, profit } = getCategoryTotals(products);
              return (
                <tr key={category}>
                  <td>{category}</td>
                  <td>{cost.toFixed(2)}</td>
                  <td>{sales.toFixed(2)}</td>
                  <td>{profit.toFixed(2)}</td>
                </tr>
              );
            } else {
              return products.map(prod => {
                const { revenue, cost } = getProductTotals(prod.salesHistory);
                const profit = revenue - cost;
                return (
                  <tr key={prod.productId}>
                    <td>{prod.name}</td>
                    <td>{category}</td>
                    <td>{cost.toFixed(2)}</td>
                    <td>{revenue.toFixed(2)}</td>
                    <td>{profit.toFixed(2)}</td>
                  </tr>
                );
              });
            }
          })}
        </tbody>
        <tfoot>
          <tr className="summary">
            <td>Total</td>
            {selectedCategory !== 'All' && <td></td>}
            <td>{totalAll.cost.toFixed(2)}</td>
            <td>{totalAll.sales.toFixed(2)}</td>
            <td>{totalAll.profit.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default RevenueReport;
