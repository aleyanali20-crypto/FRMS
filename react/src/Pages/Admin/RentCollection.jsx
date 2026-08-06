import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import API from "../../api/tenantApi";

const RentCollection = () => {
  const token = localStorage.getItem("token");

  const [activeTab, setActiveTab] = useState("pending");

  const [pendingPayments, setPendingPayments] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [tenants, setTenants] = useState([]);

  const [cashPayment, setCashPayment] = useState({
    tenantId: "",
    month: "",
    year: new Date().getFullYear(),
    amount: "",
    remarks: "",
  });

  // ================= Load Data =================

  useEffect(() => {
    fetchPendingPayments();
    fetchPaymentHistory();
    fetchTenants();
  }, []);

  // ================= Pending =================

  const fetchPendingPayments = async () => {
    try {
      const res = await API.get("/rents/pending", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPendingPayments(res.data.data);

    } catch (error) {
      console.log(error);
    }
  };

  // ================= History =================

  const fetchPaymentHistory = async () => {
    try {

      const res = await API.get("/rents", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPaymentHistory(res.data.data);

    } catch (error) {
      console.log(error);
    }
  };

  // ================= Tenants =================

  const fetchTenants = async () => {
    try {

      const res = await API.get("/tenants", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTenants(res.data.data);

    } catch (error) {
      console.log(error);
    }
  };

  // ================= Approve =================

  const approvePayment = async (id) => {
    try {

      await API.put(
        `/rents/approve/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Payment Approved");

      fetchPendingPayments();
      fetchPaymentHistory();

    } catch (error) {
      console.log(error);
    }
  };

  // ================= Reject =================

  const rejectPayment = async (id) => {

    const remarks = prompt("Enter Reject Reason");

    if (remarks === null) return;

    try {

      await API.put(
        `/rents/reject/${id}`,
        {
          remarks,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Payment Rejected");

      fetchPendingPayments();
      fetchPaymentHistory();

    } catch (error) {
      console.log(error);
    }
  };
  // ================= Delete Rent =================

const deleteRent = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this rent record?"
  );

  if (!confirmDelete) return;

  try {

    await API.delete(`/rents/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert("Rent Deleted Successfully");

    fetchPendingPayments();
    fetchPaymentHistory();

  } catch (error) {

    console.log(error);

    alert(
      error.response?.data?.message ||
      "Delete Failed"
    );

  }

};

  // ================= Cash Form =================

  const handleChange = (e) => {
    setCashPayment({
      ...cashPayment,
      [e.target.name]: e.target.value,
    });
  };

  // ================= Save Cash =================

  const saveCashPayment = async (e) => {
    e.preventDefault();

    try {

      await API.post(
        "/rents/cash",
        cashPayment,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Cash Payment Added");

      setCashPayment({
        tenantId: "",
        month: "",
        year: new Date().getFullYear(),
        amount: "",
        remarks: "",
      });

     fetchPendingPayments();
fetchPaymentHistory();

} catch (error) {
  console.log(error);
}

};

return (
    <AdminLayout>
      <div className="p-6">

        <h1 className="text-3xl font-bold mb-6">
          Rent Collection
        </h1>

        {/* Tabs */}

        <div className="flex gap-4 mb-6">

          <button
            onClick={() => setActiveTab("pending")}
            className={`px-5 py-2 rounded-lg font-semibold ${
              activeTab === "pending"
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Pending Payments
          </button>

          <button
            onClick={() => setActiveTab("cash")}
            className={`px-5 py-2 rounded-lg font-semibold ${
              activeTab === "cash"
                ? "bg-green-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Cash Payment
          </button>

          <button
            onClick={() => setActiveTab("history")}
            className={`px-5 py-2 rounded-lg font-semibold ${
              activeTab === "history"
                ? "bg-purple-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Payment History
          </button>

        </div>

        {/* ================= Pending Payments ================= */}

        {activeTab === "pending" && (

          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-2xl font-bold mb-4">
              Pending Payments
            </h2>

            <table className="w-full border">

              <thead className="bg-gray-100">

                <tr>
                  <th className="border p-2">Tenant</th>
                  <th className="border p-2">Unit</th>
                  <th className="border p-2">Month</th>
                  <th className="border p-2">Year</th>
                  <th className="border p-2">Amount</th>
                  <th className="border p-2">Slip</th>
                  <th className="border p-2">Action</th>
                  <th className="border p-2">
  Action
</th>
                </tr>

              </thead>

              <tbody>

                {pendingPayments.length > 0 ? (

                  pendingPayments.map((item) => (

                    <tr key={item._id}>

                      <td className="border p-2">
                        {item.tenantName}
                      </td>

                      <td className="border p-2">
                        {item.unit}
                      </td>

                      <td className="border p-2">
                        {item.month}
                      </td>

                      <td className="border p-2">
                        {item.year}
                      </td>

                      <td className="border p-2">
                        Rs. {item.amount}
                      </td>

                      <td className="border p-2">

                        {item.slip ? (

                          <a
                            href={`http://localhost:5000/uploads/rents/${item.slip.replace("rents/", "")}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 underline"
                          >
                            View Slip
                          </a>

                        ) : (

                          <span className="text-gray-500">
                            No Slip
                          </span>

                        )}

                      </td>
                      <td className="border p-2">
  {localStorage.getItem("role") === "admin" && (
    <button
      onClick={() => deleteRent(item._id)}
      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
    >
      Delete
    </button>
  )}
</td>

                      <td className="border p-2">

  <div className="flex gap-2">

    <button
      onClick={() => approvePayment(item._id)}
      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
    >
      Approve
    </button>

    <button
      onClick={() => rejectPayment(item._id)}
      className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded"
    >
      Reject
    </button>

    {localStorage.getItem("role") === "admin" && (

      <button
        onClick={() => deleteRent(item._id)}
        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
      >
        Delete
      </button>

    )}

  </div>

</td>
                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="7"
                      className="text-center p-6"
                    >
                      No Pending Payments
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        )}
                {/* ================= Cash Payment ================= */}

        {activeTab === "cash" && (

          <div className="bg-white shadow rounded-xl p-6">

            <h2 className="text-2xl font-bold mb-6">
              Add Cash Payment
            </h2>

            <form
              onSubmit={saveCashPayment}
              className="grid grid-cols-2 gap-4"
            >

              {/* Tenant */}

              <div>

                <label className="block mb-2 font-semibold">
                  Tenant
                </label>

                <select
                  name="tenantId"
                  value={cashPayment.tenantId}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg p-3"
                >

                  <option value="">
                    Select Tenant
                  </option>

                  {tenants.map((tenant) => (

                    <option
                      key={tenant._id}
                      value={tenant._id}
                    >
                      {tenant.name} ({tenant.unit})
                    </option>

                  ))}

                </select>

              </div>

              {/* Month */}

              <div>

                <label className="block mb-2 font-semibold">
                  Month
                </label>

                <select
                  name="month"
                  value={cashPayment.month}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg p-3"
                >

                  <option value="">Select Month</option>

                  <option>January</option>
                  <option>February</option>
                  <option>March</option>
                  <option>April</option>
                  <option>May</option>
                  <option>June</option>
                  <option>July</option>
                  <option>August</option>
                  <option>September</option>
                  <option>October</option>
                  <option>November</option>
                  <option>December</option>

                </select>

              </div>

              {/* Year */}

              <div>

                <label className="block mb-2 font-semibold">
                  Year
                </label>

                <input
                  type="number"
                  name="year"
                  value={cashPayment.year}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg p-3"
                />

              </div>

              {/* Amount */}

              <div>

                <label className="block mb-2 font-semibold">
                  Amount
                </label>

                <input
                  type="number"
                  name="amount"
                  value={cashPayment.amount}
                  onChange={handleChange}
                  placeholder="Enter Amount"
                  required
                  className="w-full border rounded-lg p-3"
                />

              </div>

              {/* Remarks */}

              <div className="col-span-2">

                <label className="block mb-2 font-semibold">
                  Remarks
                </label>

                <textarea
                  rows="4"
                  name="remarks"
                  value={cashPayment.remarks}
                  onChange={handleChange}
                  placeholder="Optional Remarks"
                  className="w-full border rounded-lg p-3"
                />

              </div>

              {/* Submit */}

              <div className="col-span-2">

                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
                >
                  Save Cash Payment
                </button>

              </div>

            </form>

          </div>

        )}
                {/* ================= Payment History ================= */}

        {activeTab === "history" && (

          <div className="bg-white rounded-xl shadow-lg p-6">

            <h2 className="text-2xl font-bold mb-6">
              Payment History
            </h2>

            <table className="w-full border">

              <thead className="bg-gray-100">

                <tr>
  <th className="border p-2">Tenant</th>
  <th className="border p-2">Unit</th>
  <th className="border p-2">Month</th>
  <th className="border p-2">Year</th>
  <th className="border p-2">Method</th>
  <th className="border p-2">Amount</th>
  <th className="border p-2">Status</th>
  <th className="border p-2">Slip</th>
  <th className="border p-2">Action</th>
</tr>
              </thead>

              <tbody>

                {paymentHistory.length > 0 ? (

                  paymentHistory.map((item) => (

                    <tr key={item._id}>

                      <td className="border p-2">
                        {item.tenantName}
                      </td>

                      <td className="border p-2">
                        {item.unit}
                      </td>

                      <td className="border p-2">
                        {item.month}
                      </td>

                      <td className="border p-2">
                        {item.year}
                      </td>

                      <td className="border p-2">

                        <span
                          className={`px-3 py-1 rounded-full text-white text-sm ${
                            item.paymentMethod === "Cash"
                              ? "bg-green-600"
                              : "bg-blue-600"
                          }`}
                        >
                          {item.paymentMethod || "Online"}
                        </span>

                      </td>

                      <td className="border p-2">
                        Rs. {item.amount}
                      </td>

                      <td className="border p-2">

                        <span
                          className={`px-3 py-1 rounded-full text-white text-sm ${
                            item.status === "Approved"
                              ? "bg-green-600"
                              : item.status === "Rejected"
                              ? "bg-red-600"
                              : "bg-yellow-500"
                          }`}
                        >
                          {item.status}
                        </span>

                      </td>

                      <td className="border p-2">

                        {item.paymentMethod === "Cash" ? (

                          <span className="text-gray-500">
                            Cash Payment
                          </span>

                        ) : item.slip ? (

                          <a
                            href={`http://localhost:5000/uploads/rents/${item.slip.replace(
                              "rents/",
                              ""
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 underline"
                          >
                            View Slip
                          </a>

                        ) : (

                          <span className="text-gray-500">
                            No Slip
                          </span>

                        )}

                      </td>
                      <td className="border p-2">

  <button
    onClick={() => deleteRent(item._id)}
    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
  >
    Delete
  </button>

</td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="8"
                      className="text-center p-6"
                    >
                      No Payment History
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </AdminLayout>

  );

};

export default RentCollection;