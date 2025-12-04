import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `px-3 py-1 rounded-md 
     ${
       isActive
         ? "bg-gray-700 text-blue-100"
         : "hover:bg-gray-800 hover:text-yellow-300"
     }
     transition`;

  return (
    <nav className="bg-[#1d1d1d] z-50 fixed top-0 right-0 left-0 text-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-semibold">
          EventPortal
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/events" className={linkClass}>
            Events
          </NavLink>
          <NavLink to="/bookings" className={linkClass}>
            Bookings
          </NavLink>
          <NavLink to="/admin" className={linkClass}>
            Admin
          </NavLink>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col gap-2 bg-gray-800 px-6 py-4">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={linkClass}
          >
            Home
          </NavLink>
          <NavLink
            to="/events"
            onClick={() => setIsOpen(false)}
            className={linkClass}
          >
            Events
          </NavLink>
          <NavLink
            to="/bookings"
            onClick={() => setIsOpen(false)}
            className={linkClass}
          >
            Bookings
          </NavLink>
          <NavLink
            to="/admin"
            onClick={() => setIsOpen(false)}
            className={linkClass}
          >
            Admin
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
