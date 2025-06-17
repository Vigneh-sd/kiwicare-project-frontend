import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-50">
      <h1 className="text-2xl font-bold text-blue-600 tracking-wide">
        <Link to="/">KiwiCare</Link>
      </h1>

      <div className="space-x-4">
        <Link
          to="/login"
          className="text-gray-700 hover:text-blue-600 font-medium transition duration-200"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="text-gray-700 hover:text-blue-600 font-medium transition duration-200"
        >
          Register
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;