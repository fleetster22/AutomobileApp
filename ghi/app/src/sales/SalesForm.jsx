import React, { useEffect, useState } from 'react';


export default function SalesForm() {
  const [automobile, setAutomobile] = useState('');
  const [salesperson, setSalesperson] = useState('');
  const [customer, setCustomer] = useState('');
  const [price, setPrice] = useState('');
  const [automobiles, setAutomobiles] = useState([]);
  const [salespeople, setSalespeople] = useState([]);
  const [customers, setCustomers] = useState([]);

  const getAll = async () => {
    const automobilesUrl = 'http://localhost:8090/api/automobiles/';
    const automobilesResponse = await fetch(automobilesUrl);
    if (automobilesResponse.ok) {
      const autoData = await automobilesResponse.json();
      setAutomobiles(Array.isArray(autoData.available_autos) ? autoData.available_autos : []);
    }

    const salesPersonsUrl = 'http://localhost:8090/api/salespeople/';
    const salesPersonsResponse = await fetch(salesPersonsUrl);
    if (salesPersonsResponse.ok) {
      const salesPersonData = await salesPersonsResponse.json();
      setSalespeople(Array.isArray(salesPersonData.sales_persons) ? salesPersonData.sales_persons : []);
    }

    const customersUrl = 'http://localhost:8090/api/customers/';
    const customersResponse = await fetch(customersUrl);
    if (customersResponse.ok) {
      const customerData = await customersResponse.json();
      setCustomers(Array.isArray(customerData.customers) ? customerData.customers : []);
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

    const selectedAutomobile = automobiles.find((auto) => auto.vin === automobile);
  if (selectedAutomobile && selectedAutomobile.sold) {
    alert('This automobile has already been sold');
    return;
}

    const data = {};
    data.automobile = automobile;
    data.salesperson = salesperson;
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
      setSalesperson('');
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
                onChange={(event) => setSalesperson(event.target.value)}
                required
                name="salesperson"
                id="salesperson"
                value={salesperson}
                className="form-select"
              >
                <option value="">Choose a sales person</option>
                {salespeople.map((salesperson) => {
                  return (
                    <option key={salesperson.id} value={salesperson.id}>
                      {salesperson.first_name}
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
                      {customer.first_name} {customer.last_name}
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
