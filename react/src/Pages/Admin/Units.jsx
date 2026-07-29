import AdminLayout from "../../layouts/AdminLayout";

const Units = () => {
  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Factory Units</h1>

        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
          + Add Unit
        </button>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <p className="text-gray-500">
          No factory units available.
        </p>
      </div>
    </AdminLayout>
  );
};

export default Units;