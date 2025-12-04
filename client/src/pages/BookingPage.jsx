import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { QRCode } from "react-qrcode-logo";
import {
  FiUser,
  FiMail,
  FiUsers,
  FiCheckCircle,
  FiPhone,
} from "react-icons/fi";
import { toast } from "react-toastify";

const BookingPage = () => {
  const API = import.meta.env.VITE_API_URL;
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    seats: 1,
  });
  console.log(form);
  const [bookingId, setBookingId] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`${API}/api/events/${id}`);
        setEvent(res.data);
      } catch (err) {
        console.error("Error fetching event:", err);
      }
    };
    fetchEvent();
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleConfirm = async () => {
    if (!form.name || !form.email || !form.mobile || form.seats < 1) {
      toast.error("All field are required");
      return;
    }

    try {
      const res = await axios.post(`${API}/api/bookings`, {
        eventId: id,
        name: form.name,
        email: form.email,
        mobile: form.mobile,
        seats: form.seats,
      });
      toast.success("Booking Successfully");
      setBookingId(res.data.bookingId);
      setStep(2);
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    }
  };
  console.log(bookingId);
  const handleDownload = () => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "ticket.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  if (!event)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="animate-pulse text-gray-500 text-xl">Loading event...</p>
      </div>
    );

  return (
    <div className="min-h-screen mt-12 flex items-center justify-center bg-[#f5ecec] p-6">
      {/* STEP 1: Booking Form */}
      {step === 1 && (
        <div className="bg-white/70 backdrop-blur-xl p-8 rounded-2xl shadow-2xl max-w-md w-full border border-white/30 animate-fadeIn">
          <h2 className="text-3xl font-extrabold mb-3 text-gray-900">
            Book Your Seats
          </h2>

          {/* Event Info */}
          <div className="mb-6 text-gray-700">
            <p className="text-lg font-semibold">{event.title}</p>
            <p>{event.description}</p>
            <p>📍 {event.location}</p>
            <p>📅 {new Date(event.date).toLocaleDateString()}</p>
            <p>🎟 Seats Available: {event.seats}</p>
            <p className="text-md text-black">Price: ₹{event.price}</p>
          </div>

          {/* Form Fields */}
          <div className="space-y-3">
            {/* Name */}
            <div className="flex items-center bg-gray-100 p-3 rounded-xl">
              <FiUser className="text-gray-500 text-lg mr-3" />
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full bg-transparent outline-none"
              />
            </div>

            {/* Email */}
            <div className="flex items-center bg-gray-100 p-3 rounded-xl">
              <FiMail className="text-gray-500 text-lg mr-3" />
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full bg-transparent outline-none"
              />
            </div>

            {/* Mobile */}
            <div className="flex items-center bg-gray-100 p-3 rounded-xl">
              <FiPhone className="text-gray-500 text-lg mr-3" />
              <input
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                placeholder="Mobile Number"
                maxLength={10}
                className="w-full bg-transparent outline-none"
              />
            </div>

            {/* Seats */}
            <div className="flex items-center bg-gray-100 p-3 rounded-xl">
              <FiUsers className="text-gray-500 text-lg mr-3" />
              <input
                type="number"
                name="seats"
                value={form.seats}
                onChange={handleChange}
                min={1}
                max={event.seats}
                className="w-full bg-transparent outline-none"
              />
            </div>

            <button
              onClick={handleConfirm}
              className="mt-4 w-full bg-blue-600 cursor-pointer text-white py-3 rounded-xl text-lg font-semibold shadow-lg hover:bg-blue-700 active:scale-95 transition"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Booking Success + QR */}
      {step === 2 && (
        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl max-w-md w-full border border-white/30 text-center animate-fadeIn">
          <div className="flex justify-center mb-4">
            <FiCheckCircle className="text-green-600 text-5xl" />
          </div>

          <h2 className="text-3xl font-bold text-green-700 mb-2">
            Booking Successful!
          </h2>

          <p className="text-gray-700">Your Booking ID:</p>
          <p className="font-bold text-xl text-gray-900 mb-4">{bookingId}</p>

          <div className="flex justify-center my-6">
            <div className="p-3 bg-white rounded-xl shadow-lg">
              <QRCode value={bookingId} size={180} qrStyle="dots" />
            </div>
          </div>

          <button
            onClick={handleDownload}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 font-semibold active:scale-95 transition"
          >
            Download Ticket
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
