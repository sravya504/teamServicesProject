import express from "express";
import { formFilledData, getUserForms } from "../controllers/formFilledData.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Submit a new form (protected)
router.post("/", protect, formFilledData);
    
// Get all forms for logged-in user (protected)
router.get("/customer", protect, getUserForms);

export default router;
