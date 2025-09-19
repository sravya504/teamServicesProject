import mongoose from "mongoose";

const WorkerSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  todayAvailability: { type: String, default: "Unavailable" } // Available / Unavailable
});

const Worker = mongoose.model("Worker", WorkerSchema);
export default Worker;