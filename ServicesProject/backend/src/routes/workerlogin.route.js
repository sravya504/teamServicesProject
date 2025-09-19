// import express from "express";
// import { workerlogin, setAvailability } from "../controllers/workerlogin.controller.js";

// const router = express.Router();

// router.post("/", workerlogin);
// router.post("/", setAvailability);

// export default router;


import express from "express";
import { workerLogin } from "../controllers/workerlogin.controller.js"; // only login

const router = express.Router();

router.post("/", workerLogin);

export default router;


