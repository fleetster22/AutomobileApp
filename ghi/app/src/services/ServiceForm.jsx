import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ServiceForm() {
  const navigate = useNavigate();
  const [technicians, setTechnicians] = useState([]);
  const [technician, setTechnician] = useState('');
  const [vin, setVin] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [reason, setReason] = useState('');

  const handleVinChange = (event) => {
    setVin(event.target.value);
  };
  const handleCustomerNameChange = (event) => {
    setCustomerName(event.target.value);
  };
  const handleDateTimeChange = (event) => {
    setDateTime(event.target.value);
  };
  const handleTechnicianChange = (event) => {
    setTechnician(event.target.value);
  };
  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      vin,
      customer: customerName,
      dateTime,
      technician,
      reason,
    };
    const serviceUrl = `http://localhost:8080/api/services/`;
    const fetchConfig = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(serviceUrl, fetchConfig);
    if (response.ok) {
      clearForm();
      navigate('/services/');
    }
  };

  const fetchData = async () => {
    const url = 'http://localhost:8080/api/technician/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setTechnicians(data.technicians);
    }
  };

  const clearForm = () => {
    setVin('');
    setCustomerName('');
    setDateTime('');
    setTechnician('');
    setReason('');
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create an Appointment</h1>
            <form onSubmit={handleSubmit} id="create-service-form">
              <div className="form-floating mb-3">
                <input
                  onChange={handleVinChange}
                  value={vin}
                  minLength="17"
                  maxLength="17"
                  placeholder="Vin"
                  type="text"
                  name="vin"
                  id="vin"
                  className="form-control"
                />
                <label htmlFor="vin">Vin</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handleCustomerNameChange}
                  value={customerName}
                  placeholder="Name"
                  required
                  type="text"
                  name="customerName"
                  id="customerName"
                  className="form-control"
                />
                <label htmlFor="customerName">Customer name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handleDateTimeChange}
                  value={dateTime}
                  placeholder="Date and Time"
                  type="datetime-local"
                  name="dateTime"
                  id="dateTime"
                  className="form-control"
                />
                <label htmlFor="dateTime">Date and Time</label>
              </div>
              <div className="mb-3">
                <select
                  onChange={handleTechnicianChange}
                  value={technician}
                  required
                  id="technician"
                  name="technician"
                  className="form-select"
                >
                  <option value="">Choose a Technician</option>
                  {technicians.map((tech) => (
                    <option key={tech.id} value={tech.id}>
                      {tech.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handleReasonChange}
                  value={reason}
                  placeholder="Reason"
                  type="text"
                  name="reason"
                  id="reason"
                  className="form-control"
                />
                <label htmlFor="reason">Reason</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceForm;
