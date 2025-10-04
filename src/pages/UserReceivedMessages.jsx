import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Circles } from 'react-loader-spinner';
import { toast } from 'react-toastify';

function UserReceivedMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const accessToken = localStorage.getItem('accessToken');
  const decodedToken = jwtDecode(accessToken);
  const userId = decodedToken.id;

  // ✅ Use env-based backend URL
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/messages/received/${userId}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        const messagesWithReply = response.data.map((m) => ({
          ...m,
          reply: '',
        }));
        setMessages(messagesWithReply);
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [API_BASE_URL, userId, accessToken]);

  const handleReply = async (msgId, receiverId, replyText) => {
    try {
      await axios.post(
        `${API_BASE_URL}/messages`,
        {
          senderId: userId,
          receiverId,
          content: replyText,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      toast.success('Reply sent!');
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === msgId ? { ...msg, reply: '' } : msg
        )
      );
    } catch (error) {
      console.error('Reply failed:', error);
      toast.error('Failed to send reply.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-blue-700 mb-2">
          📥 Messages from Volunteers
        </h2>
        <p className="text-gray-600 mb-6">
          These are replies sent by volunteers in response to your help requests.
          You can reply back below.
        </p>

        {loading ? (
          <div className="flex justify-center mt-10">
            <Circles height="60" width="60" color="#4fa94d" />
          </div>
        ) : messages.length === 0 ? (
          <p className="text-center text-gray-500">No replies received yet.</p>
        ) : (
          <ul className="space-y-6">
            {messages.map((msg) => (
              <li
                key={msg.id}
                className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm"
              >
                <p className="mb-1 text-sm text-gray-700">
                  <strong>From:</strong> {msg.sender.name} ({msg.sender.location})
                </p>
                <p className="mb-1 text-sm text-gray-700">
                  <strong>Sent at:</strong>{' '}
                  {new Date(msg.timestamp).toLocaleString()}
                </p>
                <p className="text-sm mb-3">
                  <strong>Message:</strong> {msg.content}
                </p>

                <textarea
                  className="w-full border border-gray-300 rounded p-2 mb-2"
                  rows="2"
                  placeholder="Type your reply..."
                  value={msg.reply}
                  onChange={(e) =>
                    setMessages((prev) =>
                      prev.map((m) =>
                        m.id === msg.id ? { ...m, reply: e.target.value } : m
                      )
                    )
                  }
                />
                <button
                  onClick={() =>
                    handleReply(msg.id, msg.sender.id, msg.reply)
                  }
                  className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition"
                >
                  📤 Send Reply
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default UserReceivedMessages;
