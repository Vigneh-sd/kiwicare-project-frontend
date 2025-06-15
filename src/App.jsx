import { Routes, Route } from 'react-router-dom';
import Welcome from "./Welcome";
import Register from './pages/Register';
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import VolunteerDashboard from './pages/VolunteerDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import RequestHelp from './pages/RequestHelp';
import UserMessages from './pages/UserMessages';
import VolunteerMessages from './pages/VolunteerMessages';
import BookHelp from './pages/BookHelp';
import VolunteerAvailability from './pages/VolunteerAvailability';
import UserMyBookings from './pages/UserMyBookings';
import VolunteerMyBookings from './pages/VolunteerMyBookings';
import UserMakePayment from './pages/UserMakePayment';
import UserPaymentHistory from './pages/UserPaymentHistory';
import VolunteerSentMessages from './pages/VolunteerSentMessages';
import UserReceivedMessages from './pages/UserReceivedMessages';






import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <ToastContainer position="top-center" autoClose={3000} />

      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/user/dashboard" element={
          <ProtectedRoute allowedRoles={['USER']}>
            <UserDashboard />
          </ProtectedRoute>
        } />

        <Route path="/volunteer/messages" element={
          <ProtectedRoute allowedRoles={['VOLUNTEER']}>
            <VolunteerMessages />
          </ProtectedRoute>
        } />

        <Route path="/user/my-bookings" element={
          <ProtectedRoute allowedRoles={['USER']}>
            <UserMyBookings />
          </ProtectedRoute>
        } />

        <Route path="/user/book-help" element={
          <ProtectedRoute allowedRoles={['USER']}>
            <BookHelp />
          </ProtectedRoute>
        } />
        <Route path="/volunteer/sent-messages" element={
  <ProtectedRoute allowedRoles={['VOLUNTEER']}>
    <VolunteerSentMessages />
  </ProtectedRoute>
} />
          <Route path="/user/received-messages" element={
  <ProtectedRoute allowedRoles={['USER']}>
    <UserReceivedMessages />
  </ProtectedRoute>
} />
         

        <Route path="/admin/dashboard" element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />

        <Route path="/user/pay" element={
          <ProtectedRoute allowedRoles={['USER']}>
            <UserMakePayment />
          </ProtectedRoute>
        } />

        <Route path="/user/payment-history" element={
          <ProtectedRoute allowedRoles={['USER']}>
            <UserPaymentHistory />
          </ProtectedRoute>
        } />

        <Route path="/volunteer/availability" element={<VolunteerAvailability />} />

        <Route path="/user/request-help" element={
          <ProtectedRoute allowedRoles={['USER']}>
            <RequestHelp />
          </ProtectedRoute>
        } />

        <Route path="/user/messages" element={
          <ProtectedRoute allowedRoles={['USER']}>
            <UserMessages />
          </ProtectedRoute>
        } />

        <Route path="/volunteer/my-bookings" element={
          <ProtectedRoute allowedRoles={['VOLUNTEER']}>
            <VolunteerMyBookings />
          </ProtectedRoute>
        } />

        <Route path="/volunteer/dashboard" element={
          <ProtectedRoute allowedRoles={['VOLUNTEER']}>
            <VolunteerDashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;
