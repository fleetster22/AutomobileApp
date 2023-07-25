import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AutomobileForm() {
  const navigate = useNavigate();
  const [models, setModels] = useState([]);
  const [vin, setVin] = useState('');
  const [color, setColor] = useState('');
  const [year, setYear] = useState(null);
  const [model_id, setModelId] = useState(null);

  const handleVinChange = (event) => {
    setVin(event.target.value);
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(Number(event.target.value));
  };

  const handleModelIdChange = (event) => {
    setModelId(Number(event.target.value));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      vin,
      color,
      year,
      model_id
    };


    const automobileUrl = `http://localhost:8100/api/automobiles/`;
    const fetchConfig = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(automobileUrl, fetchConfig);
    const responseData = await response.json();

    if (response.ok) {
      setVin('');
      setColor('');
      setYear(null);
      setModelId(null);
      navigate('/automobiles/');
    }
  };

  const fetchData = async () => {
    const url = 'http://localhost:8100/api/models/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setModels(data.models);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1 className="text-center mt-4">Add Automobile</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    onChange={handleVinChange}
                    value={vin}
                    placeholder="VIN"
                    type="text"
                    name="vin"
                    id="vin"
                    className="form-control"
                  />
                  <label htmlFor="vin">VIN</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    onChange={handleColorChange}
                    value={color}
                    placeholder="Color"
                    type="text"
                    name="color"
                    id="color"
                    className="form-control"
                  />
                  <label htmlFor="color">Color</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    onChange={handleYearChange}
                    value={year || ''}
                    placeholder="Year"
                    type="number"
                    name="year"
                    id="year"
                    className="form-control"
                  />
                  <label htmlFor="year">Year</label>
                </div>
                <div className="mb-3">
                  <select
                    onChange={handleModelIdChange}
                    value={model_id || ''}
                    required
                    id="model_id"
                    name="model_id"
                    className="form-select"
                  >
                    <option value="">Choose a Model</option>
                    {models.map((model) => (
                      <option key={model.id} value={model.id}>
                        {model.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button className="btn btn-primary">Add</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
);
}

export default AutomobileForm;
