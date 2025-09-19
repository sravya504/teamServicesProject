


// controllers/worker.controller.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import Worker from "../models/Worker.js";
import Worker from "../models/workerregister.model.js"
export const workerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const worker = await Worker.findOne({ email });
    if (!worker) return res.status(400).json({ msg: "No worker found" });

    const isMatch = await bcrypt.compare(password, worker.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: worker._id }, "secretKey", { expiresIn: "1d" });

    res.json({
      msg: "Login successful",
      token,
      workerId: worker._id,
      todayAvailability: worker.todayAvailability,
      assignedWork: worker.assignedWork,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
