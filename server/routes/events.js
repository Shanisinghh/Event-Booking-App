import express from "express";
import Event from "../models/Event.js";
import upload from "../config/Multer.js"; // ✅ multer
import cloudinary from "../config/cloudinary.js";
import {
  createNewEvent,
  deleteEvent,
  getAllEvent,
  getEventById,
  updateEvent,
} from "../controllers/eventController.js";

const router = express.Router();

//  GET all events with filters
router.get("/", getAllEvent);

//  GET event by ID
router.get("/:id", getEventById);

//  POST new event (with image upload to Cloudinary)
router.post("/", upload.single("image"), createNewEvent);
//  UPDATE event
router.put("/:id", updateEvent);

//  DELETE event
router.delete("/:id", deleteEvent);

export default router;
