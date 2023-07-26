import React, { useEffect, useState } from 'react';

export default function SalesList() {
  const [sales, setSales] = useState([]);


  const getSales = async () => {
    const salesUrl = 'http://localhost:8090/api/sales/';
    try {
      const salesResponse = await fetch(salesUrl);

      if (salesResponse.ok) {
        const salesData = await salesResponse.json();
        setSales(salesData.sales);
      } else {
        return <div>Error fetching Sales</div>;
      }
    } catch (error) {
      return <div>Error fetching Sales</div>;
    }
  };

  const deleteSale = async (id) => {
    const deleteUrl = `http://localhost:8090/api/sales/${id}`;
    try {
      const deleteResponse = await fetch(deleteUrl, {
        method: 'DELETE',
      });

      if (deleteResponse.ok) {
        getSales();
      } else {
        return <div>Error deleting Sale</div>;
      }
    } catch (error) {
      return <div>Error deleting Sale</div>;
    }
  };


  useEffect(() => {
    getSales();
    deleteSale();
  }, []);


  return (
    <div className="container">
      <h1>Sales Records</h1>
      <div className="mb-3">
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
          {sales
              .map((sale) => (
              <tr key={sale.id}>
                <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                <td>{sale.salesperson.employee_id}</td>
                <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                <td>{sale.automobile.vin}</td>
                <td>
                  <span>$</span>
                  {sale.automobile.price}
                </td>
                <td><button onClick={() => deleteSale(sale.id)} type="button" className="btn btn-danger">Delete</button></td>
              </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}
