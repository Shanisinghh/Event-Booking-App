import React from "react";
import { Link } from "react-router-dom";

function EventBox({ ev }) {
  console.log(ev);
  return (
    <>
      <div
        key={ev._id}
        className="bg-white/70  rounded-xl shadow hover:shadow-lg transition overflow-hidden"
      >
        <img
          src={ev.image}
          alt={ev.title}
          className="w-full h-48 object-cover"
        />

        <div className="p-5">
          <h2 className="text-xl font-bold text-gray-800 mb-2">{ev.title}</h2>

          <p className="text-gray-600 text-sm">📍 {ev.location}</p>
          <p className="text-gray-600 text-sm">
            📅 {new Date(ev.date).toLocaleDateString()}
          </p>
          <p className="text-gray-600 text-sm">🎟 Seats: {ev.seats}</p>
          <p className="text-gray-800 text-md">Price: ₹ {ev.price}</p>

          <Link to={`/booking/${ev._id}`}>
            <button className="mt-4 w-full cursor-pointer bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
              Book Now
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default EventBox;
