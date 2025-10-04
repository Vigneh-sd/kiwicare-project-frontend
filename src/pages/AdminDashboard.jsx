import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  const accessToken = localStorage.getItem('accessToken');
  const headers = { Authorization: `Bearer ${accessToken}` };

  //  Use environment variable instead of localhost
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/admin/users`, { headers });
      setUsers(res.data);
      toast.success('Fetched all users!');
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users.');
    }
  };

  const fetchVolunteers = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/admin/volunteers`, { headers });
      setVolunteers(res.data);
      toast.success('Fetched all volunteers!');
    } catch (error) {
      console.error('Error fetching volunteers:', error);
      toast.error('Failed to fetch volunteers.');
    }
  };

  const fetchUserById = async () => {
    if (!selectedUserId) {
      toast.warning('Enter a user ID first.');
      return;
    }

    try {
      const res = await axios.get(`${API_BASE_URL}/admin/user/${selectedUserId}`, { headers });
      setSelectedUser(res.data);
      toast.success('User found!');
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      toast.error('User not found or invalid role.');
      setSelectedUser(null);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/admin/user/${id}`, { headers });
      toast.success("User deleted!");
      fetchUsers();
      fetchVolunteers();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user.");
    }
  };

  const fetchAllBookings = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/bookings/admin/all`, { headers });
      setBookings(res.data);
      toast.success('Fetched all bookings!');
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to fetch bookings.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 sm:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-extrabold text-blue-700 mb-6">🛠️ Admin Dashboard</h2>

        <div className="flex flex-wrap gap-4 mb-8">
          <button onClick={fetchUsers} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium">
            👤 View All Users
          </button>
          <button onClick={fetchVolunteers} className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-medium">
            🙋‍♂️ View All Volunteers
          </button>
          <button onClick={fetchAllBookings} className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg font-medium">
            📋 View All Bookings
          </button>
        </div>

        <div className="mb-10">
          <label className="block font-semibold text-gray-700 mb-2">🔍 Find User by ID</label>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              placeholder="Enter user ID"
              className="border px-4 py-2 rounded-lg w-40 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={fetchUserById}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium"
            >
              Search
            </button>
          </div>

          {selectedUser && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg shadow">
              <h4 className="font-bold text-lg text-blue-700 mb-2">🎯 User Found</h4>
              <p><strong>Name:</strong> {selectedUser.name}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Location:</strong> {selectedUser.location}</p>
              <p><strong>Role:</strong> {selectedUser.role}</p>
            </div>
          )}
        </div>

        {Array.isArray(users) && users.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">👥 All Users</h3>
            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow">
              <table className="min-w-full text-sm text-center bg-white">
                <thead className="bg-gray-100 text-gray-700 font-semibold">
                  <tr>
                    <th className="px-4 py-3 border">ID</th>
                    <th className="px-4 py-3 border">Name</th>
                    <th className="px-4 py-3 border">Email</th>
                    <th className="px-4 py-3 border">Location</th>
                    <th className="px-4 py-3 border">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border">{u.id}</td>
                      <td className="px-4 py-2 border">{u.name}</td>
                      <td className="px-4 py-2 border">{u.email}</td>
                      <td className="px-4 py-2 border">{u.location}</td>
                      <td className="px-4 py-2 border">
                        <button onClick={() => deleteUser(u.id)} className="text-red-600 hover:underline font-medium">
                          🗑️ Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {Array.isArray(volunteers) && volunteers.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">🤝 All Volunteers</h3>
            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow">
              <table className="min-w-full text-sm text-center bg-white">
                <thead className="bg-gray-100 text-gray-700 font-semibold">
                  <tr>
                    <th className="px-4 py-3 border">ID</th>
                    <th className="px-4 py-3 border">Name</th>
                    <th className="px-4 py-3 border">Email</th>
                    <th className="px-4 py-3 border">Location</th>
                    <th className="px-4 py-3 border">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {volunteers.map((v) => (
                    <tr key={v.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border">{v.id}</td>
                      <td className="px-4 py-2 border">{v.name}</td>
                      <td className="px-4 py-2 border">{v.email}</td>
                      <td className="px-4 py-2 border">{v.location}</td>
                      <td className="px-4 py-2 border">
                        <button onClick={() => deleteUser(v.id)} className="text-red-600 hover:underline font-medium">
                          🗑️ Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {Array.isArray(bookings) && bookings.length > 0 && (
          <div className="mt-10">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">📋 All Bookings</h3>
            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow">
              <table className="min-w-full text-sm text-center bg-white">
                <thead className="bg-gray-100 text-gray-700 font-semibold">
                  <tr>
                    <th className="px-4 py-3 border">Date</th>
                    <th className="px-4 py-3 border">Time</th>
                    <th className="px-4 py-3 border">User</th>
                    <th className="px-4 py-3 border">Volunteer</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border">{b.date}</td>
                      <td className="px-4 py-2 border">{b.timeSlot}</td>
                      <td className="px-4 py-2 border">{b.user?.name}</td>
                      <td className="px-4 py-2 border">{b.volunteer?.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
