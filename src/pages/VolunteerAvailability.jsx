import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

function VolunteerAvailability() {
  const accessToken = localStorage.getItem('accessToken');
  const decodedToken = jwtDecode(accessToken);
  const volunteerId = decodedToken.id;
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [date, setDate] = useState('');
  const [fromTime, setFromTime] = useState('');
  const [toTime, setToTime] = useState('');
  const [available, setAvailable] = useState(false);

  const handleSubmit = async () => {
    if (!date || !fromTime || !toTime) {
      toast.warning('Please select date, from time and to time.');
      return;
    }

    try {
      await axios.post(
        `${BASE_URL}/availability/save`,
        {
          volunteer: { id: volunteerId },
          date,
          fromTime,
          toTime,
          available,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      toast.success('Availability saved successfully!');
      setDate('');
      setFromTime('');
      setToTime('');
      setAvailable(false);
    } catch (error) {
      console.error('Failed to update availability:', error);

      let backendMessage = 'Error updating availability.';

      if (error.response) {
        const data = error.response.data;
        if (typeof data === 'string') {
          backendMessage = data;
        } else if (typeof data === 'object') {
          backendMessage = data.message || backendMessage;
        }
      }

      toast.error(backendMessage);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-800">🕒 Set Availability</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">From Time</label>
        <input
          type="time"
          value={fromTime}
          onChange={(e) => setFromTime(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">To Time</label>
        <input
          type="time"
          value={toTime}
          onChange={(e) => setToTime(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4 flex items-center gap-2">
        <input
          type="checkbox"
          checked={available}
          onChange={(e) => setAvailable(e.target.checked)}
          className="w-4 h-4"
        />
        <label className="text-sm font-medium">Available</label>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        ✅ Save Availability
      </button>
    </div>
  );
}

export default VolunteerAvailability;
