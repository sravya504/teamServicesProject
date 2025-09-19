import express from "express";
import { registerAdmin, loginAdmin ,getAllRequests,getAvailableWorkers,assignWork,getAssignments} from "../controllers/adminController.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/service-requests", getAllRequests);
router.get("/worker-availability/today", getAvailableWorkers);
router.post("/assignments/assign", assignWork);
router.get("/assignments", getAssignments);

export default router;