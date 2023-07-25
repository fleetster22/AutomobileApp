import React, { useEffect, useState } from 'react';

function ManufacturerList() {
  const [manufacturers, setManufacturers] = useState([]);

  const fetchData = async () => {
    const url = "http://localhost:8100/api/manufacturers/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      const sortedManufacturers = data.manufacturers.slice().sort((a, b) => a.name.localeCompare(b.name));
      setManufacturers(sortedManufacturers);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1>Manufacturers</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {manufacturers.map(manufacturer => (
            <tr key={manufacturer.id}>
              <td>{manufacturer.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManufacturerList;
