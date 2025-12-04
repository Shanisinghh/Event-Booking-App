import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventListPage from "./pages/EventListPage";
import BookingPage from "./pages/BookingPage";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AllBookings from "./pages/AllBookings";
import ScrollToTop from "./components/ScrollToTop";
import fetchData from "./costumHooks/fetchData";

function App() {
  fetchData();
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <ScrollToTop />
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<EventListPage />} />
            <Route path="/booking/:id" element={<BookingPage />} />
            <Route path="/bookings" element={<AllBookings />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
          <Footer />
        </main>
      </div>
    </Router>
  );
}

export default App;
