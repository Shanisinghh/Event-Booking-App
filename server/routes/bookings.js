import express from "express";
import Booking from "../models/Booking.js";
import Event from "../models/Event.js";
import {
  createNewBooking,
  fetchBookingData,
  fetchBookingDataById,
} from "../controllers/bookingController.js";

const router = express.Router();

//  Get all bookings (with event details)
router.get("/", fetchBookingData);

//  Get booking by ID
router.get("/:id", fetchBookingDataById);

//  Create new booking
router.post("/", createNewBooking);

export default router;
