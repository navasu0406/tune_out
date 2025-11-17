import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // ✅ You forgot this import
import { url } from '../App';

const ListSong = () => {
  const [data, setData] = useState([]);

  // ✅ Fetch all songs
  const fetchSongs = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`);
      if (response.data.success) {
        setData(response.data.songs);
      } else {
        toast.error("Failed to load songs");
      }
    } catch (error) {
      console.error("Fetch songs error:", error);
      toast.error("Error fetching songs");
    }
  };

  // ✅ Remove a song
  const removeSong = async (id) => {
    try {
      const response = await axios.post(`${url}/api/song/remove`, { id });

      if (response.data.success) {
        toast.success(response.data.message);
        fetchSongs(); // refresh after deletion
      } else {
        toast.error("Failed to remove song");
      }
    } catch (error) {
      console.error("Remove song error:", error);
      toast.error("Error removing song");
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <div className="p-5">
      <p className="text-lg font-semibold text-purple-700 mb-3">All Songs List</p>

      {/* Header Row */}
      <div className="hidden sm:grid grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-purple-300 text-sm bg-purple-100 rounded-md">
        <b>Image</b>
        <b>Name</b>
        <b>Album</b>
        <b>Duration</b>
        <b>Action</b>
      </div>

      {/* Data Rows */}
      {data.length > 0 ? (
        data.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-purple-200 text-sm mt-2 rounded-md hover:bg-purple-50 transition"
          >
            <img
              className="w-12 h-12 object-cover rounded-md"
              src={item.image}
              alt={item.name}
            />
            <p>{item.name}</p>
            <p>{item.album}</p>
            <p>{item.duration}</p>
            <button
              onClick={() => removeSong(item._id)}
              className="text-red-500 hover:text-red-700 font-bold text-lg cursor-pointer"
            >
              ×
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-500 mt-3">No songs available.</p>
      )}
    </div>
  );
};

export default ListSong;
