import React, { useState, useEffect } from 'react';

function AllTechnicians() {
  const [technicians, setTechnicians] = useState([]);

  const fetchTechniciansData = async () => {
    const url = "http://localhost:8080/api/technician/";

    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setTechnicians(data.technicians);
      } else {
        // Handle error if needed
      }
    } catch (error) {
      // Handle error if needed
    }
  };

  useEffect(() => {
    fetchTechniciansData();
  }, []);

  return (
    <div className="container">
      <h1 className="text-center mt-4">All Technicians</h1>
      <div className="table-responsive">
        <table className="table table-striped mt-4">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>
            {technicians.map((technician) => (
              <tr key={technician.id}>
                <td>{technician.employee_id}</td>
                <td>{technician.first_name}</td>
                <td>{technician.last_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllTechnicians;
