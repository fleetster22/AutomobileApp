import React, { useState } from 'react';

function TechnicianForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [employeeId, setEmployeeId] = useState('');

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmployeeIdChange = (event) => {
    setEmployeeId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      employee_id: employeeId,
      first_name: firstName,
      last_name: lastName,
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
        setFirstName('');
        setLastName('');
        setEmployeeId('');
      } else {
        // Handle error if needed
      }
    } catch (error) {
      // Handle error if needed
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
                  onChange={handleFirstNameChange}
                  value={firstName}
                  placeholder="First Name"
                  type="text"
                  name="first_name"
                  id="first_name"
                  className="form-control"
                />
                <label htmlFor="first_name">First Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handleLastNameChange}
                  value={lastName}
                  placeholder="Last Name"
                  type="text"
                  name="last_name"
                  id="last_name"
                  className="form-control"
                />
                <label htmlFor="last_name">Last Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handleEmployeeIdChange}
                  value={employeeId}
                  placeholder="Employee ID"
                  required
                  type="text"
                  name="employee_id"
                  id="employee_id"
                  className="form-control"
                />
                <label htmlFor="employee_id">Employee ID</label>
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
