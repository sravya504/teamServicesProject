import express from "express";
import { registerWorker } from "../controllers/workerregister.controller.js";

const router = express.Router();

// Worker Register Route
router.post("/", registerWorker);

export default router;
