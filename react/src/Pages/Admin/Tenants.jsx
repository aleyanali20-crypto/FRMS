import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import API from "../../api/tenantApi";

const Tenants = () => {
  const [tenant, setTenant] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    cnic: "",
    unit: "",
    rent: "",
    agreementStart: "",
    agreementEnd: "",
  });

  const [tenants, setTenants] = useState([]);

  // Load tenants
  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    try {
      const res = await API.get("/tenants");
      setTenants(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Input
  const handleChange = (e) => {
    setTenant({
      ...tenant,
      [e.target.name]: e.target.value,
    });
  };

  // Save Tenant
  const handleSave = async () => {
    try {
      const response = await API.post("/tenants", tenant);

      alert(response.data.message);

      fetchTenants();

      setTenant({
        name: "",
        phone: "",
        email: "",
        password: "",
        cnic: "",
        unit: "",
        rent: "",
        agreementStart: "",
        agreementEnd: "",
      });

    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.message || "Error adding tenant");
    }
  };

  // Delete (Frontend only)
  const handleDelete = (index) => {
    const updated = tenants.filter((_, i) => i !== index);
    setTenants(updated);
  };

  // Edit (Frontend only)
  const handleEdit = (index) => {
    setTenant(tenants[index]);

    const updated = tenants.filter((_, i) => i !== index);
    setTenants(updated);
  };

  return (
    <AdminLayout>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Tenants</h1>
      </div>

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-semibold mb-4">
          Add New Tenant
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            type="text"
            name="name"
            placeholder="Tenant Name"
            value={tenant.name}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={tenant.phone}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={tenant.email}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={tenant.password}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="cnic"
            placeholder="CNIC"
            value={tenant.cnic}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="unit"
            placeholder="Factory Unit"
            value={tenant.unit}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            name="rent"
            placeholder="Monthly Rent"
            value={tenant.rent}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="date"
            name="agreementStart"
            value={tenant.agreementStart}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="date"
            name="agreementEnd"
            value={tenant.agreementEnd}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

        </div>

        <button
          onClick={handleSave}
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Save Tenant
        </button>

        <div className="mt-10">

          <h2 className="text-xl font-semibold mb-4">
            Tenant List
          </h2>

          <table className="w-full border border-gray-300">

            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Name</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Unit</th>
                <th className="border p-2">Rent</th>
                <th className="border p-2">Agreement</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>

            <tbody>

              {tenants.length > 0 ? (
                tenants.map((item, index) => (
                  <tr key={item._id}>

                    <td className="border p-2">
                      {item.name}
                    </td>

                    <td className="border p-2">
                      {item.phone}
                    </td>

                    <td className="border p-2">
                      {item.email}
                    </td>

                    <td className="border p-2">
                      {item.unit}
                    </td>

                    <td className="border p-2">
                      Rs. {item.rent}
                    </td>

                    <td className="border p-2">
                      {item.agreementStart
                        ? new Date(item.agreementStart).toLocaleDateString()
                        : ""}
                      {" - "}
                      {item.agreementEnd
                        ? new Date(item.agreementEnd).toLocaleDateString()
                        : ""}
                    </td>

                    <td className="border p-2">

                      <button
                        onClick={() => handleEdit(index)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(index)}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="border p-4 text-center"
                  >
                    No tenants found.
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

export default Tenants;