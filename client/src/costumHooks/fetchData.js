import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBookingData, setEventData } from "../redux/eventSlice";
import { useEffect } from "react";
import axios from "axios";

function fetchData() {
  const API = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();
  const fetchAllData = async () => {
    try {
      const [evRes, bkRes] = await Promise.all([
        axios.get(`${API}/api/events`),
        axios.get(`${API}/api/bookings`),
      ]);
      // setEvents(evRes.data);
      dispatch(setEventData(evRes.data));
      dispatch(setBookingData(bkRes.data));
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);
}

export default fetchData;
