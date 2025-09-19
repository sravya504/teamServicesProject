import { useState } from "react";
import axios from "./Axios_config.js";
import { motion } from "framer-motion";

const WorkerRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contactNumber: "",
    availableTime: "",
    works: [],
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const availableWorks = ["Plumber", "Electrician", "Cleaner", "Painter", "Carpenter"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage("");
    setError("");
  };

  const handleWorksChange = (e) => {
    const options = e.target.options;
    const selectedWorks = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedWorks.push(options[i].value);
      }
    }
    setFormData({ ...formData, works: selectedWorks });
    setMessage("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("api/workersregister", formData);
      setMessage(res.data.msg || "Registration successful!");
      setFormData({
        name: "",
        email: "",
        password: "",
        contactNumber: "",
        availableTime: "",
        works: [],
      });
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <motion.div
        initial={{ opacity: 0, y: -60, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="bg-gray-800 shadow-2xl rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-400 mb-6">
          Worker Registration
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 outline-none transition"
            whileFocus={{ scale: 1.02 }}
          />

          <motion.input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="username"
            className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 outline-none transition"
            whileFocus={{ scale: 1.02 }}
          />

          <motion.input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
            className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 outline-none transition"
            whileFocus={{ scale: 1.02 }}
          />

          <motion.input
            type="tel"
            name="contactNumber"
            placeholder="Contact Number"
            value={formData.contactNumber}
            onChange={handleChange}
            required
            pattern="[0-9]{10}"
            className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 outline-none transition"
            whileFocus={{ scale: 1.02 }}
          />

          <motion.input
            type="text"
            name="availableTime"
            placeholder="Available Time (e.g. 9am - 5pm)"
            value={formData.availableTime}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 outline-none transition"
            whileFocus={{ scale: 1.02 }}
          />

          <div>
            <label className="block text-gray-300 font-medium mb-2">
              Select Works (Ctrl + Click for multiple)
            </label>
            <select
              multiple
              value={formData.works}
              onChange={handleWorksChange}
              className="w-full border border-gray-700 rounded-lg p-2 h-28 bg-gray-700 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
            >
              {availableWorks.map((work, index) => (
                <option key={index} value={work}>
                  {work}
                </option>
              ))}
            </select>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className={`w-full font-semibold py-3 rounded-lg shadow-md transition text-white ${
              loading
                ? "bg-indigo-500 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-500"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </motion.button>

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
        </form>
      </motion.div>
    </div>
  );
};

export default WorkerRegister;
