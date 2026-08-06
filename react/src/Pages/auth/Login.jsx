import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaBuilding } from "react-icons/fa";
import API from "../../api/tenantApi";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await API.post("/auth/login", formData);

    // Save Data
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.user.role);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    const role = res.data.user.role;

    console.log("ROLE:", role);

    // Role Based Redirect
    switch (role) {
      case "superadmin":
        navigate("/superadmin/dashboard");
        break;

      case "admin":
        navigate("/admin/dashboard");
        break;

      case "accountant":
        navigate("/accountant/dashboard");
        break;

      case "tenant":
        navigate("/tenant/dashboard");
        break;

      default:
        navigate("/");
    }

  } catch (error) {
    console.log(error);

    alert(
      error.response?.data?.message ||
      "Invalid Email or Password"
    );
  }
};
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-700 to-indigo-900 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-5xl grid md:grid-cols-2">

        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center items-center bg-blue-600 text-white p-10">
          <FaBuilding size={80} />

          <h1 className="text-4xl font-bold mt-6">
            FRMS
          </h1>

          <p className="text-center mt-4 text-lg">
            Factory Rent Management System
          </p>

          <p className="text-center mt-3 text-blue-100">
            Manage Factory Units, Tenants, Rent Collection,
            Expenses & Reports from one dashboard.
          </p>
        </div>

        {/* Right Side */}
        <div className="p-10">

          <h2 className="text-3xl font-bold text-gray-800">
            Welcome Back 👋
          </h2>

          <p className="text-gray-500 mt-2">
            Login to continue
          </p>

          <form onSubmit={handleSubmit} className="mt-8">

            {/* Email */}
            <div className="mb-5">
              <label className="block font-semibold mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email"
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-5">
              <label className="block font-semibold mb-2">
                Password
              </label>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                  className="w-full border rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>

              </div>
            </div>

            {/* Remember */}
            <div className="flex justify-between items-center mb-6">

              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" />
                Remember Me
              </label>

              <button
                type="button"
                className="text-blue-600 text-sm hover:underline"
              >
                Forgot Password?
              </button>

            </div>

            {/* Login */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
            >
              Login
            </button>

          </form>

          <p className="text-center mt-8 text-gray-400 text-sm">
            © 2026 Factory Rent Management System
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;