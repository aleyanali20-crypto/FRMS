import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import API from "../../api/tenantApi";

const Tenants = () => {

  const [editingId, setEditingId] = useState(null);

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
  const [units, setUnits] = useState([]);

  useEffect(() => {
    fetchTenants();
    fetchUnits();
  }, []);

  // ================= Fetch Tenants =================

  const fetchTenants = async () => {
    try {

      const res = await API.get("/tenants");

      setTenants(res.data.data);

    } catch (error) {
      console.log(error);
    }
  };

  // ================= Fetch Vacant Units =================

  const fetchUnits = async () => {
    try {

      const res = await API.get("/units/vacant");

      setUnits(res.data.data);

    } catch (error) {
      console.log(error);
    }
  };

  // ================= Handle Change =================

  const handleChange = (e) => {
    setTenant({
      ...tenant,
      [e.target.name]: e.target.value,
    });
  };

  // ================= Save =================

  const handleSave = async () => {

    try {

      if (
        !tenant.name ||
        !tenant.phone ||
        !tenant.email ||
        !tenant.password ||
        !tenant.unit ||
        !tenant.rent
      ) {
        alert("Please fill all required fields.");
        return;
      }

      if (editingId) {

        await API.put(`/tenants/${editingId}`, tenant);

        alert("Tenant Updated Successfully");

      } else {

        await API.post("/tenants", tenant);

        alert("Tenant Added Successfully");
      }

      setEditingId(null);

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

      fetchTenants();
      fetchUnits();

    } catch (error) {

      console.log(error);

      alert(error.response?.data?.message || "Error");
    }

  };

  // ================= Delete =================

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this tenant?")) return;

    try {

      await API.delete(`/tenants/${id}`);

      fetchTenants();
      fetchUnits();

    } catch (error) {

      console.log(error);
    }

  };

  // ================= Edit =================

  const handleEdit = (item) => {

    setEditingId(item._id);

    setTenant({
      name: item.name,
      phone: item.phone,
      email: item.email,
      password: "",
      cnic: item.cnic,
      unit: item.unit,
      rent: item.rent,
      agreementStart: item.agreementStart?.substring(0,10),
      agreementEnd: item.agreementEnd?.substring(0,10),
    });

  };

  return (

    <AdminLayout>

      <h1 className="text-3xl font-bold mb-6">
        Tenant Management
      </h1>

      <div className="bg-white rounded-xl shadow p-6">

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            name="name"
            placeholder="Tenant Name"
            value={tenant.name}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={tenant.phone}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={tenant.email}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={tenant.password}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            type="text"
            name="cnic"
            placeholder="CNIC"
            value={tenant.cnic}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <select
            name="unit"
            value={tenant.unit}
            onChange={handleChange}
            className="border p-3 rounded"
          >
            <option value="">
              Select Unit
            </option>

            {units.map((item) => (
              <option
                key={item._id}
                value={item.unitNumber}
              >
                {item.unitNumber}
              </option>
            ))}

          </select>

          <input
            type="number"
            name="rent"
            placeholder="Monthly Rent"
            value={tenant.rent}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            type="date"
            name="agreementStart"
            value={tenant.agreementStart}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            type="date"
            name="agreementEnd"
            value={tenant.agreementEnd}
            onChange={handleChange}
            className="border p-3 rounded"
          />

        </div>

        <button
          onClick={handleSave}
          className="mt-5 bg-blue-600 text-white px-6 py-3 rounded"
        >
          {editingId ? "Update Tenant" : "Save Tenant"}
        </button>
                <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">
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

                tenants.map((item) => (

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
                        ? new Date(
                            item.agreementStart
                          ).toLocaleDateString()
                        : "N/A"}

                      {" - "}

                      {item.agreementEnd
                        ? new Date(
                            item.agreementEnd
                          ).toLocaleDateString()
                        : "N/A"}

                    </td>

                    <td className="border p-2">

                      <button
                        onClick={() => handleEdit(item)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(item._id)
                        }
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
                    colSpan="7"
                    className="border p-4 text-center text-gray-500"
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