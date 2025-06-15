import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

function BookHelp() {
  const [date, setDate] = useState('');
  const [fromTime, setFromTime] = useState('');
  const [toTime, setToTime] = useState('');
  const [volunteers, setVolunteers] = useState([]);
  const [selectedVolunteerId, setSelectedVolunteerId] = useState('');

  const accessToken = localStorage.getItem('accessToken');
  const userId = jwtDecode(accessToken).id;

  const handleSearch = async () => {
    if (!date || !fromTime || !toTime) {
      toast.warning("Please select date and time range.");
      return;
    }

    try {
      const res = await axios.get(`http://localhost:8080/availability/search`, {
        params: { date, fromTime, toTime },
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      setVolunteers(res.data);
      if (res.data.length === 0) {
        toast.info("No volunteers found.");
      }
    } catch (error) {
      console.error('Error fetching volunteers:', error);
      toast.error("Could not fetch volunteers.");
    }
  };

  const handleBook = async () => {
    if (!selectedVolunteerId) {
      toast.warning("Select a volunteer to book.");
      return;
    }

    try {
      await axios.post('http://localhost:8080/bookings', {
        userId,
        volunteerId: selectedVolunteerId,
        date,
        timeSlot: fromTime
      }, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });

      toast.success("Booking successful!");
      setSelectedVolunteerId('');
      setVolunteers([]);
    } catch (error) {
      console.error("Booking failed", error);
      const message = error?.response?.data || "Booking failed.";
      toast.error(message);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">📅 Book Help</h2>

      <label className="block mb-1">Date</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        min={new Date().toISOString().split('T')[0]}
        className="w-full mb-4 p-2 border rounded"
      />

      <label className="block mb-1">From Time</label>
      <input
        type="time"
        value={fromTime}
        onChange={(e) => setFromTime(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />

      <label className="block mb-1">To Time</label>
      <input
        type="time"
        value={toTime}
        onChange={(e) => setToTime(e.target.value)}
        className="w-full mb-6 p-2 border rounded"
      />

      <button
        onClick={handleSearch}
        className="bg-indigo-600 text-white px-4 py-2 rounded mb-8 hover:bg-indigo-700"
      >
        🔍 Find Available Volunteers
      </button>

      {volunteers.length > 0 && (
        <>
          <label className="block mb-1">Select Volunteer</label>
          <select
            value={selectedVolunteerId}
            onChange={(e) => setSelectedVolunteerId(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          >
            <option value="">-- Choose --</option>
            {volunteers.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name} ({v.location})
              </option>
            ))}
          </select>

          <button
            onClick={handleBook}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            ✅ Confirm Booking
          </button>
        </>
      )}
    </div>
  );
}

export default BookHelp;
