import React from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets'; 

const AlbumItem = ({ image, name, desc, id }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/album/${id}`)}
      className="relative group min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26] transition-all duration-300"
    >
      <img className="rounded" src={image} alt={name} />

      
      <img
        src={assets.play_icon}
        alt="Play"
        className="absolute bottom-5 right-5 w-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />

      <p className="font-bold mt-2 mb-1">{name}</p>
      <p className="text-slate-200 text-sm">{desc}</p>
    </div>
  );
};

export default AlbumItem;
