// import express from "express";
// import Assignment from "../models/assignment.model.js";
// import Worker from "../models/workerregister.model.js";

// const router = express.Router();

// // Get all workers assigned to a customer
// router.get("/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const assignments = await Assignment.find({ userId, status: "Assigned" })
//       .populate("workerId", "-password"); // exclude password

//     const workers = assignments.map(a => a.workerId);

//     res.json({ success: true, data: workers });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// });

// export default router;



import express from "express";
import Assignment from "../models/assignment.model.js";

const router = express.Router();

// Get all workers assigned to a customer
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const assignments = await Assignment.find({ userId, status: "Assigned" })
      .populate("workerId", "name email contactInfo")   // ✅ show worker info
      .populate("serviceRequestId", "serviceType bookingDate address"); // ✅ show request info

    const formatted = assignments.map(a => ({
      workerName: a.workerId?.name,
      workerEmail: a.workerId?.email,
      workerContact: a.workerId?.contactInfo,
      serviceType: a.serviceRequestId?.serviceType,
      bookingDate: a.serviceRequestId?.bookingDate,
      address: a.serviceRequestId?.address,
      status: a.status
    }));

    res.json({ success: true, data: formatted });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;

