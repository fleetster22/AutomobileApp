import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerList from './inventory/ManufacturerList';
import ManufacturerForm from './inventory/ManufacturerForm';
import TechnicianForm from './services/TechnicianForm';
import ServiceForm from './services/ServiceForm';
import ServiceList from './services/ServiceList';
import ServiceHistory from './services/ServiceHistory';

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
          <Route path="services">
            <Route index element={<ServiceList/>} />
            <Route path="new" element={<ServiceForm/>} />
            <Route path="history" element={<ServiceHistory/>} />
            <Route path="technician/new" element={<TechnicianForm/>} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
