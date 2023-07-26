import React, { useEffect, useState } from 'react';

export default function CustomerList(props) {
  const [customers, setCustomers] = useState([]);
  const [filter, setFilter] = useState('');

  const handleFilterChange = (event) => setFilter(event.target.value);

  const getAll = async () => {
    const customersUrl = 'http://localhost:8090/api/customers/';
    const customersResponse = await fetch(customersUrl);

    if (customersResponse.ok) {
      const customersData = await customersResponse.json();
      setCustomers(customersData.customers);
    }

  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div className="container">
      <h1>Customer Records</h1>
      <div className="mb-3">
        <select
          onChange={handleFilterChange}
          required
          name="customers"
          id="customers"
          value={filter}
          className="form-select"
        >
          <option value="">All Customers</option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.last_name}>
              {customer.last_name}
            </option>
          ))}
        </select>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {customers
            .filter((customer) => {
              return filter === '' ? true : customer.last_name.includes(filter);
            })
            .map((customer) => (
              <tr key={customer.id}>
                <td>{customer.first_name}</td>
                <td>{customer.last_name}</td>
                <td>{customer.address}</td>
                <td>{customer.phone}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
