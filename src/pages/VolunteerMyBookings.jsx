import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Circles } from 'react-loader-spinner';

function VolunteerMyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const accessToken = localStorage.getItem('accessToken');
  const decodedToken = jwtDecode(accessToken);
  const volunteerId = decodedToken.id;
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/bookings/volunteer/${volunteerId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [volunteerId, accessToken, BASE_URL]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-blue-700 mb-2">📋 My Assigned Bookings</h2>
        <p className="text-gray-600 mb-6">These are the user bookings assigned to you.</p>

        {loading ? (
          <div className="flex justify-center mt-10">
            <Circles height="60" width="60" color="#4fa94d" />
          </div>
        ) : bookings.length === 0 ? (
          <p className="text-center text-gray-500">No bookings assigned yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 text-sm">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="py-2 px-4 border-b">Date</th>
                  <th className="py-2 px-4 border-b">Time</th>
                  <th className="py-2 px-4 border-b">User</th>
                  <th className="py-2 px-4 border-b">Location</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">{booking.date}</td>
                    <td className="py-2 px-4 border-b">{booking.timeSlot}</td>
                    <td className="py-2 px-4 border-b">{booking.user.name}</td>
                    <td className="py-2 px-4 border-b">{booking.user.location}</td>
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

export default VolunteerMyBookings;
