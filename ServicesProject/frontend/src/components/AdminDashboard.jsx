import React, { useState, useEffect } from "react";
import axios from "./Axios_config.js";

function AdminDashboard() {
  const [serviceRequests, setServiceRequests] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [message, setMessage] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dashboard data
  useEffect(() => {
    const fetchData = async () => {
      try {

        setLoading(true);
        const [reqRes, workerRes, assignRes] = await Promise.all([
          axios.get("/api/admin/service-requests"),      // ✅ get requests
          axios.get("/api/admin/worker-availability/today"), // ✅ get workers
          axios.get("/api/admin/assignments"),           // ✅ get assignments
        ]);

        setServiceRequests(reqRes.data.data);
        setWorkers(workerRes.data.data);
        setAssignments(assignRes.data.data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err.response?.data || err.message);
        setError("⚠️ Failed to load dashboard data.");
      } 
      finally
      {
        setLoading(false);
      }
    };

         
    fetchData();
  }, []);

  // Handle assignment
  const handleAssign = async () => {
    if (!selectedRequest || !selectedWorker) return;

    try {
      const res1 = await axios.post("/api/admin/assignments/assign", {
  userId: selectedRequest.userId?._id, // may be undefined
  workerId: selectedWorker._id,
  serviceRequestId: selectedRequest._id,
});
      console.log(res1.data)

      setMessage("✅ Work assigned successfully!");

      const res = await axios.get("/api/admin/assignments");
      setAssignments(res.data.data);

      setSelectedRequest(null);
      setSelectedWorker(null);
    } catch (err) {
      console.error("Error assigning work:", err.response?.data || err.message);
      setMessage("❌ Error assigning work.");
    }
  };

  const isAlreadyAssigned = assignments.some(
    (a) => a.serviceRequestId === selectedRequest?._id
  );

  return (
    <div className={`${darkMode ? "dark" : ""} min-h-screen transition-colors duration-500`}>
      <div className="bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 p-8 min-h-screen relative">

        {/* Dark mode toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute top-4 right-4 px-4 py-2 rounded-lg text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
        >
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>

        <h1 className="text-3xl font-bold text-indigo-700 dark:text-indigo-200 mb-6 text-center">
          Admin Dashboard
        </h1>

        {/* Loading / Error states */}
        {loading && <p className="text-center text-gray-600 dark:text-gray-300">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Service Requests */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition">
                <h2 className="text-xl font-semibold mb-4 text-indigo-600 dark:text-indigo-300">
                  Service Requests
                </h2>
                <ul className="max-h-64 overflow-y-auto">
                  {serviceRequests.map((req) => (
                    <li
                      key={req._id}
                      className={`p-3 mb-2 rounded-lg cursor-pointer border transition-all duration-300 
                        ${selectedRequest?._id === req._id
                          ? "bg-indigo-100 border-indigo-400 dark:bg-indigo-700 dark:border-indigo-300"
                          : "bg-gray-50 dark:bg-gray-700 dark:border-gray-600 hover:bg-indigo-50 dark:hover:bg-gray-600"
                        }`}
                      onClick={() => setSelectedRequest(req)}
                    >
                      <div className="font-bold">{req.serviceType}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {req.address}
                      </div>
                      <div className="text-xs text-gray-400 dark:text-gray-400">
                        Customer: {req.name || req.userId?.fullName}
                      </div>
                      <div className="text-xs text-gray-400 dark:text-gray-400">
                        Contact: {req.contactInfo}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Available Workers */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition">
                <h2 className="text-xl font-semibold mb-4 text-indigo-600 dark:text-indigo-300">
                  Available Workers
                </h2>
                <ul className="max-h-64 overflow-y-auto">
                  {workers.map((worker) => (
                    <li
                      key={worker._id}
                      className={`p-3 mb-2 rounded-lg cursor-pointer border transition-all duration-300 
                        ${selectedWorker?._id === worker._id
                          ? "bg-indigo-100 border-indigo-400 dark:bg-indigo-700 dark:border-indigo-300"
                          : "bg-gray-50 dark:bg-gray-700 dark:border-gray-600 hover:bg-indigo-50 dark:hover:bg-gray-600"
                        }`}
                      onClick={() => setSelectedWorker(worker)}
                    >
                      <div className="font-bold">{worker.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">{worker.email}</div>
                      <div className="text-xs text-gray-400 dark:text-gray-400">
                        Contact: {worker.contactNumber}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Assign Button */}
            <div className="flex justify-center mt-6">
              <button
                onClick={handleAssign}
                disabled={!selectedRequest || !selectedWorker || isAlreadyAssigned}
                className={`px-6 py-2 rounded-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400 transition
                  ${(!selectedRequest || !selectedWorker || isAlreadyAssigned) && "opacity-50 cursor-not-allowed"}`}
              >
                {isAlreadyAssigned ? "Already Assigned" : "Assign Work"}
              </button>
            </div>

            {message && (
              <div className="text-center mt-4 text-green-600 dark:text-green-400 font-medium">
                {message}
              </div>
            )}

            {/* Assignments List */}
            <div className="mt-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition">
              <h2 className="text-xl font-semibold mb-4 text-indigo-600 dark:text-indigo-300">
                Assignments
              </h2>
              <ul className="max-h-80 overflow-y-auto">
                {assignments.map((assign) => (
                  <li
                    key={assign._id}
                    className="p-3 mb-2 rounded-lg border bg-gray-50 dark:bg-gray-700 dark:border-gray-600 transition hover:bg-indigo-50 dark:hover:bg-gray-600"
                  >
                    <div className="font-bold">Service: {assign.serviceType}</div>
                    <div className="text-sm">Worker: {assign.workerName}</div>
                    <div className="text-sm">Customer: {assign.customerName}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-300">Status: {assign.status}</div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
