import React from "react";
// import Logo from "../assets/MovieLogo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex items-center space-x-8 bg-gray-900 p-4  shadow-lg">
      {/* Logo Section */}
      <img
        className="w-[50px] h-[50px] object-contain rounded-2xl"
        src="/MovieLogo.png"
        alt="Movie Logo"
      />

      {/* Navigation Links */}
      <div className="flex space-x-8">
        <Link
          to="/"
          className="text-white text-2xl font-semibold hover:text-yellow-400 transition-colors duration-300"
        >
          Home
        </Link>
        <Link
          to="/watchlist"
          className="text-white text-2xl font-semibold hover:text-yellow-400 transition-colors duration-300"
        >
          Watchlist
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
