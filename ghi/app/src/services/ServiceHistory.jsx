import React, { useEffect, useState } from 'react';

function ServiceHistory() {
  const [search, setSearch] = useState('');
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);

  const handleSearchChange = (event) => setSearch(event.target.value);

  const handleSearch = () => {
    const filtered = services.filter((service) => {
      if (!search) return true;
      return service.vin.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredServices(filtered);
  };

  const fetchTechnicianData = async (technicianId) => {
    const technicianUrl = `http://localhost:8080/api/technician/${technicianId}/`;
    try {
      const response = await fetch(technicianUrl);
      if (response.ok) {
        const data = await response.json();
        return data.technician;
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
        setFilteredServices(data.service_appointments);
      } else {
        // Handle error if needed
      }
    } catch (error) {
      // Handle error if needed
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const fetchTechnicianDataForEachService = async () => {
      if (services.length > 0) {
        const updatedServices = await Promise.all(
          services.map(async (service) => {
            if (service.technician_id) {
              const technicianData = await fetchTechnicianData(service.technician_id);
              if (technicianData) {
                return {
                  ...service,
                  technician: technicianData,
                };
              }
            }
            return service;
          })
        );
        setFilteredServices(updatedServices);
      }
    };

    fetchTechnicianDataForEachService();
  }, [services]);

  useEffect(() => {
    console.log(filteredServices); // Add this line to check the data for customer name
  }, [filteredServices]);

  return (
    <div className="container">
      <h1 className="text-center mt-4">Service history</h1>
      <div className="form-outline mb-4">
        <input
          onChange={handleSearchChange}
          type="search"
          className="form-control"
          id="datatable-search-input"
          placeholder="Search by VIN"
          style={{ maxWidth: '30ch' }}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div id="datatable"></div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Completed</th>
            <th>VIN</th>
            <th>Customer Name</th>
            <th>VIP</th>
            <th>Date</th>
            <th>Time</th>
            <th>Technician</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {filteredServices.map((service) => (
            <tr key={service.id} value={service.id}>
              <td>{service.completed ? 'Yes' : 'No'}</td>
              <td>{service.vin}</td>
              <td>{service.customer}</td>
              <td>{service.vip ? 'Yes' : 'No'}</td>
              <td>{new Date(service.date_time).toLocaleDateString()}</td>
              <td>
                {new Date(service.date_time).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })}
              </td>
              <td>
                {service.technician ? `${service.technician.last_name}, ${service.technician.first_name}` : 'N/A'}
              </td>
              <td>{service.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ServiceHistory;
