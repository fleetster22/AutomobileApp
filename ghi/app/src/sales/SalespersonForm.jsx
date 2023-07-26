import React, { useState } from 'react';

export default function SalesPersonForm() {
  const [first_name, setFirstName] = useState('');
  const handleFirstNameChange = (event) => setFirstName(event.target.value);

  const [last_name, setLastName] = useState('');
  const handleLastNameChange = (event) => setLastName(event.target.value);

  const [employeeId, setEmployeeId] = useState('');
  const handleEmployeeIdChange = (event) => setEmployeeId(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};
    data.first_name = first_name;
    data.last_name = last_name;
    data.employee_id = employeeId;

    const salespersonUrl = 'http://localhost:8090/api/salespeople/';
    const fetchConfig = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(salespersonUrl, fetchConfig);
    if (response.ok) {
      setFirstName('');
      setLastName('');
      setEmployeeId('');
    }
  };

    return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new sales person</h1>
          <form onSubmit={handleSubmit} id="create-sales-person-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleFirstNameChange}
                placeholder="First Name"
                required
                type="text"
                name="first_name"
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
                name="last_name"
                id="last_name"
                value={last_name}
                className="form-control"
              />
              <label htmlFor="last_name">Last Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleEmployeeIdChange}
                placeholder="Employee ID Number"
                required
                type="number"
                first_name="employee_id"
                name="employee_id"
                value={employeeId}
                className="form-control"
              />
              <label htmlFor="employee_id">Employee Number</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}
