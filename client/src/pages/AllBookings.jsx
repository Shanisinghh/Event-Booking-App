import React, { useEffect, useState } from "react";
import { QRCode } from "react-qrcode-logo";
import { FiChevronLeft, FiTrash2, FiDownload } from "react-icons/fi";
import { useSelector } from "react-redux";

const BookingsPage = () => {
  const API = import.meta.env.VITE_API_URL;
  const bookings = useSelector((state) => state?.events?.bookingData);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState("");

  const formatDateTime = (iso) => {
    try {
      const d = new Date(iso);
      return d.toLocaleString(); // local format
    } catch {
      return iso;
    }
  };

  const handleDownloadQR = (value = selected?.bookingId) => {
    const canvas = document.querySelector("canvas");
    if (!canvas) {
      alert("QR not available to download.");
      return;
    }
    const link = document.createElement("a");
    link.download = `ticket-${value || "booking"}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#f3ecec] p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">My Bookings</h1>

        {error && (
          <div className="mb-4 text-red-600 bg-red-50 p-3 rounded">{error}</div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left: bookings list */}
          <div className="md:col-span-1 bg-white rounded-lg overflow-auto h-[50vh]  md:h-[100vh] shadow p-4">
            <h2 className="font-semibold mb-3">Bookings ({bookings.length})</h2>

            {bookings.length === 0 ? (
              <p className="text-gray-500">No bookings found.</p>
            ) : (
              <ul className="space-y-3">
                {bookings.map((b) => {
                  const event =
                    typeof b.eventId === "object" ? b.eventId : null;
                  return (
                    <li
                      key={b._id}
                      onClick={() => setSelected(b)}
                      className={`cursor-pointer p-3 rounded-lg border ${
                        selected?._id === b._id
                          ? "bg-blue-50 border-blue-200"
                          : "bg-white border-gray-100"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-sm font-medium">
                            {event?.title || b.eventTitle || "Untitled Event"}
                          </div>
                          <div className="text-xs text-gray-500">
                            {event?.location || "—"}
                          </div>
                        </div>

                        <div className="text-xs text-gray-500 text-right">
                          <div>{b.bookingId}</div>
                          <div className="mt-1">
                            {formatDateTime(b.bookingDate)}
                          </div>
                        </div>
                      </div>

                      <div className="mt-2 text-xs text-gray-600 flex gap-3">
                        <div>
                          Seats: <strong>{b.seats}</strong>
                        </div>
                        <div>
                          Status:{" "}
                          <span
                            className={`ml-1 font-semibold ${
                              b.status === "confirmed"
                                ? "text-green-600"
                                : "text-yellow-600"
                            }`}
                          >
                            {b.status}
                          </span>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Right: booking details */}
          <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
            {!selected ? (
              <div className="text-gray-500">
                Select a booking to see details.
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between">
                  <div>
                    <button
                      onClick={() => setSelected(null)}
                      className="text-sm text-gray-500 flex items-center gap-2 pb-2"
                    >
                      <FiChevronLeft /> Back
                    </button>

                    <h3 className="text-xl font-bold">
                      {selected.eventId?.title || "Event"}
                    </h3>
                    <div className="text-sm text-gray-600 mt-1">
                      {selected.eventId?.location} • {selected.eventId?.date}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm text-gray-500">Booking Date</div>
                    <div className="font-medium">
                      {formatDateTime(selected.bookingDate)}
                    </div>
                    <div className="mt-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          selected.status === "confirmed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {selected.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm text-gray-500">Attendee</h4>
                    <div className="mt-2">
                      <div className="font-medium">{selected.name}</div>
                      <div className="text-sm text-gray-600">
                        {selected.email}
                      </div>
                      <div className="text-sm text-gray-600">
                        📱 {selected.mobile}
                      </div>
                    </div>

                    <h4 className="text-sm text-gray-500 mt-4">Booking</h4>
                    <div className="mt-2 text-sm text-gray-700">
                      <div>
                        Booking ID: <strong>{selected.bookingId}</strong>
                      </div>
                      <div className="mt-1">
                        Seats: <strong>{selected.seats}</strong>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <button
                        onClick={() => handleDownloadQR(selected.bookingId)}
                        className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                      >
                        <FiDownload /> Download QR
                      </button>
                    </div>
                  </div>

                  <div className="border-l pl-4">
                    <h4 className="text-sm text-gray-500">Event Details</h4>
                    <div className="mt-3 text-sm text-gray-700">
                      <div className="font-medium">
                        {selected.eventId?.title}
                      </div>
                      <div className="text-gray-600 mt-1">
                        Location: {selected.eventId?.location}
                      </div>
                      <div className="text-gray-600 mt-1">
                        Date: {selected.eventId?.date}
                      </div>
                      {/* If you want to show price, you can include selected.eventId.price */}
                    </div>

                    {/* QR */}
                    <div className="mt-6 flex justify-center">
                      <div className="bg-white p-3 rounded shadow">
                        <QRCode
                          value={selected.bookingId}
                          size={170}
                          qrStyle="dots"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingsPage;
