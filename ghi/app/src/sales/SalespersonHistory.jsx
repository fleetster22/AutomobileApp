import React, { useState, useEffect } from "react";

export default function SalespersonHistory() {
    const [sales, setSales] = useState([]);
    const [filteredSales, setFilteredSales] = useState([]);
    const [search, setSearch] = useState("");

    const handleSearchChange = (event) => setSearch(event.target.value);

    const handleSearch = () => {
        setFilteredSales(sales.filter(sale => !search || sale.salesperson.first_name.includes(search)));
    }
    const fetchSalespersonData = async (id) => {
        const salespersonUrl = `http://localhost:8090/api/salespeople/${id}/`;
        try {
            const response = await fetch(salespersonUrl);
            if (response.ok) {
                const data = await response.json();
                return data.salesperson;
            } else {
                return alert("Error fetching salesperson data");
            }
        } catch (error) {
            return alert("Error fetching salesperson data");
        }
    };

    const fetchData = async () => {
        const url = `http://localhost:8090/api/sales/`;
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setSales(data.sales);
                setFilteredSales(data.sales);
            } else {

                return alert("Error fetching sales data");
            }
        } catch (error) {
            return alert("Error fetching sales data");
        }
    };

    useEffect(() => {
        fetchData();
    }
    , []);

    useEffect(() => {
        if (sales.length > 0) {
            sales.forEach((sale) => {
                if (sale.salesperson_id) {
                    fetchSalespersonData(sale.salesperson_id).then((salesperson) => {
                        sale.salesperson = salesperson;
                        setSales((prevSales) => [...prevSales]);
                    });
                }
            });

        }
    }, [sales]);



    return (
        <div className="container">
             <h1 className="text-center mt-4">Sales history</h1>
      <div className="form-outline mb-4">
      <input
    type="search"
    id="sales-search-input"
    className="form-control"
    placeholder="Search by Employee First Name"
    onChange={(event) => {
        handleSearchChange(event);
        handleSearch();
    }}
/>
        </div>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Salesperson</th>
                    <th>Customer</th>
                    <th>VIN</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {filteredSales.map((sale) => (
                    <tr key={sale.id}>
                        <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                        <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                        <td>{sale.vin}</td>
                        <td>{sale.price}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    );
}
