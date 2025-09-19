import { useState } from "react";
import axios from "./Axios_config";

const AdminSignup = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const res = await axios.post("/api/admin/login", formData);
      setMessage(res.data.msg || "Signup successful!");
    } catch (err) {
      setError(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 shadow-2xl rounded-2xl p-8 w-full max-w-md flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center mb-2 text-indigo-400">
          Admin Signup
        </h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          autoComplete="username"
          className="px-4 py-2 border border-gray-700 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 outline-none transition"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          autoComplete="current-password"
          className="px-4 py-2 border border-gray-700 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 outline-none transition"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-500 transition"
        >
          Signup
        </button>
        {message && (
          <div className="text-green-400 text-center font-medium mt-2">
            {message}
          </div>
        )}
        {error && (
          <div className="text-red-400 text-center font-medium mt-2">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default AdminSignup;
