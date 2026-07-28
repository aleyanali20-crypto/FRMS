import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tenants from "./Pages/Admin/Tenants";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;