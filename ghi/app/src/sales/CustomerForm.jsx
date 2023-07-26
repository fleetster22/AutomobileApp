import React, { useState } from 'react';


function CustomerForm() {
  const [first_name, setFirstName] = useState('');
  const handleFirstNameChange = (event) => setFirstName(event.target.value);

  const [last_name, setLastName] = useState('');
  const handleLastNameChange = (event) => setLastName(event.target.value);

  const [address, setAddress] = useState('');
  const handleAddressChange = (event) => setAddress(event.target.value);

  const [phoneNumber, setPhoneNumber] = useState('');

  const formatPhoneNumber = (inputValue) => {
    const cleanedValue = inputValue.replace(/\D/g, '');
    const match = cleanedValue.match(/^(\d{3})(\d{3})(\d{4})$/);

    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }

    return inputValue;
  };

  const handlePhoneChange = (event) => {
    const formattedValue = formatPhoneNumber(event.target.value);
    setPhoneNumber(formattedValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};

    data.first_name = first_name;
    data.last_name = last_name;
    data.address = address;
    data.phone_number = phoneNumber;

    const customerUrl = 'http://localhost:8090/api/customers/';
    const fetchConfig = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await fetch(customerUrl, fetchConfig);
      if (response.ok) {
        setFirstName('');
        setLastName('');
        setAddress('');
        setPhoneNumber('');
      } else {
      }
    } catch (error) {
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add a New customer</h1>
          <form onSubmit={handleSubmit} id="create-customer-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleFirstNameChange}
                placeholder="First Name"
                required
                type="text"
                first_name="first_name"
                id="first_name"
                value={first_name}
                className="form-control"
              />
              <label htmlFor="first_name">First Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleLastNameChange}
                placeholder="Last Name"
                required
                type="text"
                first_name="last_name"
                id="last_name"
                value={last_name}
                className="form-control"
              />
              <label htmlFor="last_name">Last Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleAddressChange}
                placeholder="Address"
                required
                type="text"
                first_name="address"
                id="address"
                value={address}
                className="form-control"
              />
              <label htmlFor="address">Address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handlePhoneChange}
                placeholder="123-123-1234"
                required
                type="tel"
                first_name="phone_number"
                id="phone_number"
                value={phoneNumber}
                className="form-control"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              />
              <label htmlFor="phone_number">Phone Number</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CustomerForm;
