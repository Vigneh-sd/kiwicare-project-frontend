import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

function UserMyBookings() {
  const [bookings, setBookings] = useState([]);
  const accessToken = localStorage.getItem('accessToken');
  const decoded = jwtDecode(accessToken);
  const userId = decoded.id;

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/bookings/user/${userId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setBookings(res.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to load bookings');
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      await axios.delete(`http://localhost:8080/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      toast.success('Booking cancelled and refunded');
      fetchBookings();
    } catch (error) {
      console.error('Cancel booking failed:', error);
      toast.error('Failed to cancel booking');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg mt-8">
      <h2 className="text-xl font-bold mb-4 text-gray-800">📅 My Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        bookings.map((booking) => (
          <div key={booking.id} className="border p-4 rounded mb-4">
            <p><strong>Volunteer:</strong> {booking.volunteer?.name}</p>
            <p><strong>Date:</strong> {booking.date}</p>
            <p><strong>Time:</strong> {booking.timeSlot}</p>
            <button
              onClick={() => cancelBooking(booking.id)}
              className="mt-2 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
            >
              ❌ Cancel Booking
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default UserMyBookings;
