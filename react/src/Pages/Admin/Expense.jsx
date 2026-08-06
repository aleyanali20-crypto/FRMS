import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import API from "../../api/tenantApi";

const Expense = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user.role;

  const canAddExpense = [
    "superadmin",
    "admin",
    "accountant",
  ].includes(role);

  const [expenses, setExpenses] = useState([]);

  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    amount: "",
    date: "",
    description: "",
    receipt: null,
  });

  // ================= Fetch Expenses =================

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await API.get("/expenses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setExpenses(res.data.data);

    } catch (err) {
      console.log(err);
    }
  };

  // ================= Handle Inputs =================

  const handleChange = (e) => {

    if (e.target.name === "receipt") {

      setFormData({
        ...formData,
        receipt: e.target.files[0],
      });

    } else {

      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });

    }

  };

  // ================= Edit Expense =================

  const editExpense = (expense) => {

    setEditing(true);

    setEditId(expense._id);

    setFormData({
      title: expense.title,
      category: expense.category,
      amount: expense.amount,
      date: expense.date.slice(0, 10),
      description: expense.description,
      receipt: null,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };

  // ================= Delete Expense =================

  const deleteExpense = async (id) => {

    if (!window.confirm("Delete this expense?")) return;

    try {

      await API.delete(`/expenses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Expense Deleted Successfully");

      fetchExpenses();

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
        "Delete Failed"
      );

    }

  };
    // ================= Add / Update Expense =================

  const addExpense = async (e) => {

    e.preventDefault();

    try {

      const data = new FormData();

      data.append("title", formData.title);
      data.append("category", formData.category);
      data.append("amount", formData.amount);
      data.append("date", formData.date);
      data.append("description", formData.description);

      if (formData.receipt) {
        data.append("receipt", formData.receipt);
      }

      if (editing) {

        await API.put(
          `/expenses/${editId}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        alert("Expense Updated Successfully");

      } else {

        await API.post(
          "/expenses",
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        alert("Expense Added Successfully");

      }

      setFormData({
        title: "",
        category: "",
        amount: "",
        date: "",
        description: "",
        receipt: null,
      });

      setEditing(false);
      setEditId(null);

      fetchExpenses();

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
        "Operation Failed"
      );

    }

  };

  return (

    <AdminLayout>

      <div className="p-6">

        <h1 className="text-3xl font-bold mb-6">
          Expense Management
        </h1>

        {canAddExpense && (

          <div className="bg-white shadow rounded-xl p-6 mb-8">

            <h2 className="text-2xl font-bold mb-6">

              {editing
                ? "Edit Expense"
                : "Add New Expense"}

            </h2>

            <form
              onSubmit={addExpense}
              className="grid grid-cols-2 gap-4"
            >
                        {/* Title */}

              <div>
                <label className="block mb-2 font-semibold">
                  Expense Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg p-3"
                />
              </div>

              {/* Category */}

              <div>
                <label className="block mb-2 font-semibold">
                  Category
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg p-3"
                >
                  <option value="">Select Category</option>
                  <option>Electricity</option>
                  <option>Water</option>
                  <option>Maintenance</option>
                  <option>Security</option>
                  <option>Cleaning</option>
                  <option>Salary</option>
                  <option>Repair</option>
                  <option>Internet</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Amount */}

              <div>
                <label className="block mb-2 font-semibold">
                  Amount
                </label>

                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg p-3"
                />
              </div>

              {/* Date */}

              <div>
                <label className="block mb-2 font-semibold">
                  Date
                </label>

                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg p-3"
                />
              </div>

              {/* Receipt */}

              <div className="col-span-2">
                <label className="block mb-2 font-semibold">
                  Receipt
                </label>

                <input
                  type="file"
                  name="receipt"
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                />
              </div>

              {/* Description */}

              <div className="col-span-2">
                <label className="block mb-2 font-semibold">
                  Description
                </label>

                <textarea
                  rows="4"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                />
              </div>

              <div className="col-span-2 flex gap-3">

                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                >
                  {editing ? "Update Expense" : "Add Expense"}
                </button>

                {editing && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(false);
                      setEditId(null);

                      setFormData({
                        title: "",
                        category: "",
                        amount: "",
                        date: "",
                        description: "",
                        receipt: null,
                      });
                    }}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg"
                  >
                    Cancel
                  </button>
                )}

              </div>

            </form>

          </div>

        )}

        {/* Expense History */}

        <div className="bg-white shadow rounded-xl p-6">

          <h2 className="text-2xl font-bold mb-6">
            Expense History
          </h2>

          <table className="w-full border">

            <thead className="bg-gray-100">

              <tr>

                <th className="border p-2">Title</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">Amount</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Posted By</th>
                <th className="border p-2">Receipt</th>
                <th className="border p-2">Description</th>

                {role === "superadmin" && (
                  <th className="border p-2">Action</th>
                )}

              </tr>

            </thead>

            <tbody>

              {expenses.length > 0 ? (

                expenses.map((expense) => (

                  <tr key={expense._id}>

                    <td className="border p-2">{expense.title}</td>

                    <td className="border p-2">{expense.category}</td>

                    <td className="border p-2">
                      Rs. {expense.amount}
                    </td>

                    <td className="border p-2">
                      {new Date(expense.date).toLocaleDateString()}
                    </td>

                    <td className="border p-2">
                      {expense.postedByName}
                    </td>

                    <td className="border p-2">

                      {expense.receipt ? (
                        <a
                          href={`http://localhost:5000/uploads/expenses/${expense.receipt}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 underline"
                        >
                          View
                        </a>
                      ) : (
                        "-"
                      )}

                    </td>

                    <td className="border p-2">
                      {expense.description || "-"}
                    </td>

                    {role === "superadmin" && (

                      <td className="border p-2">

                        <div className="flex gap-2">

                          <button
                            onClick={() => editExpense(expense)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => deleteExpense(expense._id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    )}

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan={role === "superadmin" ? 8 : 7}
                    className="text-center p-6"
                  >
                    No Expenses Found
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </AdminLayout>

  );

};

export default Expense;