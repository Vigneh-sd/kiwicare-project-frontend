import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

function RequestHelp() {
  const [volunteers, setVolunteers] = useState([]);
  const [selectedVolunteerId, setSelectedVolunteerId] = useState('');
  const [message, setMessage] = useState('');

  const accessToken = localStorage.getItem('accessToken');
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/volunteers`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setVolunteers(response.data);
      } catch (error) {
        console.error('Error fetching volunteers:', error);
        toast.error('Failed to load volunteers.');
      }
    };

    fetchVolunteers();
  }, [accessToken, BASE_URL]);

  const handleSendMessage = async () => {
    if (!selectedVolunteerId || !message.trim()) {
      toast.warning('Please select a volunteer and enter a message.');
      return;
    }

    try {
      const decodedToken = jwtDecode(accessToken);
      const senderId = decodedToken.id;
      const receiverId = Number(selectedVolunteerId);

      await axios.post(
        `${BASE_URL}/messages`,
        {
          senderId,
          receiverId,
          content: message,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      toast.success('Message sent successfully!');
      setSelectedVolunteerId('');
      setMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
      toast.error('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-blue-700 text-center mb-2">📨 Request Help</h2>
        <p className="text-center text-gray-600 mb-6">Select a volunteer and describe your situation below.</p>

        <div className="space-y-6">
          {/* Volunteer Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Volunteer</label>
            <select
              value={selectedVolunteerId}
              onChange={(e) => setSelectedVolunteerId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Choose Volunteer --</option>
              {volunteers.map((vol) => (
                <option key={vol.id} value={vol.id}>
                  {vol.name} ({vol.location})
                </option>
              ))}
            </select>
          </div>

          {/* Message Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
            <textarea
              rows="5"
              placeholder="Describe your request or situation..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSendMessage}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
          >
            📨 Send Request
          </button>
        </div>
      </div>
    </div>
  );
}

export default RequestHelp;
