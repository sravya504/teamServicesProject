// import mongoose from "mongoose";

// const bookingHistorySchema = new mongoose.Schema({
//   serviceType: {
//     type: String,
//     required: true,
//   },
//   bookingDate: {
//     type: Date,
//     default: Date.now,
//   },
//   userId: {   // logged-in customer
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "SignUp", // link to SignUp model
//     required: true,
//   }
// }, { collection: "BookingHistory" });

// export const BookingHistoryModel = mongoose.model("BookingHistory", bookingHistorySchema);



// models/bookingHistory.models.js
import mongoose from "mongoose";

const bookingHistorySchema = new mongoose.Schema({
  serviceType: {
    type: String,
    required: true,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  userId: {   
    type: mongoose.Schema.Types.ObjectId,
    ref: "SignUp",  // link to SignUp model
    required: true,
  }
}, { collection: "BookingHistory" });

export const BookingHistoryModel = mongoose.model("BookingHistory", bookingHistorySchema);
