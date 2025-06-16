import { useState } from 'react';
import { registerUser } from '../services/api';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    location: '',
    role: ''
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  useEffect(() => {
  console.log("🌍 VITE_API_BASE_URL:", import.meta.env.VITE_API_BASE_URL);
}, []);


 const handleSubmit = async (e) => {
  e.preventDefault();

  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
  if (!strongPasswordRegex.test(formData.password)) {
    toast.warning("Password must be at least 8 characters, include uppercase, lowercase, number, and special character.");
    return;
  }

  try {
    const response = await registerUser(formData);
    toast.success(response.data);
    console.log("Registration successful:", response.data);
  } catch (error) {
    const backendMessage =
      error?.response?.data && typeof error.response.data === 'string'
        ? error.response.data
        : "Registration failed. Please try again.";

    toast.error(backendMessage);
    console.error("Registration failed:", backendMessage);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-8">
          📝 Create Your KiwiCare Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {['name', 'email', 'password', 'location'].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 capitalize mb-1">
                {field}
              </label>
              <input
                type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
                placeholder={`Enter your ${field}`}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="">Select Role</option>
              <option value="USER">User</option>
              <option value="VOLUNTEER">Volunteer</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
          >
            ✅ Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
