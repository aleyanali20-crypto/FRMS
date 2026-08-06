import { BrowserRouter, Routes, Route } from "react-router-dom";

import Tenants from "./Pages/Admin/Tenants";
import Units from "./Pages/Admin/Units";
import Register from "./Pages/auth/Register";
import Login from "./Pages/auth/Login";
import Dashboard from "./Pages/Admin/Dashboard";
import TenantDashboard from "./Pages/tenant/Tenant";
import RentPayment from "./Pages/tenant/RentPayment";
import RentCollection from "./Pages/Admin/RentCollection";
import Expense from "./Pages/Admin/Expense";
import SuperAdminDashboard from "./Pages/SuperAdmin/SuperAdminDashboard";
import StaffManagement from "./Pages/SuperAdmin/StaffManagement";
import AccountantDashboard from "./Pages/Accountant/AccountantDashboard";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  return (
    <BrowserRouter>
      <Routes>

  {/* ================= PUBLIC ================= */}

  <Route path="/" element={<Login />} />
  {/* <Route path="/register" element={<Register />} /> */}

  {/* ================= SUPER ADMIN ================= */}

  <Route
    path="/superadmin/dashboard"
    element={
      <ProtectedRoute allowedRoles={["superadmin"]}>
        <SuperAdminDashboard />
      </ProtectedRoute>
    }
  />

  <Route
    path="/superadmin/staff"
    element={
      <ProtectedRoute allowedRoles={["superadmin"]}>
        <StaffManagement />
      </ProtectedRoute>
    }
  />

  <Route
    path="/superadmin/tenants"
    element={
      <ProtectedRoute allowedRoles={["superadmin"]}>
        <Tenants />
      </ProtectedRoute>
    }
  />

  <Route
    path="/superadmin/units"
    element={
      <ProtectedRoute allowedRoles={["superadmin"]}>
        <Units />
      </ProtectedRoute>
    }
  />

  <Route
    path="/superadmin/rent-collection"
    element={
      <ProtectedRoute allowedRoles={["superadmin"]}>
        <RentCollection />
      </ProtectedRoute>
    }
  />

  <Route
    path="/superadmin/expenses"
    element={
      <ProtectedRoute allowedRoles={["superadmin"]}>
        <Expense />
      </ProtectedRoute>
    }
  />

  {/* ================= ADMIN ================= */}

  <Route
    path="/admin/dashboard"
    element={
      <ProtectedRoute allowedRoles={["admin"]}>
        <Dashboard />
      </ProtectedRoute>
    }
  />

  <Route
    path="/admin/tenants"
    element={
      <ProtectedRoute allowedRoles={["admin"]}>
        <Tenants />
      </ProtectedRoute>
    }
  />

  <Route
    path="/admin/units"
    element={
      <ProtectedRoute allowedRoles={["admin"]}>
        <Units />
      </ProtectedRoute>
    }
  />

  <Route
    path="/admin/rent-collection"
    element={
      <ProtectedRoute allowedRoles={["admin"]}>
        <RentCollection />
      </ProtectedRoute>
    }
  />

  <Route
    path="/admin/expenses"
    element={
      <ProtectedRoute allowedRoles={["admin"]}>
        <Expense />
      </ProtectedRoute>
    }
  />

  {/* ================= ACCOUNTANT ================= */}

  <Route
    path="/accountant/dashboard"
    element={
      <ProtectedRoute allowedRoles={["accountant"]}>
        <AccountantDashboard />
      </ProtectedRoute>
    }
  />

  <Route
    path="/accountant/rent-collection"
    element={
      <ProtectedRoute allowedRoles={["accountant"]}>
        <RentCollection />
      </ProtectedRoute>
    }
  />

  <Route
    path="/accountant/expenses"
    element={
      <ProtectedRoute allowedRoles={["accountant"]}>
        <Expense />
      </ProtectedRoute>
    }
  />

  {/* ================= TENANT ================= */}

  <Route
    path="/tenant/dashboard"
    element={
      <ProtectedRoute allowedRoles={["tenant"]}>
        <TenantDashboard />
      </ProtectedRoute>
    }
  />

  <Route
    path="/tenant/rent"
    element={
      <ProtectedRoute allowedRoles={["tenant"]}>
        <RentPayment />
      </ProtectedRoute>
    }
  />

</Routes>
    </BrowserRouter>
  );
}

export default App;