import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div className="w-full text-white">
      {/* Top Navigation */}
      <div className="flex justify-between items-center font-semibold">
        <div className="flex items-center gap-2">
          <img
            onClick={() => navigate(-1)}
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer hover:bg-gray-800 transition-colors duration-300"
            src={assets.arrow_left}
            alt="Go Back"
          />
          <img
            onClick={() => navigate(1)}
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer hover:bg-gray-800 transition-colors duration-300"
            src={assets.arrow_right}
            alt="Go Forward"
          />
        </div>

        <div className="flex items-center gap-4">
          <p className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer hover:opacity-90 transition-opacity duration-300">
            Explore Premium
          </p>
          <p className="bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer border border-gray-600 hover:bg-gray-800 transition-colors duration-300">
            Install App
          </p>
          <p className="bg-purple-500 text-black w-7 h-7 rounded-full flex items-center justify-center font-bold">
            R
          </p>
        </div>
      </div>

      {/* Bottom Navbar / Filters */}
      <div className="flex items-center gap-2 mt-4">
        {["All", "Music", "Podcasts"].map((filter) => (
          <p
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-1 rounded-2xl cursor-pointer transition-all duration-300 ${
              activeFilter === filter
                ? "bg-white text-black"
                : "bg-black border border-gray-600 hover:bg-gray-800"
            }`}
          >
            {filter}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
