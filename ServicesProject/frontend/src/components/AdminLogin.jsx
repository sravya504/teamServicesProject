import { useState } from "react";
import axios from "./Axios_config";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("/api/admin/login", formData);
      setMessage(res.data.msg || "Login successful!");
      localStorage.setItem("adminToken", res.data.token);

      setTimeout(() => navigate("/admin/dashboard"), 1000);
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-gray-800 shadow-2xl rounded-2xl p-8 w-full max-w-md flex flex-col gap-6 relative"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-400">
          Admin Login
        </h2>

        {/* Email Input */}
        <motion.div
          whileFocus={{ scale: 1.02 }}
          className="relative flex flex-col"
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="username"
            className="px-4 py-3 border border-gray-700 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 outline-none transition"
          />
        </motion.div>

        {/* Password Input with toggle */}
        <motion.div whileFocus={{ scale: 1.02 }} className="relative flex items-center">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
            className="flex-1 px-4 py-3 border border-gray-700 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 outline-none transition"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 cursor-pointer text-gray-400"
          >
            {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
          </span>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
          className={`bg-indigo-600 text-white py-3 rounded-lg font-semibold transition ${
            loading ? "opacity-70 cursor-not-allowed" : "hover:bg-indigo-500"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </motion.button>

        {/* Feedback messages */}
        {message && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-green-400 text-center font-medium mt-2"
          >
            {message}
          </motion.div>
        )}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400 text-center font-medium mt-2"
          >
            {error}
          </motion.div>
        )}
      </motion.form>
    </div>
  );
};

export default AdminLogin;
