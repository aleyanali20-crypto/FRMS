import AdminLayout from "../../layouts/AdminLayout";
import DashboardCard from "../../components/layout/DashboardCard";

const Dashboard = () => {
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <DashboardCard
          title="Total Rent"
          value="18,500PKR"
          color="#2563EB"
        />

        <DashboardCard
          title="Cash In Hand"
          value="6,200PKR"
          color="#16A34A"
        />

        <DashboardCard
          title="Pending Payments"
          value="7"
          color="#F59E0B"
        />

        <DashboardCard
          title="Active Agreements"
          value="24"
          color="#DC2626"
        />
      </div>
    </AdminLayout>
  );
};

export default Dashboard;