import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Signup",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },  
  availabilityTime: {
    type: String,
    required: true,
  },
  contactInfo: {
    type: String,
    required: true,
  },
  serviceType: {
    type: String,
    required: true,
  },
  bookingDate: { 
    type: Date, default: Date.now
  }
})

export default mongoose.model('FormFilledData', formSchema);
