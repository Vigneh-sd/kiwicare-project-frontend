import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { Circles } from 'react-loader-spinner';

function VolunteerDashboard() {
  const navigate = useNavigate();
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);
  const accessToken = localStorage.getItem('accessToken');
  const decodedToken = jwtDecode(accessToken);
  const volunteerId = decodedToken.id;

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/availability/get/${volunteerId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setAvailability(response.data);
      } catch (error) {
        console.error('Error fetching availability:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-700 mb-2">🧑‍⚕️ Volunteer Dashboard</h2>
        <p className="text-gray-600 mb-6">Welcome, Volunteer!</p>

        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => navigate('/volunteer/messages')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            📥 View Received Messages
          </button>

          <button
            onClick={() => navigate('/volunteer/my-bookings')}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            📅 My Bookings
          </button>

          <button
            onClick={() => navigate('/volunteer/availability')}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            ⏱️ Set Availability
          </button>

          <button
            onClick={() => navigate('/volunteer/sent-messages')}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
          >
            📤 Sent Messages
          </button>
        </div>

        <h3 className="text-xl font-semibold mb-4">📅 Your Availability</h3>

        {loading ? (
          <div className="flex justify-center mt-8">
            <Circles height="60" width="60" color="#4fa94d" />
          </div>
        ) : availability.length === 0 ? (
          <p className="text-gray-500">No availability set yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 shadow text-sm rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">Date</th>
                  <th className="px-4 py-2 border">From</th>
                  <th className="px-4 py-2 border">To</th>
                </tr>
              </thead>
              <tbody>
                {availability.map((entry, index) => (
                  <tr key={index} className="text-center hover:bg-gray-50">
                    <td className="px-4 py-2 border">{entry.date}</td>
                    <td className="px-4 py-2 border">{entry.fromTime}</td>
                    <td className="px-4 py-2 border">{entry.toTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default VolunteerDashboard;
