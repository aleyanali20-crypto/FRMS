import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaWarehouse,
  FaMoneyBill,
  FaReceipt,
  FaChartBar,
  FaCog,
  FaUserShield,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const role = localStorage.getItem("role");
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  // Route Prefix
  const base =
    role === "superadmin"
      ? "/superadmin"
      : role === "admin"
      ? "/admin"
      : role === "accountant"
      ? "/accountant"
      : "/tenant";

  const menuClass = (path) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
      location.pathname === path
        ? "bg-white text-blue-700 font-semibold"
        : "hover:bg-blue-600"
    }`;

  return (
    <div className="w-64 bg-blue-700 text-white min-h-screen flex flex-col">

      {/* Logo */}
      <div className="p-6 border-b border-blue-500">
        <h1 className="text-3xl font-bold">FRMS</h1>
      </div>

      {/* Menu */}
      <div className="flex-1 p-5">

        <ul className="space-y-3">

          {/* Dashboard */}

          <li>
            <Link
              to={`${base}/dashboard`}
              className={menuClass(`${base}/dashboard`)}
            >
              <FaHome />
              Dashboard
            </Link>
          </li>

          {/* SUPER ADMIN */}

          {role === "superadmin" && (
            <>
              <li>
                <Link
                  to={`${base}/staff`}
                  className={menuClass(`${base}/staff`)}
                >
                  <FaUserShield />
                  Staff Management
                </Link>
              </li>

              <li>
                <Link
                  to={`${base}/tenants`}
                  className={menuClass(`${base}/tenants`)}
                >
                  <FaUsers />
                  Tenants
                </Link>
              </li>

              <li>
                <Link
                  to={`${base}/units`}
                  className={menuClass(`${base}/units`)}
                >
                  <FaWarehouse />
                  Factory Units
                </Link>
              </li>
            </>
          )}

          {/* ADMIN */}

          {role === "admin" && (
            <>
              <li>
                <Link
                  to={`${base}/tenants`}
                  className={menuClass(`${base}/tenants`)}
                >
                  <FaUsers />
                  Tenants
                </Link>
              </li>

              <li>
                <Link
                  to={`${base}/units`}
                  className={menuClass(`${base}/units`)}
                >
                  <FaWarehouse />
                  Factory Units
                </Link>
              </li>
            </>
          )}

          {/* ADMIN + ACCOUNTANT + SUPERADMIN */}

          {(role === "superadmin" ||
            role === "admin" ||
            role === "accountant") && (
            <>
              <li>
                <Link
                  to={`${base}/rent-collection`}
                  className={menuClass(`${base}/rent-collection`)}
                >
                  <FaMoneyBill />
                  Rent Collection
                </Link>
              </li>

              <li>
                <Link
                  to={`${base}/expenses`}
                  className={menuClass(`${base}/expenses`)}
                >
                  <FaReceipt />
                  Expenses
                </Link>
              </li>
            </>
          )}

          {/* TENANT */}

          {role === "tenant" && (
            <li>
              <Link
                to="/tenant/rent"
                className={menuClass("/tenant/rent")}
              >
                <FaMoneyBill />
                Pay Rent
              </Link>
            </li>
          )}

          {/* SUPER ADMIN ONLY */}

          {role === "superadmin" && (
            <>
              <li>
                <Link
                  to="/reports"
                  className={menuClass("/reports")}
                >
                  <FaChartBar />
                  Reports
                </Link>
              </li>

              <li>
                <Link
                  to="/settings"
                  className={menuClass("/settings")}
                >
                  <FaCog />
                  Settings
                </Link>
              </li>
            </>
          )}

        </ul>

      </div>

      {/* Logout */}

      <div className="p-5 border-t border-blue-500">

        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 py-3 rounded-lg"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>

    </div>
  );
};

export default Sidebar;