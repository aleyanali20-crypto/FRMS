import { useState } from "react";
import { FaEye, FaEyeSlash, FaBuilding } from "react-icons/fa";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
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

            <div className="mb-5">
              <label className="block font-semibold mb-2">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter Email"
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-5">
              <label className="block font-semibold mb-2">
                Password
              </label>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  className="w-full border rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

            <button
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