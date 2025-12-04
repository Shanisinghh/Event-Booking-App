import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import EventBox from "../components/EventBox";

const Home = () => {
  const events = useSelector((state) => state?.events?.eventsData);
  console.log(events);
  return (
    <div className="w-full mt-12">
      {/* HERO SECTION */}
      <section className="bg-[url('https://images.unsplash.com/photo-1643759543584-fb6f448d42d4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGV2ZW50c3xlbnwwfHwwfHx8MA%3D%3D')] bg-cover bg-center h-[78vh] flex items-center justify-center relative">
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-4xl md:text-6xl text-shadow-2xl font-bold mb-4">
            Discover & Book Amazing Events
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Concerts • Conferences • Workshops • Festivals
          </p>

          <Link
            to="/events"
            className="bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-500 transition"
          >
            Explore Events
          </Link>
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          Upcoming Events
        </h2>

        <div className="grid grid-cols-1 px-5 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {events.slice(0, 8).map((ev) => (
            <EventBox key={ev._id} ev={ev} />
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 bg-indigo-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Create & Host Events Easily</h2>
        <p className="text-lg mb-6">
          Grow your audience and manage bookings effortlessly.
        </p>

        <Link
          to="/admin"
          className="bg-white text-indigo-600 px-8 py-3 rounded-lg text-lg font-semibold"
        >
          Create Event
        </Link>
      </section>
    </div>
  );
};

export default Home;
