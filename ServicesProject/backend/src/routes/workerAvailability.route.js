// import express from "express";
// import { setAvailability,getStatus } from "../controllers/workerAvailability.controller.js"; // only availability

// const router = express.Router();

// router.post("/availability", setAvailability);
// router.get("/status/:workerId", getStatus);
// export default router;



import express from "express";
import { setAvailability, getStatus } from "../controllers/workerAvailability.controller.js";

const router = express.Router();

router.post("/availability", setAvailability);
router.get("/status/:workerId", getStatus);

export default router;


