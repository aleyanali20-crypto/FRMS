import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/tenantApi";

const TenantDashboard = () => {
  const navigate = useNavigate();

  const [tenant, setTenant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await API.get("/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTenant(response.data.tenant);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="p-10 text-xl font-bold">
        Loading...
      </div>
    );
  }

  if (!tenant) {
    return (
      <div className="p-10 text-xl font-bold text-red-600">
        No tenant data found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Tenant Dashboard</h1>

        <button
          onClick={() => navigate("/tenant/rent")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          Pay Rent
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-xl p-6 space-y-4">
        <div>
          <strong>Name:</strong> {tenant.name}
        </div>

        <div>
          <strong>Email:</strong> {tenant.email}
        </div>

        <div>
          <strong>Phone:</strong> {tenant.phone}
        </div>

        <div>
          <strong>Unit:</strong> {tenant.unit}
        </div>

        <div>
          <strong>Monthly Rent:</strong> Rs. {tenant.rent}
        </div>

        <div>
          <strong>Agreement Start:</strong>{" "}
          {tenant.agreementStart
            ? new Date(tenant.agreementStart).toLocaleDateString()
            : "N/A"}
        </div>

        <div>
          <strong>Agreement End:</strong>{" "}
          {tenant.agreementEnd
            ? new Date(tenant.agreementEnd).toLocaleDateString()
            : "N/A"}
        </div>
      </div>
    </div>
  );
};

export default TenantDashboard;