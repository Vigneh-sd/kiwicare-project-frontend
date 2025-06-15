import React from 'react';
import { useNavigate } from 'react-router-dom';

function UserDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl p-10">
        <h2 className="text-4xl font-bold text-blue-700 mb-4 text-center">👋 Welcome, User!</h2>
        <p className="text-center text-gray-600 mb-8 text-lg">
          Choose an action below to get help, manage your bookings, or handle payments.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <button
            onClick={() => navigate('/user/request-help')}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-5 rounded-xl font-semibold transition shadow"
          >
            📬 Request Help
          </button>

          <button
            onClick={() => navigate('/user/messages')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-5 rounded-xl font-semibold transition shadow"
          >
            📨 Sent Messages
          </button>

          <button
            onClick={() => navigate('/user/book-help')}
            className="bg-green-600 hover:bg-green-700 text-white py-3 px-5 rounded-xl font-semibold transition shadow"
          >
            📅 Book Help
          </button>

          <button
            onClick={() => navigate('/user/my-bookings')}
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-5 rounded-xl font-semibold transition shadow"
          >
            📋 My Bookings
          </button>

          <button
            onClick={() => navigate('/user/pay')}
            className="bg-pink-500 hover:bg-pink-600 text-white py-3 px-5 rounded-xl font-semibold transition shadow"
          >
            💳 Make Payment
          </button>

          <button
            onClick={() => navigate('/user/payment-history')}
            className="bg-gray-700 hover:bg-gray-800 text-white py-3 px-5 rounded-xl font-semibold transition shadow"
          >
            📄 Payment History
          </button>
          <button
  onClick={() => navigate('/user/received-messages')}
  className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-5 rounded-xl font-semibold transition shadow"
>
  📥 Received Messages
</button>

        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
