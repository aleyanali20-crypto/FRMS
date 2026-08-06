import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import API from "../../api/tenantApi";
import IncomeChart from "../../components/dashboard/IncomeChart";
import ExpenseChart from "../../components/dashboard/ExpenseChart";

const Dashboard = () => {
  const token = localStorage.getItem("token");

  const [dashboard, setDashboard] = useState({
  totalTenants: 0,
  totalUnits: 0,
  totalRent: 0,
  totalExpense: 0,
  cashInHand: 0,
  pendingPayments: 0,
  recentPayments: [],
  recentExpenses: [],
  monthlyRent: [],
  monthlyExpense: [],
});

  const fetchDashboard = async () => {
    try {
      const res = await API.get("/dashboard/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDashboard(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
  <AdminLayout>

    <div className="p-6">

      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>

      {/* ===== Statistics Cards ===== */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Total Tenants */}

        <div className="bg-blue-600 text-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg">Total Tenants</h2>
          <h1 className="text-4xl font-bold mt-4">
            {dashboard.totalTenants}
          </h1>
        </div>

        {/* Total Units */}

        <div className="bg-green-600 text-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg">Total Units</h2>
          <h1 className="text-4xl font-bold mt-4">
            {dashboard.totalUnits}
          </h1>
        </div>

        {/* Total Rent */}

        <div className="bg-purple-600 text-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg">Total Rent Collection</h2>
          <h1 className="text-3xl font-bold mt-4">
            Rs. {dashboard.totalRent}
          </h1>
        </div>

        {/* Total Expense */}

        <div className="bg-red-600 text-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg">Total Expense</h2>
          <h1 className="text-3xl font-bold mt-4">
            Rs. {dashboard.totalExpense}
          </h1>
        </div>

        {/* Cash In Hand */}

        <div className="bg-yellow-500 text-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg">Cash In Hand</h2>
          <h1 className="text-3xl font-bold mt-4">
            Rs. {dashboard.cashInHand}
          </h1>
        </div>

        {/* Pending Payments */}

        <div className="bg-gray-800 text-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg">Pending Payments</h2>
          <h1 className="text-4xl font-bold mt-4">
            {dashboard.pendingPayments}
          </h1>
        </div>

      </div>

      {/* ===== Charts ===== */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

        <IncomeChart
          data={dashboard.monthlyRent}
        />

        <ExpenseChart
          data={dashboard.monthlyExpense}
        />

      </div>

    </div>

  </AdminLayout>
);

};

export default Dashboard;