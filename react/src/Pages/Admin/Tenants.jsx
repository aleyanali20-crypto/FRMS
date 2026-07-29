import { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

const Tenants = () => {
  const [tenant, setTenant] = useState({
    name: "",
    phone: "",
    email: "",
    cnic: "",
    unit: "",
    rent: "",
    agreementStart: "",
    agreementEnd: "",
  });

  const [tenants, setTenants] = useState([]);

  const handleChange = (e) => {
    setTenant({
      ...tenant,
      [e.target.name]: e.target.value,
    });
  };

 const handleDelete = (index) => {
  const updatedTenants = tenants.filter((_, i) => i !== index);
  setTenants(updatedTenants);
};

const handleEdit = (index) => {
  setTenant(tenants[index]);

  const updatedTenants = tenants.filter((_, i) => i !== index);
  setTenants(updatedTenants);
};

const handleSave = () => {
  if (!tenant.name || !tenant.phone || !tenant.unit || !tenant.rent) {
    alert("Please fill all required fields.");
    return;
  }

  setTenants([...tenants, tenant]);

  setTenant({
    name: "",
    phone: "",
    email: "",
    cnic: "",
    unit: "",
    rent: "",
    agreementStart: "",
    agreementEnd: "",
  });
};

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Tenants</h1>

        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
          + Add Tenant
        </button>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Add New Tenant</h2>

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
          <h2 className="text-xl font-semibold mb-4">Tenant List</h2>

          <table className="w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
  <th className="border p-2">Name</th>
  <th className="border p-2">Phone</th>
  <th className="border p-2">Unit</th>
  <th className="border p-2">Rent</th>
  <th className="border p-2">Agreement</th>
  <th className="border p-2">Action</th>
</tr>
            </thead>

            <tbody>
              {tenants.length > 0 ? (
                tenants.map((item, index) => (
                  <tr key={index}>
  <td className="border p-2">{item.name}</td>
  <td className="border p-2">{item.phone}</td>
  <td className="border p-2">{item.unit}</td>
  <td className="border p-2">{item.rent}</td>

  <td className="border p-2">
    {item.agreementStart} - {item.agreementEnd}
  </td>

  <td className="border p-2">
    <button
      onClick={() => handleEdit(index)}
      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
    >
      Edit
    </button>

    <button
      onClick={() => handleDelete(index)}
      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
    >
      Delete
    </button>
  </td>
</tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="border p-4 text-center text-gray-500"
                  >
                    No tenants added yet.
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