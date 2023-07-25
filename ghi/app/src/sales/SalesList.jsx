import React, { useEffect, useState } from 'react';

export default function SalesList() {
  const [load, setLoad] = useState(false);
  const [salesPersons, setSalesPersons] = useState([]);
  const [salesRecords, setSalesRecords] = useState([]);
  const [filter, setFilter] = useState('');

  const handleFilterChange = (event) => setFilter(event.target.value);

  const getAll = async () => {
    const salesUrl = 'http://localhost:8090/api/sales/';
    const salesResponse = await fetch(salesUrl);

    if (salesResponse.ok) {
      const salesData = await salesResponse.json();
      setSalesRecords(salesData.sales_records);
    }

    const salesPersonUrl = 'http://localhost:8090/api/salespeople/';
    const personResponse = await fetch(salesPersonUrl);

    if (personResponse.ok) {
      const salesPersonData = await personResponse.json();
      setSalesPersons(salesPersonData.sales_persons);
    }

    if (true) {
      setLoad(!load);
    }
  };

  useEffect(() => {
    getAll();
  }, [load]);

  return (
    <div className="container">
      <h1>Sales Records</h1>
      <div className="mb-3">
        <select
          onChange={handleFilterChange}
          required
          name="sales_persons"
          id="sales_persons"
          value={filter}
          className="form-select"
        >
          <option value="">All Salespeople</option>
          {salesPersons.map((salesPerson) => (
            <option key={salesPerson.id} value={salesPerson.name}>
              {salesPerson.name}
            </option>
          ))}
        </select>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Sales person</th>
            <th>Employee number</th>
            <th>Customer</th>
            <th>VIN</th>
            <th>Sale price</th>
          </tr>
        </thead>
        <tbody>
          {salesRecords
            .filter((salesRecord) => {
              return filter === '' ? salesRecord : salesRecord.sales_person.name.includes(filter);
            })
            .map((salesRecord) => (
              <tr key={salesRecord.id}>
                <td>{salesRecord.sales_person.name}</td>
                <td>{salesRecord.sales_person.employee_id}</td>
                <td>{salesRecord.customer.last_name}</td>
                <td>{salesRecord.automobile.vin}</td>
                <td>
                  <span>$</span>
                  {salesRecord.price}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
