import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

// // Admin Signup
export const registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) return res.status(400).json({ msg: "Admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({ email, password: hashedPassword });
    await newAdmin.save();

    res.json({ msg: "Admin registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin Login
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ msg: "No admin found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id }, "adminSecretKey", { expiresIn: "1d" });

    res.json({ msg: "Admin login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

import Form from "../models/formFilledData.model.js"
import WorkerAvailability from "../models/WorkerAvailability.model.js"


// ✅ Get all customer service requests
export const getAllRequests = async (req, res) => {
  try {
    const requests = await Form.find();
    res.json({ data: requests });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get all workers available today
export const getAvailableWorkers = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // start of today

    const workers = await WorkerAvailability.find({
      todayAvailability: "Available",
      date: { $gte: today },
    }).populate("workerId", "name email contactInfo"); // populate worker info

    const formatted = workers.map((w) => ({
      _id: w.workerId._id,
      name: w.workerId.name,
      email: w.workerId.email,
      contactInfo: w.workerId.contactInfo,
    }));

    res.json({ data: formatted });
  } catch (err) {
    
    res.status(500).json({ error: err.message });
  }
};



import Assignment from "../models/assignment.model.js";  // <-- missing in your file

export const assignWork = async (req, res) => {
  try {
    const { workerId, serviceRequestId } = req.body;

    // 1. Get the form document
    const form = await Form.findById(serviceRequestId);
    if (!form) return res.status(404).json({ msg: "Service request not found" });

    // 2. Update WorkerAvailability
    const workerToday = await WorkerAvailability.findOne({
      workerId,
      date: { $gte: new Date().setHours(0, 0, 0, 0) }
    });
    if (!workerToday) return res.status(404).json({ msg: "Worker not found for today" });

    workerToday.assignedWork = serviceRequestId;
    await workerToday.save();

    // 3. Update the form to reflect assigned worker
    await Form.findByIdAndUpdate(serviceRequestId, { assignedWorker: workerId });

    // 4. ✅ Create the Assignment with the correct userId from the form
    await Assignment.create({
      serviceRequestId,
      workerId,
      userId: form.userId,   // ✅ Correct customer
      status: "Assigned"
    });

    res.json({ msg: "Work assigned successfully" });
  } catch (err) {
    console.error("Error in assignWork:", err);
    res.status(500).json({ error: err.message });
  }
};




// ✅ Get all assignments (workers assigned to customer requests)
// export const getAssignments = async (req, res) => {
//   try {
//     const assignments = await WorkerAvailability.find({
//       assignedWork: { $ne: null },
//       date: { $gte: new Date().setHours(0, 0, 0, 0) },
//     })
//       .populate("workerId", "name email contactInfo")
//       .populate("assignedWork"); // populate customer request

//     const formatted = assignments.map((a) => ({
//       _id: a._id,
//       worker: a.workerId,
//       serviceRequest: a.assignedWork,
//     }));
//     res.json({ data: formatted });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };





export const getAssignments = async (req, res) => {
  try {
    const assignments = await WorkerAvailability.find({
      assignedWork: { $ne: null },
      date: { $gte: new Date().setHours(0, 0, 0, 0) },
    })
      .populate("workerId", "name email contactInfo")
      .populate("assignedWork"); // full FormFilledData document

    const formatted = assignments.map((a) => ({
      _id: a._id,
      workerName: a.workerId.name,
      workerEmail: a.workerId.email,
      customerName: a.assignedWork?.name || "N/A",   // from FormFilledData
      serviceType: a.assignedWork?.serviceType || "N/A", // ✅ corrected field
      status: "Assigned",
    }));

    res.json({ data: formatted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
