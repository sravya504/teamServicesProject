import { useEffect, useState } from "react";
import axios from "./Axios_config.js";
import { motion } from "framer-motion";

function WorkerDashboard() {
  const workerId = localStorage.getItem("workerId");
  const [isAvailable, setIsAvailable] = useState(null);
  const [assignedWork, setAssignedWork] = useState(null);
  const [message, setMessage] = useState("");

  // ✅ Fetch worker status on mount
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get(`/api/workers/status/${workerId}`);
        setIsAvailable(res.data.todayAvailability === "Available");
        setAssignedWork(res.data.assignedWork);
      } catch (err) {
        console.error("Error fetching status:", err.response?.data || err.message);
        setMessage("Error fetching status");
      }
    };
    fetchStatus();
  }, [workerId]);

  // ✅ Update availability
  const updateAvailability = async (availability) => {
    try {
      const value = availability ? "Available" : "Unavailable";
      const res = await axios.post("/api/workers/availability", {
        workerId,
        availability: value,
      });

      setIsAvailable(res.data.todayAvailability === "Available");
      setAssignedWork(res.data.assignedWork);
      setMessage("Availability updated!");
    } catch (err) {
      console.error("Error updating availability:", err.response?.data || err.message);
      setMessage("Error updating availability");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold mb-6 text-indigo-400"
      >
        Worker Dashboard
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex gap-6 mb-6"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            isAvailable === true
              ? "bg-green-500 opacity-70 cursor-default"
              : "bg-green-600 hover:bg-green-500"
          }`}
          onClick={() => updateAvailability(true)}
        >
          Available
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            isAvailable === false
              ? "bg-red-500 opacity-70 cursor-default"
              : "bg-red-600 hover:bg-red-500"
          }`}
          onClick={() => updateAvailability(false)}
        >
          Not Available
        </motion.button>
      </motion.div>

      {message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-blue-400 font-medium mb-4"
        >
          {message}
        </motion.p>
      )}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-800 shadow-2xl rounded-2xl p-6 w-96 text-center border border-gray-700"
      >
        <h3 className="font-semibold text-lg text-indigo-300">Your Work Status</h3>
        <p className="mt-3">
          Availability:{" "}
          <span className={isAvailable ? "text-green-400" : "text-red-400"}>
            {isAvailable ? "Available" : "Not Available"}
          </span>
        </p>
        <p className="mt-3">
          Assigned Work:{" "}
          {assignedWork ? (
            <span className="text-indigo-400">
              {assignedWork.name} - {assignedWork.contactInfo}
            </span>
          ) : (
            <span className="text-gray-400">No work assigned yet</span>
          )}
        </p>
      </motion.div>
    </div>
  );
}

export default WorkerDashboard;
