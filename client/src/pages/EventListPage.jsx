import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EventBox from "../components/EventBox";

const EventListPage = () => {
  const API = import.meta.env.VITE_API_URL;
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({ q: "", location: "", date: "" });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${API}/api/events`);
        setEvents(res.data);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };
    fetchEvents();
  }, []);

  const locations = useMemo(
    () => [...new Set(events.map((e) => e.location))],
    [events]
  );

  const filtered = useMemo(
    () =>
      events.filter((e) => {
        const byQ =
          !filters.q || e.title.toLowerCase().includes(filters.q.toLowerCase());
        const byLoc = !filters.location || e.location === filters.location;
        const byDate = !filters.date || e.date.startsWith(filters.date);
        return byQ && byLoc && byDate;
      }),
    [events, filters]
  );

  return (
    <div className="min-h-screen mt-12 bg-[#f1e8e8] text-black py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-black">
          Explore Events
        </h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center text-black">
          <input
            type="text"
            placeholder="Search by title..."
            value={filters.q}
            onChange={(e) => setFilters({ ...filters, q: e.target.value })}
            className="border rounded-lg px-4 py-2 shadow-sm focus:ring focus:ring-blue-200 outline-none"
          />

          <select
            value={filters.location}
            onChange={(e) =>
              setFilters({ ...filters, location: e.target.value })
            }
            className="border rounded-lg px-4 py-2 shadow-sm focus:ring focus:ring-blue-200 outline-none"
          >
            <option value="">All Locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={filters.date}
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
            className="border rounded-lg px-4 py-2 shadow-sm focus:ring focus:ring-blue-200 outline-none"
          />
        </div>

        {/* Event Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {filtered.length > 0 ? (
            filtered.map((ev) => <EventBox key={ev._id} ev={ev} />)
          ) : (
            <p className="text-center col-span-full text-gray-500 text-lg">
              No events found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventListPage;
