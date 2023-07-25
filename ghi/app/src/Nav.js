import React from "react";
import { NavLink } from "react-router-dom";

function Nav() {
  const generateDropdownItems = (items) => {
    return items.map((item) => (
      <li key={item.to}>
        <NavLink className="dropdown-item" to={item.to}>
          {item.label}
        </NavLink>
      </li>
    ));
  };

  const inventoryItems = [
    { to: "/manufacturers", label: "Manufacturer List" },
    { to: "/manufacturers/new", label: "New Manufacturer Form" },
  ];

  const salesItems = [
    { to: "/sales", label: "Sales Record List" },
    { to: "/customers", label: "Customer List" },
    { to: "/customers/new", label: "Create Customer Form" },
    { to: "/sales/new", label: "New Sale Form" },
    { to: "/salespeople/new", label: "Add Salesperson Form" },
  ];

  return (
    <nav className="navbar navbar-expand-lg bg-info navbar-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          CarCar
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <div
                className="btn btn-info dropdown-toggle"
                id="dropdownInventory"
                data-bs-toggle="dropdown"
              >
                Inventory
              </div>
              <ul className="dropdown-menu" aria-labelledby="dropdownInventory">
                {generateDropdownItems(inventoryItems)}
              </ul>
            </li>
            <li className="nav-item dropdown">
              <div
                className="btn btn-info dropdown-toggle"
                id="dropdownSales"
                data-bs-toggle="dropdown"
              >
                Sales
              </div>
              <ul className="dropdown-menu" aria-labelledby="dropdownSales">
                {generateDropdownItems(salesItems)}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
