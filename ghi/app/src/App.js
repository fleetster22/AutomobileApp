import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerList from './inventory/ManufacturerList';
import ManufacturerForm from './inventory/ManufacturerForm';
import ModelList from './inventory/ModelList';
import ModelForm from './inventory/ModelForm';
import AutomobileList from './inventory/AutomobileList';
import AutomobileForm from './inventory/AutomobileForm';
import TechnicianForm from './services/TechnicianForm';
import ServiceForm from './services/ServiceForm';
import ServiceList from './services/ServiceList';
import ServiceHistory from './services/ServiceHistory';
import AllTechnicians from './services/AllTechnicians';
import CustomerForm from './sales/CustomerForm';
import SalesForm from './sales/SalesForm';
import SalesList from './sales/SalesList';
import SalespersonForm from './sales/SalespersonForm';
import CustomerList from './sales/CustomerList';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturers">
            <Route index element={<ManufacturerList />} />
            <Route path="new" element={<ManufacturerForm />} />
          </Route>
          <Route path="models">
            <Route index element={<ModelList />} />
            <Route path="new" element={<ModelForm />} />
          </Route>
          <Route path="automobiles">
            <Route index element={<AutomobileList />} />
            <Route path="new" element={<AutomobileForm />} />
          </Route>
          <Route path="services">
            <Route index element={<ServiceList />} />
            <Route path="new" element={<ServiceForm />} />
            <Route path="history" element={<ServiceHistory />} />
            <Route path="technician/new" element={<TechnicianForm />} />
            <Route path="all-technicians" element={<AllTechnicians />} />
          </Route>
          <Route path="sales">
            <Route index element={<SalesList />} />
            <Route path="new" element={<SalesForm />} />
            <Route path="salespeople/new" element={<SalespersonForm />} />
          </Route>
          <Route path="customers">
            <Route index element={<CustomerList />} />
            <Route path="new" element={<CustomerForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
