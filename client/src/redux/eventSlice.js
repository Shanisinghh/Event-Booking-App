import { createSlice } from "@reduxjs/toolkit";

const eventSlice = createSlice({
  name: "events",
  initialState: {
    eventsData: [],
    bookingData: [],
  },
  reducers: {
    setEventData: (state, action) => {
      state.eventsData = action.payload;
    },
    setBookingData: (state, action) => {
      state.bookingData = action.payload;
    },
  },
});

export const { setEventData, setBookingData } = eventSlice.actions;
export default eventSlice.reducer;
