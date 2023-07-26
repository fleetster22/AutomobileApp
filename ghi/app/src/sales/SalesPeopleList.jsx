import React, { useEffect, useState } from 'react';

export default function SalesPeopleList() {
    const [salesPeople, setSalesPeople] = useState([]);

    const getSalespeople = async () => {
        const salesPeopleUrl = 'http://localhost:8090/api/salespeople/';
        try {
            const salesPeopleResponse = await fetch(salesPeopleUrl);

        if (salesPeopleResponse.ok) {
            const salesPeopleData = await salesPeopleResponse.json();
            setSalesPeople(salesPeopleData.salespeople);
        } else {
            return <div>Error fetching Salespeople</div>
        }
    } catch (error) {
            return <div>Error fetching Salespeople</div>
        }
    };

    const deleteSalesperson = async (id) => {
        const deleteUrl = `http://localhost:8090/api/salespeople/${id}`;
        try {
            const deleteResponse = await fetch(deleteUrl, {
                method: 'DELETE',
            });

        if (deleteResponse.ok) {
            getSalespeople();
        } else {
            return <div>Error deleting Salesperson</div>
        }
    } catch (error) {
            return <div>Error deleting Salesperson</div>
        }
    };


useEffect(() => {
    getSalespeople();
    deleteSalesperson();
}
, []);

return (
    <div className="container">
        <h1>Sales People Records</h1>
        <div className="mb-3">
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
                    .map((salesperson) => (
                        <tr key={salesperson.id}>
                            <td>{salesperson.first_name}</td>
                            <td>{salesperson.last_name}</td>
                            <td>{salesperson.employee_id}</td>
                            <td><button className="btn btn-danger" onClick={() => deleteSalesperson(salesperson.id)}>Delete</button></td>
                        </tr>
                    ))}
            </tbody>
        </table>
    </div>
);
}
