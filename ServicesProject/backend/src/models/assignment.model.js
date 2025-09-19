import mongoose from "mongoose";

const AssignmentSchema = new mongoose.Schema({
  serviceRequestId: { type: mongoose.Schema.Types.ObjectId, ref: "FormFilledData", required: true },
  workerId: { type: mongoose.Schema.Types.ObjectId, ref: "workerRegister", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Signup", required: true },
  status: { type: String, enum: ["Assigned", "Completed"], default: "Assigned" }
}, { timestamps: true });




export default mongoose.model("Assignment", AssignmentSchema);







