import mongoose from "mongoose";

const WorkerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // ✅ added password field
    contactNumber: { type: String, required: true },
    availableTime: { type: String, required: true }, // e.g. "9am - 5pm"
    works: [{ type: String, required: true }], // multiple works
  },
  { collection: "workerRegister" }
);

const Worker = mongoose.model("workerRegister", WorkerSchema);

export default Worker;
