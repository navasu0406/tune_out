import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-[25%] h-full p-4 hidden lg:flex flex-col text-white bg-[#121212] rounded">

      {/* Website Name */}
      <h1 className="text-3xl font-extrabold mb-8 pl-2">
        Tune Out
      </h1>

      {/* Home Button */}
      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-3 pl-2 cursor-pointer hover:text-gray-300 transition"
      >
        <img className="w-6" src={assets.home_icon} alt="Home" />
        <p className="font-bold text-lg">Home</p>
      </div>

    </div>
  );
};

export default Sidebar;
