import React, { useState } from 'react';

function TechnicianForm() {
  const [name, setName] = useState('');
  const [employeeNumber, setEmployeeNumber] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmployeeNumberChange = (event) => {
    setEmployeeNumber(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      employee_number: employeeNumber,
      name: name,
    };

    const techUrl = "http://localhost:8080/api/technician/";
    const fetchConfig = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
      },
    };

    try {
      const response = await fetch(techUrl, fetchConfig);
      if (response.ok) {
        setName('');
        setEmployeeNumber('');
      } else {
      }
    } catch (error) {
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a technician</h1>
            <form onSubmit={handleSubmit} id="create-technician-form">
              <div className="form-floating mb-3">
                <input
                  onChange={handleNameChange}
                  value={name}
                  placeholder="Name"
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                />
                <label htmlFor="name">Technician</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handleEmployeeNumberChange}
                  value={employeeNumber}
                  placeholder="Employee_number"
                  required
                  type="text"
                  name="employee_number"
                  id="employee_number"
                  className="form-control"
                />
                <label htmlFor="employee_number">Employee number</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TechnicianForm;
