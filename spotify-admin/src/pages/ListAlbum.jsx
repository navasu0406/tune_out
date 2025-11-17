import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { url } from "../App";

const ListAlbum = () => {
  const [albums, setAlbums] = useState([]);

  // Fetch all albums
  const fetchAlbums = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);

      if (response.data.success) {
        setAlbums(response.data.albums);
      } else {
        toast.error("Failed to load albums");
      }
    } catch (error) {
      console.log(error);
      toast.error("Server error!");
    }
  };

  // Remove album
  const removeAlbum = async (id) => {
    try {
      const response = await axios.post(`${url}/api/album/remove`, { id });

      if (response.data.success) {
        toast.success("Album removed");
        fetchAlbums();
      } else {
        toast.error("Failed to remove album");
      }
    } catch (error) {
      console.log(error);
      toast.error("Server error!");
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6 text-pink-600">
        🎵 Albums List
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {albums.map((album) => (
          <div
            key={album._id}
            className="p-5 border-2 border-pink-300 rounded-2xl 
                       bg-gradient-to-br from-pink-100 via-purple-100 to-pink-50 
                       shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {/* Album Image */}
            <img
              src={album.image}
              alt={album.name}
              className="w-full h-44 object-cover rounded-xl border-2 border-purple-300"
            />

            {/* Title */}
            <h3 className="text-xl font-semibold mt-4 text-purple-700">
              {album.name}
            </h3>

            {/* Description */}
            <p className="text-sm text-purple-600 mt-1">
              {album.desc}
            </p>

            {/* Background Color Preview */}
            <div className="mt-3 flex items-center gap-3">
              <span className="text-sm text-pink-600 font-medium">Theme Color:</span>
              <div
                className="w-8 h-8 rounded-lg border-2 border-purple-400 shadow"
                style={{ background: album.bgColour }}
              ></div>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => removeAlbum(album._id)}
              className="mt-5 w-full bg-gradient-to-r from-pink-500 to-purple-600 
                         text-white py-2.5 rounded-xl text-sm font-medium shadow 
                         hover:opacity-90 transition"
            >
              Delete Album
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListAlbum;
