import Dashboard from "../Pages/Admin/Dashboard";
import AccountantDashboard from "../Pages/Accountant/AccountantDashboard";
import SuperAdminDashboard from "../Pages/SuperAdmin/SuperAdminDashboard";
import TenantDashboard from "../Pages/tenant/Tenant";

const RoleDashboard = () => {
  const role = localStorage.getItem("role");

  switch (role) {
    case "superadmin":
      return <SuperAdminDashboard />;

    case "admin":
      return <Dashboard />;

    case "accountant":
      return <AccountantDashboard />;

    case "tenant":
      return <TenantDashboard />;

    default:
      return <h2 className="text-center mt-10">Access Denied</h2>;
  }
};

export default RoleDashboard;