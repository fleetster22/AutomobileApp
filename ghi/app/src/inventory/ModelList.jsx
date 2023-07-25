import React, { useState, useEffect } from 'react';

function ModelList() {
  const [models, setModels] = useState([]);

  const fetchData = async () => {
    try {
      const url = 'http://localhost:8100/api/models/';
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setModels(data.models);
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
      <h1>Models</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Manufacturer</th>
            <th>Picture</th>
          </tr>
        </thead>
        <tbody>
          {models.map((model) => (
            <tr key={model.id}>
              <td>{model.name}</td>
              <td>{model.manufacturer.name}</td>
              <td>
                <img
                  style={{ width: 300, height: 190 }}
                  src={model.picture_url}
                  className="img-thumbnail"
                  alt=""
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ModelList;
