import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Circles } from 'react-loader-spinner';

function UserMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const accessToken = localStorage.getItem('accessToken');
  const decodedToken = jwtDecode(accessToken);
  const userId = decodedToken.id;

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/messages/sent/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [userId, accessToken]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-blue-700 mb-4 text-center">📤 Sent Messages</h2>

        {loading ? (
          <div className="flex justify-center mt-8">
            <Circles height="60" width="60" color="#4fa94d" />
          </div>
        ) : messages.length === 0 ? (
          <p className="text-gray-600 text-center">No messages sent yet.</p>
        ) : (
          <ul className="space-y-5">
            {messages.map((msg) => (
              <li
                key={msg.id}
                className="border border-gray-200 rounded-xl p-5 shadow-sm bg-blue-50"
              >
                <div className="mb-2 text-sm text-gray-500">
                  <span className="font-medium text-gray-700">To:</span>{' '}
                  {msg.receiver?.name} ({msg.receiver?.location})
                </div>
                <div className="mb-2 text-sm text-gray-500">
                  <span className="font-medium text-gray-700">Sent at:</span>{' '}
                  {new Date(msg.timestamp).toLocaleString()}
                </div>
                <div className="text-gray-800">
                  <span className="font-medium">Message:</span> {msg.content}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default UserMessages;
