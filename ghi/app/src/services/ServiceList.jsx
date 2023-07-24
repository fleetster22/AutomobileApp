import React, { useEffect, useState } from 'react';

function ServiceList() {
  const [services, setServices] = useState([]);

  const handleComplete = async (event) => {
    const serviceUrl = `http://localhost:8080/api/services/${event.id}/`;
    const fetchOptions = {
      method: 'put',
      body: JSON.stringify({ completed: true }),
      headers: {
        'Content-type': 'application/json',
      },
    };

    try {
      const serviceResponse = await fetch(serviceUrl, fetchOptions);
      if (serviceResponse.ok) {
        setServices((prevServices) => prevServices.filter((service) => service.id !== event.id));
      } else {
      }
    } catch (error) {
    }
  };

  const fetchData = async () => {
    const listUrl = `http://localhost:8080/api/services/`;
    try {
      const response = await fetch(listUrl);
      if (response.ok) {
        const data = await response.json();
        setServices(data.service_appointments);
      } else {
      }
    } catch (error) {
    }
  };

  async function deleteService(services_appointments) {
    const deleteUrl = `http://localhost:8080/api/services/${services_appointments.id}/`;
    try {
      const response = await fetch(deleteUrl, { method: 'delete' });
      if (response.ok) {
        setServices((prevServices) => prevServices.filter((service) => service.id !== services_appointments.id));
      } else {
      }
    } catch (error) {
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1 className="text-center mt-4">Service appointments</h1>
      <div className="table-responsive">
        <table className="table table-striped mt-4">
          <thead>
            <tr>
              <th>VIP</th>
              <th>VIN</th>
              <th>Customer name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Technician</th>
              <th>Reason</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {services
              .filter((service) => !service.completed)
              .map((service) => (
                <tr key={service.id}>
                  <td>{service.vip ? 'Yes' : 'No'}</td>
                  <td>{service.vin}</td>
                  <td>{service.customer_name}</td>
                  <td>{new Date(service.date).toLocaleDateString()}</td>
                  <td>
                    <div className="text-center" style={{ minWidth: '90px' }}>
                      {new Date(service.time).toLocaleString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })}
                    </div>
                  </td>
                  <td>{service.technician.name}</td>
                  <td>{service.reason}</td>
                  <td>
                    <button className="btn btn-success" onClick={() => handleComplete(service)}>
                      Complete
                    </button>
                  </td>
                  <td>
                  <button className="btn btn-danger" onClick={() => deleteService(service)}>
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );


}

export default ServiceList;
