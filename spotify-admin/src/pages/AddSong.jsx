import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const AddSong = () => {
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [album, setAlbum] = useState("none");
  const [loading, setLoading] = useState(false);
  const [albumData, setAlbumData] = useState([]);

  // Load Album List
  const loadAlbumData = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      if (response.data.success) {
        setAlbumData(response.data.albums);
      } else {
        toast.error("Unable to load albums");
      }
    } catch (error) {
      toast.error("Error loading albums");
    }
  };

  useEffect(() => {
    loadAlbumData();
  }, []);

  // Submit Handler
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!audio || !image) {
      toast.error("Upload song and image");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("desc", desc);
      formData.append("image", image);
      formData.append("audio", audio);
      formData.append("album", album);

      const response = await axios.post(`${url}/api/song/add`, formData);

      if (response.data.success) {
        toast.success("Song Added!");

        setName("");
        setDesc("");
        setAlbum("none");
        setImage(null);
        setAudio(null);
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error("Server error");
    }

    setLoading(false);
  };

  return loading ? (
    <div className="grid place-items-center min-h-[80vh]">
      <div className="w-16 h-16 border-4 border-pink-400 border-t-purple-700 rounded-full animate-spin"></div>
    </div>
  ) : (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-start gap-8 text-purple-600"
    >
      {/* Upload Section */}
      <div className="flex gap-8">
        {/* Upload Song */}
        <div className="flex flex-col gap-3">
          <p>Upload Song</p>
          <input
            type="file"
            id="song"
            hidden
            accept="audio/*"
            onChange={(e) => setAudio(e.target.files[0])}
          />
          <label htmlFor="song" className="cursor-pointer">
            <img
              src={audio ? assets.upload_added : assets.upload_song}
              className="w-24 hover:opacity-80"
              alt="Upload Song"
            />
          </label>
        </div>

        {/* Upload Image */}
        <div className="flex flex-col gap-3">
          <p>Upload Image</p>
          <input
            type="file"
            id="image"
            hidden
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <label htmlFor="image" className="cursor-pointer">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              className="w-24 hover:opacity-80"
              alt="Upload Image"
            />
          </label>
        </div>
      </div>

      {/* Song Name */}
      <div className="flex flex-col gap-2">
        <p>Song Name</p>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-transparent border-2 border-pink-400 outline-purple-500 p-2 w-[max(40vw,250px)]"
          placeholder="Enter song name"
        />
      </div>

      {/* Song Description */}
      <div className="flex flex-col gap-2">
        <p>Description</p>
        <input
          type="text"
          required
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="bg-transparent border-2 border-pink-400 outline-purple-500 p-2 w-[max(40vw,250px)]"
          placeholder="Enter description"
        />
      </div>

      {/* Album Dropdown */}
      <div className="flex flex-col gap-2">
        <p>Album</p>
        <select
          value={album}
          onChange={(e) => setAlbum(e.target.value)}
          className="bg-transparent border-2 border-purple-400 outline-pink-400 p-2 w-[150px]"
        >
          <option value="none">None</option>

          {albumData.map((item) => (
            <option key={item._id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-pink-400 text-purple-700 px-10 py-3 rounded hover:bg-pink-500 transition"
      >
        Add Song
      </button>
    </form>
  );
};

export default AddSong;
