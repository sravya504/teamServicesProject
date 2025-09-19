import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "../Axios_config.js";

const CarpentryForm = () => {
  const [data, setData] = useState({
    name: "",
    address: "",
    availabilityTime: "",
    contactInfo: "",
    serviceType: "CarpentryForm", // auto-filled
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      await axios.post("/myforms", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Carpentry service request submitted!");
      setData({
        name: "",
        address: "",
        availabilityTime: "",
        contactInfo: "",
        serviceType: "CarpentryForm",
      });
    } catch (error) {
      alert(
        "Error submitting form: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full max-w-lg bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 p-8"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-400">
          Carpentry Service Request
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm mb-2 text-gray-300">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={data.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
              required
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm mb-2 text-gray-300">Address</label>
            <input
              type="text"
              name="address"
              placeholder="Enter your address"
              value={data.address}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
              required
            />
          </div>

          {/* Availability Time */}
          <div>
            <label className="block text-sm mb-2 text-gray-300">Availability Time</label>
            <input
              type="text"
              name="availabilityTime"
              placeholder="E.g. 10AM - 2PM"
              value={data.availabilityTime}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
              required
            />
          </div>

          {/* Contact Info */}
          <div>
            <label className="block text-sm mb-2 text-gray-300">Contact Info</label>
            <input
              type="text"
              name="contactInfo"
              placeholder="Enter your phone or email"
              value={data.contactInfo}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
              required
            />
          </div>

          {/* Hidden Service Type */}
          <input type="hidden" name="serviceType" value={data.serviceType} />

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 12px rgba(99,102,241,0.6)" }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-indigo-600 py-3 rounded-xl font-semibold text-white shadow-lg hover:bg-indigo-500 transition"
          >
            Submit Request
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default CarpentryForm;
