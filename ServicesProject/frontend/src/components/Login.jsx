import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "./Axios_config";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Login() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!mobileNumber || !password) {
      setError("Please enter both mobile number and password");
      return;
    }

    try {
      const response = await axios.post("/api/v2/login", {
        mobileNumber: mobileNumber.trim(),
        password: password.trim(),
      });

      console.log("Login response:", response.data);

      const token = response.data.data.token;
      const user = response.data.data.user;

      if (!token || !user) {
        throw new Error("Invalid login response");
      }

      // Save token & user info
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Optional: set default axios header for future requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      navigate("/"); // redirect to dashboard/home
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || "Login failed");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center sm:justify-end relative"
      style={{
        backgroundImage: `url("/login.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full max-w-lg bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 z-10 mx-4 sm:mr-20 my-10"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-900 drop-shadow-xl">
          Login
        </h1>

        {error && (
          <p className="bg-red-100 text-red-600 text-sm p-2 rounded mb-4 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Mobile Number */}
          <div>
            <label className="block text-sm mb-2 text-white">
              Mobile Number
            </label>
            <input
              type="text"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="Enter your mobile number"
              autoComplete="tel"
              className="w-full px-4 py-2 rounded-xl bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-300"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-2 text-white">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                className="w-full px-4 py-2 pr-10 rounded-xl bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-300"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-300 hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-indigo-500 py-3 rounded-xl font-semibold text-white shadow-lg hover:bg-indigo-400 transition"
          >
            Login
          </motion.button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-200">
  Don’t have an account?{" "}
  <Link to="/signup" className="text-indigo-400 hover:text-indigo-300">
    Sign Up
  </Link>
</p>

      </motion.div>
    </div>
  );
}

export default Login;
