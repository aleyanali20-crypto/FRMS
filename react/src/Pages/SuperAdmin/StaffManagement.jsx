import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import API from "../../api/tenantApi";

const StaffManagement = () => {
  const token = localStorage.getItem("token");

  const [staff, setStaff] = useState([]);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin",
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchStaff();
  }, []);

  // ================= Fetch Staff =================

  const fetchStaff = async () => {
    try {
      const res = await API.get("/superadmin/staff", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStaff(res.data.staff);
    } catch (err) {
      console.log(err);
    }
  };

  // ================= Handle Input =================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= Create / Update =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await API.put(
          `/superadmin/staff/${editId}`,
          {
            name: formData.name,
            email: formData.email,
            role: formData.role,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("Staff Updated Successfully");
      } else {
        await API.post(
          "/superadmin/staff",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("Staff Created Successfully");
      }

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "admin",
      });

      setEditId(null);

      fetchStaff();
    } catch (err) {
      console.log(err);
      alert("Operation Failed");
    }
  };

  // ================= Edit =================

  const editStaff = (user) => {
    setEditId(user._id);

    setFormData({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ================= Delete =================

  const deleteStaff = async (id) => {
    if (!window.confirm("Delete this staff member?")) return;

    try {
      await API.delete(`/superadmin/staff/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchStaff();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= Search =================

  const filtered = staff.filter(
  (item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.email.toLowerCase().includes(search.toLowerCase())
);

return (
  <AdminLayout>
  
  <div className="p-6">

    {/* Header */}

    <div className="flex justify-between items-center mb-8">

      <div>

        <h1 className="text-4xl font-bold text-gray-800">
          Staff Management
        </h1>

        <p className="text-gray-500 mt-1">
          Create, Update and Manage Admin & Accountant Accounts
        </p>

      </div>

      <div className="bg-blue-600 text-white px-5 py-3 rounded-xl shadow-lg">

        <p className="text-sm">
          Total Staff
        </p>

        <h2 className="text-2xl font-bold">
          {filtered.length}
        </h2>

      </div>

    </div>

    {/* Search */}

    <div className="bg-white rounded-2xl shadow-lg p-5 mb-8">

      <input
        type="text"
        placeholder="🔍 Search by Name or Email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-gray-300 rounded-xl px-5 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
      />

    </div>

    {/* Form */}

    <div className="bg-white rounded-2xl shadow-lg p-8 mb-10">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold text-gray-800">

          {editId
            ? "Update Staff Member"
            : "Create New Staff"}

        </h2>

        {editId && (

          <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-semibold">

            Editing Mode

          </span>

        )}

      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />

        {!editId && (

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />

        )}

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
        >

          <option value="admin">
            Admin
          </option>

          <option value="accountant">
            Accountant
          </option>

        </select>

        <button
          type="submit"
          className="md:col-span-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-xl shadow-lg transition"
        >

          {editId
            ? "Update Staff"
            : "Create Staff"}

        </button>

      </form>

    </div>

    {/* Staff Table */}

    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

      <div className="bg-blue-600 px-6 py-4">

        <h2 className="text-white text-xl font-bold">
          Staff List
        </h2>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">
        <thead>

  <tr className="bg-gray-100 text-gray-700">

    <th className="px-6 py-4 text-left">
      Staff
    </th>

    <th className="px-6 py-4 text-left">
      Email
    </th>

    <th className="px-6 py-4 text-center">
      Role
    </th>

    <th className="px-6 py-4 text-center">
      Actions
    </th>

  </tr>

</thead>

<tbody>

  {filtered.length > 0 ? (

    filtered.map((user) => (

      <tr
        key={user._id}
        className="border-b hover:bg-blue-50 transition duration-200"
      >

        {/* Name */}

        <td className="px-6 py-4">

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">

              {user.name.charAt(0).toUpperCase()}

            </div>

            <div>

              <p className="font-semibold text-gray-800">
                {user.name}
              </p>

              <p className="text-sm text-gray-500">
                Staff Member
              </p>

            </div>

          </div>

        </td>

        {/* Email */}

        <td className="px-6 py-4 text-gray-700">
          {user.email}
        </td>

        {/* Role */}

        <td className="px-6 py-4 text-center">

          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold
            ${
              user.role === "admin"
                ? "bg-green-100 text-green-700"
                : "bg-purple-100 text-purple-700"
            }`}
          >

            {user.role}

          </span>

        </td>

        {/* Buttons */}

        <td className="px-6 py-4">

          <div className="flex justify-center gap-3">

            <button
              onClick={() => editStaff(user)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg shadow transition"
            >
              Edit
            </button>

            <button
              onClick={() => deleteStaff(user._id)}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg shadow transition"
            >
              Delete
            </button>

          </div>

        </td>

      </tr>

    ))

  ) : (

    <tr>

      <td
        colSpan="4"
        className="text-center py-12 text-gray-500 text-lg"
      >
        No Staff Found
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

export default StaffManagement;