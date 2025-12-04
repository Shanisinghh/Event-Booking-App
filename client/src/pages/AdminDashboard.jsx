import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setBookingData, setEventData } from "../redux/eventSlice";

const AdminDashboard = () => {
  const API = import.meta.env.VITE_API_URL;

  const events = useSelector((state) => state?.events?.eventsData);
  const dispatch = useDispatch();

  const [eventReFetch, setEventReFetch] = useState(false);

  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    location: "",
    date: "",
    seats: "",
    price: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const fetchData = async () => {
    setLoading(true);

    try {
      const [evRes] = await Promise.all([axios.get(`${API}/api/events`)]);
      dispatch(setEventData(evRes.data));
    } catch (err) {
      console.error("Error fetching data:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [eventReFetch]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => setImage(e.target.files[0]);

  const handleAdd = async () => {
    if (editingId) return handleUpdate();
    if (
      !form.title ||
      !form.location ||
      !form.date ||
      !form.seats ||
      !form.price ||
      !form.description
    ) {
      toast.error("All fields are required");
    }

    try {
      setBtnLoading(true);
      let formData = new FormData();
      Object.keys(form).forEach((key) => formData.append(key, form[key]));
      if (image) formData.append("image", image);

      const res = await axios.post(`${API}/api/events`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Event Added Successfully");
      setEventReFetch(!eventReFetch);
      setImage(null);
      resetForm();
    } catch (err) {
      console.log(err);
      console.error(err);
    }
    setBtnLoading(false);
  };

  const resetForm = () => {
    setForm({
      title: "",
      location: "",
      date: "",
      seats: 0,
      price: "",
      description: "",
    });
    setImage(null);
    setEditingId(null);
  };

  const handleEdit = (event) => {
    setForm({
      title: event.title,
      location: event.location,
      date: event.date.split("T")[0],
      seats: event.seats,
      price: event.price,
      description: event.description,
    });
    setEditingId(event._id);
  };

  const handleUpdate = async () => {
    try {
      setBtnLoading(true);
      const res = await axios.put(`${API}/api/events/${editingId}`, form);
      toast.success("Event Updated Successfully");
      setEventReFetch(!eventReFetch);
      resetForm();
    } catch (err) {
      toast.error(err);
      console.error(err);
    }
    setBtnLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/api/events/${id}`);
      toast.success("Event Deleted Successfully");
      setEventReFetch(!eventReFetch);
    } catch (err) {
      toast.error(err);
      console.error(err);
    }
  };

  const Loader = () => (
    <div className="flex justify-center py-10">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="bg-[#f0e8e8] mt-12 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8 tracking-tight">
          Admin Dashboard
        </h1>

        {/* FORM */}
        <div className="bg-[#ffffff] p-6 rounded-2xl shadow-2xl border border-gray-200 mb-10">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            {editingId ? "✏️ Edit Event" : "➕ Add New Event"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="Event Title"
              className="border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300 outline-none"
            />

            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              required
              placeholder="Location"
              className="border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300 outline-none"
            />

            <input
              name="date"
              type="date"
              required
              value={form.date}
              onChange={handleChange}
              className="border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300 outline-none"
            />

            <input
              name="seats"
              type="number"
              required
              value={form.seats}
              onChange={handleChange}
              placeholder="Available Seats"
              className="border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300 outline-none"
            />

            <input
              name="price"
              type="number"
              value={form.price}
              required
              onChange={handleChange}
              placeholder="Ticket Price (₹)"
              className="border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300 outline-none"
            />

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              placeholder="Event Description"
              rows="3"
              className="border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300 outline-none sm:col-span-2"
            />

            <input
              type="file"
              accept="image/*"
              required
              onChange={handleImageChange}
              className="border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300 outline-none sm:col-span-2"
            />
          </div>

          <button
            onClick={handleAdd}
            disabled={btnLoading}
            className="mt-6 bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg shadow-md transition flex items-center gap-2 disabled:bg-blue-300"
          >
            {btnLoading && (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}
            {editingId ? "Update Event" : "Add Event"}
          </button>
        </div>

        {/* MAIN LOADER */}
        {loading ? (
          <Loader />
        ) : (
          <>
            {/* EVENTS TABLE */}
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">
              📅 Events List
            </h2>

            <div className="overflow-x-auto bg-white shadow-xl rounded-2xl border border-gray-200">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100 text-gray-700">
                  <tr className="text-left">
                    <th className="p-4 border">Title</th>
                    <th className="p-4 border">Location</th>
                    <th className="p-4 border">Date</th>
                    <th className="p-4 border text-center">Seats</th>
                    <th className="p-4 border text-blue-700">Price</th>
                    <th className="p-4 border">Description</th>
                    <th className="p-4 border">Image</th>
                    <th className="p-4 border">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {events.map((ev) => (
                    <tr
                      key={ev._id}
                      className="hover:bg-blue-50 transition border-b"
                    >
                      <td className="p-4">{ev.title}</td>
                      <td className="p-4">{ev.location}</td>
                      <td className="p-4">{ev.date.split("T")[0]}</td>
                      <td className="p-4 text-center">{ev.seats}</td>
                      <td className="p-4 font-semibold text-blue-700">
                        ₹{ev.price}
                      </td>

                      <td className="p-4 max-w-xs">
                        <p className="line-clamp-2 text-gray-600">
                          {ev.description}
                        </p>
                      </td>

                      <td className="p-4">
                        {ev.image ? (
                          <img
                            src={ev.image}
                            className="w-20 h-14 object-cover rounded-lg shadow border"
                          />
                        ) : (
                          <span className="text-gray-400 italic">No Image</span>
                        )}
                      </td>

                      <td className="p-4 flex gap-3">
                        <button
                          onClick={() => handleEdit(ev)}
                          className="bg-yellow-500 cursor-pointer text-white px-4 py-1.5 rounded-lg shadow hover:bg-yellow-600"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(ev._id)}
                          className="bg-red-600 cursor-pointer text-white px-4 py-1.5 rounded-lg shadow hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
