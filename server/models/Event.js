import mongoose from "mongoose";
const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String, required: true },
  date: { type: String, required: true },
  seats: { type: Number, required: true },
  image: { type: String },
  price: { type: Number },
});

export default mongoose.model("Event", eventSchema);
