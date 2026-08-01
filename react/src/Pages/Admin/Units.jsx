import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import API from "../../api/tenantApi";

const Units = () => {
  const [editingId, setEditingId] = useState(null);

  const [unit, setUnit] = useState({
    unitNumber: "",
    floor: "",
    size: "",
    rent: "",
    status: "Vacant",
    description: "",
  });

  const [units, setUnits] = useState([]);

  useEffect(() => {
    fetchUnits();
  }, []);

  const fetchUnits = async () => {
    try {
      const res = await API.get("/units");
      setUnits(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setUnit({
      ...unit,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      if (
        !unit.unitNumber ||
        !unit.floor ||
        !unit.size ||
        !unit.rent
      ) {
        alert("Please fill all required fields");
        return;
      }

      if (editingId) {
        await API.put(`/units/${editingId}`, unit);
        alert("Unit Updated Successfully");
      } else {
        await API.post("/units", unit);
        alert("Unit Added Successfully");
      }

      setEditingId(null);

      setUnit({
        unitNumber: "",
        floor: "",
        size: "",
        rent: "",
        status: "Vacant",
        description: "",
      });

      fetchUnits();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this unit?")) return;

    try {
      await API.delete(`/units/${id}`);
      alert("Unit Deleted");
      fetchUnits();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);

    setUnit({
      unitNumber: item.unitNumber,
      floor: item.floor,
      size: item.size,
      rent: item.rent,
      status: item.status,
      description: item.description,
    });
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">
        Factory Units
      </h1>

      <div className="bg-white rounded-xl shadow p-6">

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            name="unitNumber"
            placeholder="Unit Number"
            value={unit.unitNumber}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            type="text"
            name="floor"
            placeholder="Floor"
            value={unit.floor}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            type="text"
            name="size"
            placeholder="Size"
            value={unit.size}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            type="number"
            name="rent"
            placeholder="Rent"
            value={unit.rent}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <select
            name="status"
            value={unit.status}
            onChange={handleChange}
            className="border p-3 rounded"
          >
            <option>Vacant</option>
            <option>Occupied</option>
          </select>

          <input
            type="text"
            name="description"
            placeholder="Description"
            value={unit.description}
            onChange={handleChange}
            className="border p-3 rounded"
          />

        </div>

        <button
          onClick={handleSave}
          className="mt-5 bg-blue-600 text-white px-6 py-3 rounded"
        >
          {editingId ? "Update Unit" : "Save Unit"}
        </button>

        <table className="w-full mt-8 border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Unit</th>
              <th className="border p-2">Floor</th>
              <th className="border p-2">Size</th>
              <th className="border p-2">Rent</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {units.map((item) => (
              <tr key={item._id}>
                <td className="border p-2">{item.unitNumber}</td>
                <td className="border p-2">{item.floor}</td>
                <td className="border p-2">{item.size}</td>
                <td className="border p-2">Rs. {item.rent}</td>
                <td className="border p-2">{item.status}</td>

                <td className="border p-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {units.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  No Units Found
                </td>
              </tr>
            )}
          </tbody>
        </table>

      </div>
    </AdminLayout>
  );
};

export default Units;