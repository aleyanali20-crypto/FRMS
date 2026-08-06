import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import API from "../../api/tenantApi";
import IncomeChart from "../../components/dashboard/IncomeChart";
import ExpenseChart from "../../components/dashboard/ExpenseChart";

const AccountantDashboard = () => {
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

      console.log("Dashboard:", res.data);

      setDashboard(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <AdminLayout>
      <div className="p-6">

        <h1 className="text-3xl font-bold mb-8">
          Accountant Dashboard
        </h1>

        {/* Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-green-600 text-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg">Total Rent</h2>
            <h1 className="text-3xl font-bold mt-3">
              Rs. {dashboard.totalRent.toLocaleString()}
            </h1>
          </div>

          <div className="bg-red-600 text-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg">Total Expense</h2>
            <h1 className="text-3xl font-bold mt-3">
              Rs. {dashboard.totalExpense.toLocaleString()}
            </h1>
          </div>

          <div className="bg-blue-600 text-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg">Cash In Hand</h2>
            <h1 className="text-3xl font-bold mt-3">
              Rs. {dashboard.cashInHand.toLocaleString()}
            </h1>
          </div>

          <div className="bg-yellow-500 text-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg">Pending Payments</h2>
            <h1 className="text-3xl font-bold mt-3">
              {dashboard.pendingPayments}
            </h1>
          </div>

        </div>

        {/* Charts */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

          <IncomeChart
            data={dashboard.monthlyRent}
          />

          <ExpenseChart
            data={dashboard.monthlyExpense}
          />

        </div>
                {/* Recent Payments */}

        <div className="bg-white rounded-xl shadow-lg p-6 mt-8">

          <div className="flex justify-between items-center mb-5">

            <h2 className="text-2xl font-bold text-gray-800">
              Recent Payments
            </h2>

            <span className="text-sm text-gray-500">
              Last 5 Records
            </span>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="bg-green-600 text-white">

                  <th className="py-3 px-4 text-left rounded-l-lg">
                    Tenant
                  </th>

                  <th className="py-3 px-4 text-center">
                    Unit
                  </th>

                  <th className="py-3 px-4 text-center">
                    Amount
                  </th>

                  <th className="py-3 px-4 text-center rounded-r-lg">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {dashboard.recentPayments.length > 0 ? (

                  dashboard.recentPayments.map((payment) => (

                    <tr
                      key={payment._id}
                      className="border-b hover:bg-gray-50 transition"
                    >

                      <td className="py-4 px-4 font-semibold">
                        {payment.tenantName}
                      </td>

                      <td className="text-center">
                        {payment.unit}
                      </td>

                      <td className="text-center font-semibold text-green-600">
                        Rs. {payment.amount.toLocaleString()}
                      </td>

                      <td className="text-center">

                        <span
                          className={`px-3 py-1 rounded-full text-white text-sm ${
                            payment.status === "Approved"
                              ? "bg-green-600"
                              : payment.status === "Pending"
                              ? "bg-yellow-500"
                              : "bg-red-600"
                          }`}
                        >
                          {payment.status}
                        </span>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="4"
                      className="text-center py-10 text-gray-500"
                    >
                      No Payments Found
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

        {/* Recent Expenses */}

        <div className="bg-white rounded-xl shadow-lg p-6 mt-8">

          <div className="flex justify-between items-center mb-5">

            <h2 className="text-2xl font-bold text-gray-800">
              Recent Expenses
            </h2>

            <span className="text-sm text-gray-500">
              Last 5 Records
            </span>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="bg-red-600 text-white">

                  <th className="py-3 px-4 text-left rounded-l-lg">
                    Title
                  </th>

                  <th className="py-3 px-4 text-center">
                    Category
                  </th>

                  <th className="py-3 px-4 text-center">
                    Amount
                  </th>

                  <th className="py-3 px-4 text-center rounded-r-lg">
                    Date
                  </th>

                </tr>

              </thead>

              <tbody>

                {dashboard.recentExpenses.length > 0 ? (

                  dashboard.recentExpenses.map((expense) => (

                    <tr
                      key={expense._id}
                      className="border-b hover:bg-gray-50 transition"
                    >

                      <td className="py-4 px-4 font-semibold">
                        {expense.title}
                      </td>

                      <td className="text-center">
                        {expense.category}
                      </td>

                      <td className="text-center font-semibold text-red-600">
                        Rs. {expense.amount.toLocaleString()}
                      </td>

                      <td className="text-center">
                        {new Date(expense.date).toLocaleDateString()}
                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="4"
                      className="text-center py-10 text-gray-500"
                    >
                      No Expenses Found
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </AdminLayout>
  );
};

export default AccountantDashboard;