import React, { useEffect, useState } from 'react';

function ServiceList() {
  const [services, setServices] = useState([]);
  const [technicianData, setTechnicianData] = useState({});

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
        // Handle error if needed
      }
    } catch (error) {
      // Handle error if needed
    }
  };

  const fetchTechnicianData = async (technicianId) => {
    const technicianUrl = `http://localhost:8080/api/technician/${technicianId}/`;
    try {
      const response = await fetch(technicianUrl);
      if (response.ok) {
        const data = await response.json();
        setTechnicianData(data.technician);
      } else {
        // Handle error if needed
      }
    } catch (error) {
      // Handle error if needed
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
        // Handle error if needed
      }
    } catch (error) {
      // Handle error if needed
    }
  };

  async function deleteService(service) {
    const deleteUrl = `http://localhost:8080/api/services/${service.id}/`;
    try {
      const response = await fetch(deleteUrl, { method: 'delete' });
      if (response.ok) {
        setServices((prevServices) => prevServices.filter((s) => s.id !== service.id));
      } else {
        // Handle error if needed
      }
    } catch (error) {
      // Handle error if needed
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (services.length > 0) {
      services.forEach((service) => {
        if (service.technician_id) {
          fetchTechnicianData(service.technician_id);
        }
      });
    }
  }, [services]);

  return (
    <div className="container">
      <h1 className="text-center mt-4">Service appointments</h1>
      <div className="table-responsive">
        <table className="table table-striped mt-4">
          <thead>
            <tr>
              <th>VIP</th>
              <th>VIN</th>
              <th>Customer</th>
              <th>Date & Time</th>
              <th>Technician</th>
              <th>Reason</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {services.length > 0 ? (
              services
                .filter((service) => !service.completed)
                .map((service) => (
                  <tr key={service.id}>
                    <td>{service.vip ? 'Yes' : 'No'}</td>
                    <td>{service.vin}</td>
                    <td>{service.customer}</td>
                    <td>
                      {new Date(service.date_time).toLocaleString([], {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })}
                    </td>
                    <td>
                      {technicianData.id === service.technician_id
                        ? `${technicianData.last_name}, ${technicianData.first_name}`
                        : 'N/A'}
                    </td>
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
                ))
            ) : (
              <tr>
                <td colSpan="8">No service appointments available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ServiceList;
