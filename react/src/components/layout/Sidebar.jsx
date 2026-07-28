import { Link } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaWarehouse,
  FaMoneyBill,
  FaReceipt,
  FaChartBar,
  FaCog,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 bg-blue-700 text-white min-h-screen p-5">
      <h1 className="text-2xl font-bold mb-8">FRMS</h1>

      <ul className="space-y-5">
       <li>
  <Link
    to="/admin/dashboard"
    className="flex items-center gap-3 hover:text-yellow-300"
  >
    <FaHome />
    Dashboard
  </Link>
</li>

        <li className="flex items-center gap-3 cursor-pointer hover:text-yellow-300">
          <FaWarehouse /> Factory Units
        </li>

       <li>
  <Link
    to="/admin/tenants"
    className="flex items-center gap-3 hover:text-yellow-300"
  >
    <FaUsers />
    Tenants
  </Link>
</li>

        <li className="flex items-center gap-3 cursor-pointer hover:text-yellow-300">
          <FaMoneyBill /> Rent Collection
        </li>

        <li className="flex items-center gap-3 cursor-pointer hover:text-yellow-300">
          <FaReceipt /> Expenses
        </li>

        <li className="flex items-center gap-3 cursor-pointer hover:text-yellow-300">
          <FaChartBar /> Reports
        </li>

        <li className="flex items-center gap-3 cursor-pointer hover:text-yellow-300">
          <FaCog /> Settings
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;