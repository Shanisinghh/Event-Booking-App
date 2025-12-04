import Event from "../models/Event.js";
import cloudinary from "../config/cloudinary.js";

//  GET all events with filters
export const getAllEvent = async (req, res) => {
  try {
    const { q, location, date } = req.query;
    const filter = {};
    if (q) filter.title = { $regex: q, $options: "i" };
    if (location) filter.location = location;
    if (date) filter.date = date;

    const events = await Event.find(filter);
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  GET event by ID
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  CREATE new event
export const createNewEvent = async (req, res) => {
  try {
    let imageUrl = "";

    // Upload image to Cloudinary

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "events" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      imageUrl = result.secure_url;
    }
    const { title, location, date, seats, description, price } = req.body;

    if (!title || !location || !date || !seats || !description || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    console.log("BODY:", req.body);

    const newEvent = new Event({
      title: req.body.title,
      location: req.body.location,
      date: req.body.date,
      seats: req.body.seats,
      image: imageUrl,
      description: req.body.description || "",
      price: req.body.price || "",
    });

    await newEvent.save();
    res.json(newEvent);
  } catch (err) {
    console.error("SERVER ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

//  UPDATE event
export const updateEvent = async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
