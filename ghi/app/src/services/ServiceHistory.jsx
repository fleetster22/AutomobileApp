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

  const fetchData = async () => {
    const listUrl = `http://localhost:8080/api/services/`;
    const response = await fetch(listUrl);

    if (response.ok) {
      const data = await response.json();
      setServices(data.service_appointments);
      setFilteredServices(data.service_appointments);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
              <td>{service.customer_name}</td>
              <td>{service.vip ? 'Yes' : 'No'}</td>
              <td>{new Date(service.date).toLocaleDateString()}</td>
              <td>
                {new Date(service.time).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })}
              </td>
              <td>{service.technician.name}</td>
              <td>{service.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ServiceHistory;
