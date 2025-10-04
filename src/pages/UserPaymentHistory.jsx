import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Circles } from 'react-loader-spinner';

function UserPaymentHistory() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const accessToken = localStorage.getItem('accessToken');
  const userId = jwtDecode(accessToken).id;

  // ✅ Use environment-based API URL
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/payments/user/${userId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setPayments(res.data);
      } catch (err) {
        console.error('Failed to fetch payments', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, [API_BASE_URL, userId, accessToken]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">📄 Payment History</h2>

        {loading ? (
          <div className="flex justify-center mt-8">
            <Circles height="60" width="60" color="#4fa94d" />
          </div>
        ) : payments.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No payments made yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 text-sm rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="py-3 px-4 border-b text-left">Volunteer</th>
                  <th className="py-3 px-4 border-b text-left">Date</th>
                  <th className="py-3 px-4 border-b text-left">Time</th>
                  <th className="py-3 px-4 border-b text-left">Amount</th>
                  <th className="py-3 px-4 border-b text-left">Status</th>
                  <th className="py-3 px-4 border-b text-left">Paid At</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">
                      {p.booking
                        ? p.booking.volunteer?.name || '[Unknown Volunteer]'
                        : '— Cancelled —'}
                    </td>
                    <td className="py-3 px-4 border-b">
                      {p.booking ? p.booking.date : '—'}
                    </td>
                    <td className="py-3 px-4 border-b">
                      {p.booking ? p.booking.timeSlot : '—'}
                    </td>
                    <td className="py-3 px-4 border-b">
                      ${p.amount.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 border-b">
                      {p.status}
                    </td>
                    <td className="py-3 px-4 border-b">
                      {new Date(p.paymentTime).toLocaleString()}
                    </td>
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

export default UserPaymentHistory;
