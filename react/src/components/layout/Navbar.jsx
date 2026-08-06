import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const role = localStorage.getItem("role");
  const user = JSON.parse(localStorage.getItem("user"));

  const roleName =
    role === "superadmin"
      ? "Super Admin"
      : role === "accountant"
      ? "Accountant"
      : role === "tenant"
      ? "Tenant"
      : "Admin";

  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h2 className="text-2xl font-bold">
        Dashboard
      </h2>

      <div className="flex items-center gap-3">
        <FaUserCircle className="text-3xl text-gray-600" />

        <div className="text-right">
          <h2 className="font-semibold">
            {user?.name}
          </h2>

          <p className="text-sm text-gray-500">
            {roleName}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;