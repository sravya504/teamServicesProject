// // import mongoose from "mongoose";

// // const workerSchema = new mongoose.Schema({
// //   name: String,
// //   email: { type: String, unique: true },
// //   password: String,
// //   isAvailable: { type: Boolean, default: false },
// //   assignedWork: {
// //     type: String, // could also be ObjectId referencing a Job collection
// //     default: null,
// //   },
// // });

// // const Worker = mongoose.model("Worker", workerSchema);
// // export default Worker;


// // models/Worker.js
// // import mongoose from "mongoose";

// // const WorkerSchema = new mongoose.Schema(
// //   {
// //     // ✅ Availability for today
// //     todayAvailability: {
// //       type: String,
// //       enum: ["Available", "Unavailable"],
// //       default: "Unavailable",
// //     },

// //     // ✅ Admin assigned work
// //     assignedWork: { type: String, default: null },
// //   },
// //   { collection: "workers" }
// // );

// // const Worker = mongoose.model("workers", WorkerSchema);
// // export default Worker;



// import mongoose from "mongoose";

// const workerAvailabilitySchema = new mongoose.Schema({
//   workerId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "workerRegister",
//     required: true,
//   },
//   todayAvailability: {
//     type: String,
//     enum: ["Available", "Unavailable"],
//     default: "Unavailable",
//   },
//   assignedWork: {
//     type: String,
//     default: null,
//   },
//   date: {
//     type: Date,
//     default: Date.now, // optional: track per day
//   },
// });

// const WorkerAvailability = mongoose.model(
//   "WorkerAvailability",
//   workerAvailabilitySchema
// );

// export default WorkerAvailability;


// import mongoose from "mongoose";

// const workerAvailabilitySchema = new mongoose.Schema({
//   workerId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "workerRegister", // links to your workerRegister model
//     required: true,
//   },
//   todayAvailability: {
//     type: String,
//     enum: ["Available", "Unavailable"],
//     default: "Unavailable",
//   },
//   assignedWork: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Form", // 👈 link to customer request model
//     default: null,
//   },
//   date: {
//     type: Date,
//     default: Date.now, // optional: track per day
//   },
// });

// const WorkerAvailability = mongoose.model(
//   "WorkerAvailability",
//   workerAvailabilitySchema
// );

// export default WorkerAvailability;



import mongoose from "mongoose";

const workerAvailabilitySchema = new mongoose.Schema({
  workerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "workerRegister",
    required: true,
  },
  todayAvailability: {
    type: String,
    enum: ["Available", "Unavailable"],
    default: "Unavailable",
  },
 assignedWork: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "FormFilledData", // ✅ linked to Form model
  default: null,
},
  date: {
    type: Date,
    default: Date.now,
  },
});

const WorkerAvailability = mongoose.model(
  "WorkerAvailability",
  workerAvailabilitySchema
);

export default WorkerAvailability;
