import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { url } from "../App";
import { assets } from "../assets/assets";

const AddAlbum = () => {
  const [image, setImage] = useState(null); // preview
  const [imageFile, setImageFile] = useState(null); // real file
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [bgColor, setBgColor] = useState("#121212");
  const [loading, setLoading] = useState(false);

  // Handle image + preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      toast.error("Please upload an album image!");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("name", name);
      formData.append("desc", desc);
      formData.append("bgColour", bgColor); // ✅ IMPORTANT FIX

      const response = await axios.post(`${url}/api/album/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        toast.success("Album added successfully!");

        setName("");
        setDesc("");
        setBgColor("#121212");
        setImage(null);
        setImageFile(null);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Server error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-start gap-8 text-purple-600"
    >
      {/* Upload Album Image */}
      <div>
        <p className="mb-2">Upload Image</p>

        <input
          type="file"
          id="image"
          hidden
          accept="image/*"
          onChange={handleImageChange}
        />

        <label htmlFor="image">
          <img
            src={image || assets.upload_area}
            alt=""
            className="w-24 cursor-pointer border border-pink-300 rounded p-1"
          />
        </label>
      </div>

      {/* Album Name */}
      <div className="w-full">
        <p>Album Name</p>
        <input
          type="text"
          placeholder="Enter album name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-transparent border border-pink-300 text-purple-700 px-3 py-2 w-full"
        />
      </div>

      {/* Description */}
      <div className="w-full">
        <p>Description</p>
        <textarea
          placeholder="Enter description"
          required
          value={desc}
          rows="4"
          onChange={(e) => setDesc(e.target.value)}
          className="bg-transparent border border-pink-300 text-purple-700 px-3 py-2 w-full"
        ></textarea>
      </div>

      {/* Background Color */}
      <div className="w-full">
        <p>Background Color</p>
        <input
          type="color"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
          className="w-16 h-10 cursor-pointer border border-purple-400"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="bg-purple-600 text-white px-6 py-3 rounded hover:bg-purple-700 transition"
      >
        {loading ? "Uploading..." : "Add Album"}
      </button>
    </form>
  );
};

export default AddAlbum;
