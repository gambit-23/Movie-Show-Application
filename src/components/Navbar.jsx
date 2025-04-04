import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gray-900 p-4 shadow-lg">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <img
            className="w-10 h-10 object-contain rounded-2xl"
            src="/MovieLogo.png"
            alt="Movie Logo"
          />
          <span className="text-white text-xl font-bold hidden sm:inline">
            MovieApp
          </span>
        </div>

        {/* Hamburger Menu (Mobile) */}
        <div className="sm:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <i className={`fas ${isOpen ? "fa-times" : "fa-bars"} text-2xl`} />
          </button>
        </div>

        {/* Links (Desktop) */}
        <div className="hidden sm:flex space-x-8">
          <Link
            to="/"
            className="text-white text-lg font-semibold hover:text-yellow-400 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            to="/watchlist"
            className="text-white text-lg font-semibold hover:text-yellow-400 transition-colors duration-300"
          >
            Watchlist
          </Link>
        </div>
      </div>

      {/* Mobile Links */}
      {isOpen && (
        <div className="flex flex-col mt-4 space-y-4 sm:hidden">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="text-white text-lg font-semibold hover:text-yellow-400 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            to="/watchlist"
            onClick={() => setIsOpen(false)}
            className="text-white text-lg font-semibold hover:text-yellow-400 transition-colors duration-300"
          >
            Watchlist
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
