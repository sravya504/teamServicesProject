import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "./Axios_config";
import { motion } from "framer-motion";

function CustomerDashboard() {
  const [history, setHistory] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [loadingWorkers, setLoadingWorkers] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userStr = localStorage.getItem("user");

    if (!token || !userStr) {
      navigate("/login");
      return;
    }

    const user = JSON.parse(userStr);
    const userId = user._id || user.id;

    if (!userId) {
      setError("User ID not found. Please login again.");
      return;
    }

    const fetchHistory = async () => {
      try {
        const res = await axios.get("/myforms/customer", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHistory(Array.isArray(res.data.data) ? res.data.data : []);
      } catch (err) {
        console.error("Error fetching history:", err);
        setHistory([]);
      } finally {
        setLoadingHistory(false);
      }
    };

    const fetchWorkers = async () => {
      try {
        const res = await axios.get(`/customer/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWorkers(Array.isArray(res.data.data) ? res.data.data : []);
      } catch (err) {
        console.error("Error fetching assigned workers:", err);
        setWorkers([]);
      } finally {
        setLoadingWorkers(false);
      }
    };

    fetchHistory();
    fetchWorkers();
  }, [navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-red-400 font-semibold text-center p-6">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-indigo-400 mb-8 text-center"
      >
        Customer Dashboard
      </motion.h1>

      {/* Service History Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 shadow-2xl rounded-2xl p-6 mb-10 border border-gray-700"
      >
        <h2 className="text-2xl font-semibold text-indigo-300 mb-4">
          My Service History
        </h2>
        {loadingHistory ? (
          <p className="text-gray-400">Loading your history...</p>
        ) : history.length === 0 ? (
          <p className="text-gray-400">No service history found.</p>
        ) : (
          <ul className="space-y-3">
            {history.map((item, idx) => (
              <motion.li
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="flex items-center justify-between bg-gray-700 px-4 py-3 rounded-xl shadow-sm transition"
              >
                <span className="font-medium text-gray-200">
                  {item.serviceType || "Service"}
                </span>
                <span className="text-sm text-gray-400">
                  {item.bookingDate
                    ? new Date(item.bookingDate).toLocaleDateString()
                    : "N/A"}
                </span>
              </motion.li>
            ))}
          </ul>
        )}
      </motion.section>

      {/* Assigned Workers Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-gray-800 shadow-2xl rounded-2xl p-6 border border-gray-700"
      >
        <h2 className="text-2xl font-semibold text-indigo-300 mb-4">
          Assigned Workers
        </h2>
        {loadingWorkers ? (
          <p className="text-gray-400">Loading assigned workers...</p>
        ) : workers.length === 0 ? (
          <p className="text-gray-400">No workers assigned yet.</p>
        ) : (
          <ul className="space-y-3">
            {workers.map((worker, idx) => (
              <motion.li
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="flex items-center justify-between bg-gray-700 px-4 py-3 rounded-xl shadow-sm transition"
              >
                <div>
                  <p className="font-medium text-gray-200">{worker.workerName}</p>
                  <p className="text-sm text-gray-400">{worker.workerEmail}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">{worker.workerContact}</p>
                  <p className="text-xs text-gray-500">
                    {worker.serviceType} •{" "}
                    {worker.bookingDate
                      ? new Date(worker.bookingDate).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        )}
      </motion.section>
    </div>
  );
}

export default CustomerDashboard;
