import mongoose from "mongoose";
const bookingSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: String,
  seats: { type: Number, required: true },
  bookingId: { type: String, required: true },
  bookingDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["confirmed", "cancelled"],
    default: "confirmed",
  },
});

export default mongoose.model("Booking", bookingSchema);
