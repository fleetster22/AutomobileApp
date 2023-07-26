import React, { useEffect, useState } from 'react';

export default function SalesList() {
  const [sales, setSales] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:8090/api/sales/');
      if (response.ok) {
        const salesData = await response.json();
        setSales(salesData.sales);
      }
    };

    fetchData();
  }, []);

  const deleteSale = async (id) => {
    const response = await fetch(`http://localhost:8090/api/sales/${id}`, { method: 'DELETE' });
    if (response.ok) {
      setSales(sales.filter((sale) => sale.id !== id));
    }
  };

  const handleFilterChange = (event) => setFilter(event.target.value);

  const filteredSales = filter
    ? sales.filter((sale) => sale.salesperson.first_name.includes(filter))
    : sales;

  return (
    <div className="container">
      <h1>Sales Records</h1>
      <div className="mb-3">
        <select
          onChange={handleFilterChange}
          required
          name="salespeople"
          id="salespeople"
          value={filter}
          className="form-select"
        >
          <option value="">All Salespeople</option>
          {sales.map((sale) => (
            <option key={sale.salesperson.employee_id} value={sale.salesperson.first_name}>
              {sale.salesperson.first_name}
            </option>
          ))}
        </select>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Salesperson Name</th>
            <th>Employee number</th>
            <th>Customer</th>
            <th>VIN</th>
            <th>Sale price</th>
          </tr>
        </thead>
        <tbody>
          {filteredSales
              .map((sale) => (
              <tr key={sale.id}>
                <td>{sale.salesperson.first_name}</td>
                <td>{sale.salesperson.employee_id}</td>
                <td>{sale.customer.last_name}</td>
                <td>{sale.automobile.vin}</td>
                <td>
                  <span>$</span>
                  {sale.automobile.price}
                </td>
                <td><button onClick={() => deleteSale(sale.id)}>Delete Sale</button></td>
              </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}
