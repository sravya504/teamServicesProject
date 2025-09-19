import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "../Axios_config.js";

const PlumbingForm = () => {
  const [data, setData] = useState({
    name: "",
    address: "",
    availabilityTime: "",
    contactInfo: "",
    serviceType: "Plumbing", // auto-filled
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
      alert("Plumbing service request submitted!");
      setData({
        name: "",
        address: "",
        availabilityTime: "",
        contactInfo: "",
        serviceType: "Plumbing",
      });
    } catch (error) {
      alert(
        "Error submitting form: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative"
      style={{ background: "linear-gradient(to right, #000, #000/20)" }}
    >
      <div className="absolute inset-0 bg-black/30"></div>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mt-10 relative w-full max-w-lg bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 p-8 z-10 mx-4 sm:mr-20"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">
          Plumbing Service Request
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm mb-2 text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={data.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl bg-gray-100 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
              required
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm mb-2 text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              placeholder="Enter your address"
              value={data.address}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl bg-gray-100 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
              required
            />
          </div>

          {/* Availability Time */}
          <div>
            <label className="block text-sm mb-2 text-gray-700">
              Availability Time
            </label>
            <input
              type="text"
              name="availabilityTime"
              placeholder="E.g. 10AM - 2PM"
              value={data.availabilityTime}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl bg-gray-100 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
              required
            />
          </div>

          {/* Contact Info */}
          <div>
            <label className="block text-sm mb-2 text-gray-700">
              Contact Info
            </label>
            <input
              type="text"
              name="contactInfo"
              placeholder="Enter your phone or email"
              value={data.contactInfo}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl bg-gray-100 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
              required
            />
          </div>

          {/* Service Type (read-only hidden) */}
          <input type="hidden" name="serviceType" value={data.serviceType} />

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-blue-700 py-3 rounded-xl font-semibold text-white shadow-lg hover:bg-blue-700 transition"
          >
            Submit Plumbing Request
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default PlumbingForm;
