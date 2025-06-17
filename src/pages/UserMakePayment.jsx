import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

function UserMakePayment() {
  const [bookings, setBookings] = useState([]);
  const [selectedBookingId, setSelectedBookingId] = useState('');
  const [amount, setAmount] = useState('');
  const accessToken = localStorage.getItem('accessToken');
  const decoded = jwtDecode(accessToken);
  const userId = decoded.id;

  useEffect(() => {
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

    fetchBookings();
  }, [userId, accessToken]);

  const handlePayment = async () => {
    if (!selectedBookingId || !amount) {
      toast.warning("Please select booking and enter amount.");
      return;
    }

    try {
      await axios.post('http://localhost:8080/payments', {
        userId,
        bookingId: selectedBookingId,
        amount,
      }, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      toast.success("Payment successful!");
      setSelectedBookingId('');
      setAmount('');
    } catch (error) {
      console.error('Payment error:', error);

      const msg =
        error?.response?.data?.message ||
        error?.response?.data ||
        'Payment failed. Try again.';

      toast.error(msg);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">💳 Make Payment</h2>

      <label className="block mb-1">Select Booking</label>
      <select
        value={selectedBookingId}
        onChange={(e) => setSelectedBookingId(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      >
        <option value="">-- Choose Booking --</option>
        {bookings.map((b) => (
          <option key={b.id} value={b.id}>
            {b.date} | {b.timeSlot} | Volunteer: {b.volunteer?.name}
          </option>
        ))}
      </select>

      <label className="block mb-1">Amount</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />

      <button
        onClick={handlePayment}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        ✅ Pay Now
      </button>
    </div>
  );
}

export default UserMakePayment;
