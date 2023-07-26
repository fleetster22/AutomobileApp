import React, { useEffect, useState } from 'react';


export default function SalesForm() {
  const [automobile, setAutomobile] = useState('');
  const [salesPerson, setSalesPerson] = useState('');
  const [customer, setCustomer] = useState('');
  const [price, setPrice] = useState('');

  const [automobiles, setAutomobiles] = useState([]);
  const [salesPersons, setSalesPersons] = useState([]);
  const [customers, setCustomers] = useState([]);

  const getAll = async () => {
    const automobilesUrl = 'http://localhost:8090/api/automobiles/';
    const automobilesResponse = await fetch(automobilesUrl);
    if (automobilesResponse.ok) {
      const autoData = await automobilesResponse.json();
      setAutomobiles(autoData.available_autos);
    }

    const salesPersonsUrl = 'http://localhost:8090/api/salespeople/';
    const salesPersonsResponse = await fetch(salesPersonsUrl);
    if (salesPersonsResponse.ok) {
      const salesPersonData = await salesPersonsResponse.json();
      setSalesPersons(salesPersonData.sales_persons);
    }

    const customersUrl = 'http://localhost:8090/api/customers/';
    const customersResponse = await fetch(customersUrl);
    if (customersResponse.ok) {
      const customerData = await customersResponse.json();
      setCustomers(customerData.customers);
    }

  };

  useEffect(() => {
    getAll();
  }, []);

  const formatSalesPrice = (value) => {
    const numericValue = value.replace(/[^\d.]/g, '');
    const parts = numericValue.split('.');
    const wholePart = parts[0];
    const decimalPart = parts[1] || '';
    const formattedWholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const formattedDecimalPart = decimalPart.slice(0, 2);
    const formattedValue = `${formattedWholePart}.${formattedDecimalPart}`;
    return formattedValue;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.automobile = automobile;
    data.sales_person = salesPerson;
    data.customer = customer;
    data.price = formatSalesPrice(price);

    const salesRecordUrl = 'http://localhost:8090/api/sales/';
    const fetchConfig = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(salesRecordUrl, fetchConfig);
    if (response.ok) {
      setAutomobile('');
      setSalesPerson('');
      setCustomer('');
      setPrice('');
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Record a new sale</h1>
          <form onSubmit={handleSubmit} id="create-sales-form">
            <div className="mb-3">
              <select
                onChange={(event) => setAutomobile(event.target.value)}
                required
                name="automobile"
                id="automobile"
                value={automobile}
                className="form-select"
              >
                <option value="">Choose an automobile</option>
                {automobiles.map((automobile) => {
                  return (
                    <option key={automobile.vin} value={automobile.vin}>
                      {automobile.vin}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-3">
              <select
                onChange={(event) => setSalesPerson(event.target.value)}
                required
                name="sales_person"
                id="sales_person"
                value={salesPerson}
                className="form-select"
              >
                <option value="">Choose a sales person</option>
                {salesPersons.map((salesPerson) => {
                  return (
                    <option key={salesPerson.id} value={salesPerson.id}>
                      {salesPerson.first_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-3">
              <select
                onChange={(event) => setCustomer(event.target.value)}
                required
                name="customer"
                id="customer"
                value={customer}
                className="form-select"
              >
                <option value="">Choose a customer</option>
                {customers.map((customer) => {
                  return (
                    <option key={customer.id} value={customer.id}>
                      {customer.last_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={(event) => setPrice(event.target.value)}
                placeholder="Sales price"
                required
                type="text"
                name="price"
                id="price"
                value={price}
                className="form-control"
              />
              <label htmlFor="price">Sales price</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}
