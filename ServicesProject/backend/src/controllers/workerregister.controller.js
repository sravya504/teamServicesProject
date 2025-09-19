import Worker from "../models/workerregister.model.js";
import bcrypt from "bcryptjs";

// Register Worker
const registerWorker = async (req, res) => {
  try {
    const { name, email, password, contactNumber, availableTime, works } = req.body;

    // Check if worker already exists
    const existingWorker = await Worker.findOne({ email });
    if (existingWorker) {
      return res.status(400).json({ msg: "Worker already registered" });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newWorker = new Worker({
      name,
      email,
      password: hashedPassword, // save hashed password
      contactNumber,
      availableTime,
      works,
    });

    await newWorker.save();
    res.json({ msg: "Worker registered successfully", worker: newWorker });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { registerWorker };
