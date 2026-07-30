import { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

const Units = () => {
  const [unit, setUnit] = useState({
    unitNumber: "",
    size: "",
    rent: "",
    status: "Vacant",
  });

  const [units, setUnits] = useState([]);

  const handleChange = (e) => {
    setUnit({
      ...unit,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    if (!unit.unitNumber || !unit.size || !unit.rent) {
      alert("Please fill all fields.");
      return;
    }
    const handleDelete = (index) => {
  const updatedUnits = units.filter((_, i) => i !== index);
  setUnits(updatedUnits);
};
const handleEdit = (index) => {
  setUnit(units[index]);

  const updatedUnits = units.filter((_, i) => i !== index);
  setUnits(updatedUnits);
};

    setUnits([...units, unit]);

    setUnit({
      unitNumber: "",
      size: "",
      rent: "",
      status: "Vacant",
    });
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Factory Units</h1>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          Add Factory Unit
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="unitNumber"
            placeholder="Unit Number"
            value={unit.unitNumber}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="size"
            placeholder="Unit Size (Sq Ft)"
            value={unit.size}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            name="rent"
            placeholder="Monthly Rent"
            value={unit.rent}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <select
            name="status"
            value={unit.status}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >
            <option>Vacant</option>
            <option>Occupied</option>
          </select>
        </div>

        <button
          onClick={handleSave}
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Save Unit
        </button>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">
            Factory Units List
          </h2>

          <table className="w-full border border-gray-300">
            <thead className="bg-gray-100">
             <tr>
  <th className="border p-2">Unit</th>
  <th className="border p-2">Size</th>
  <th className="border p-2">Rent</th>
  <th className="border p-2">Status</th>
  <th className="border p-2">Action</th>
</tr>
            </thead>

            <tbody>
              {units.length > 0 ? (
                units.map((item, index) => (
                 <tr key={index}>
  <td className="border p-2">{item.unitNumber}</td>
  <td className="border p-2">{item.size}</td>
  <td className="border p-2">{item.rent}</td>
  <td className="border p-2">{item.status}</td>

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
                  <td colSpan="4" className="border p-4 text-center">
                    No Units Added
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

export default Units;