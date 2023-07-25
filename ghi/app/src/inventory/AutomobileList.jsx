import React, { useEffect, useState } from 'react';

function AutomobileList() {
  const [automobiles, setAutomobiles] = useState([]);

  const fetchData = async () => {
    const listUrl = `http://localhost:8100/api/automobiles/`;
    try {
      const response = await fetch(listUrl);
      if (response.ok) {
        const data = await response.json();
        setAutomobiles(data.autos);
      } else {
      }
    } catch (error) {
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1 className="text-center mt-4">Automobiles</h1>
      <div className="table-responsive">
        <table className="table table-striped mt-4">
          <thead>
            <tr>
              <th>VIN</th>
              <th>Color</th>
              <th>Year</th>
              <th>Model</th>
              <th>Manufacturer</th>
            </tr>
          </thead>
          <tbody>
            {automobiles.map((automobile) => (
              <tr key={automobile.vin}>
                <td>{automobile.vin}</td>
                <td>{automobile.color}</td>
                <td>{automobile.year}</td>
                <td>{automobile.model.name}</td>
                <td>{automobile.model.manufacturer.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AutomobileList;
