import React, { useEffect, useState } from 'react';

export default function SalesPeopleList(props) {
    const [salesPeople, setSalesPeople] = useState([]);
    const [filter, setFilter] = useState('');

    const handleFilterChange = (event) => setFilter(event.target.value);

    const getAll = async () => {
        const salesPeopleUrl = 'http://localhost:8090/api/salespeople/';
        const salesPeopleResponse = await fetch(salesPeopleUrl);

        if (salesPeopleResponse.ok) {
            const salesPeopleData = await salesPeopleResponse.json();
            console.log(salesPeopleData)
            setSalesPeople(salesPeopleData.salesPeople);
        }

    };

useEffect(() => {
    getAll();
}
, []);

return (
    <div className="container">
        <h1>Sales People Records</h1>
        <div className="mb-3">
            <select onChange={handleFilterChange} required name="salesPeople" id="salesPeople" value={filter} className="form-select">
                <option value="">All Sales People</option>
                {salesPeople.map((salesperson) => (
                    <option key={salesperson.id} value={salesperson.first_name}> {salesperson.first_name} </option>
                ))}
            </select>
        </div>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Employee ID</th>
                </tr>
            </thead>
            <tbody>
                {salesPeople
                    .filter((salesperson) => {
                        return filter === '' ? true : salesperson.first_name.includes(filter);
                    })
                    .map((salesperson) => (
                        <tr key={salesperson.employee_id}>
                            <td>{salesperson.first_name}</td>
                            <td>{salesperson.last_name}</td>
                            <td>{salesperson.employee_id}</td>
                        </tr>
                    ))}
            </tbody>
        </table>
    </div>
);
}
