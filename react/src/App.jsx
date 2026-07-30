import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tenants from "./Pages/Admin/Tenants";
import Units from "./Pages/Admin/Units";
import Register from "./Pages/auth/Register";
import Login from "./Pages/auth/Login";
import Dashboard from "./Pages/Admin/Dashboard";
import TenantDashboard from "./Pages/tenant/Tenant";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/tenant/dashboard" element={<TenantDashboard />} />
        <Route path="/admin/tenants" element={<Tenants />} />
        <Route path="/admin/units" element={<Units />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;