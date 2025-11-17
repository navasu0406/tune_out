import React, { useEffect, useRef, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import DisplayHome from "./DisplayHome";
import DisplayAlbum from "./DisplayAlbum";
import axios from "axios";

const Display = () => {
  const displayRef = useRef();
  const location = useLocation();

  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    axios.get("/api/album/list").then((res) => {
      if (res.data.success) setAlbums(res.data.albums);
    });
  }, []);

  const isAlbum = location.pathname.startsWith("/album/");
  const albumId = isAlbum ? location.pathname.split("/").pop() : null;

  const album = albums.find((a) => a._id === albumId);
  const bgColor = album?.bgColor || "#121212";

  useEffect(() => {
    if (displayRef.current)
      displayRef.current.style.background = `linear-gradient(${bgColor}, #121212)`;
  }, [bgColor]);

  return (
    <div
      ref={displayRef}
      className="w-full px-6 pt-4 text-white overflow-auto transition-colors duration-500"
    >
      <Routes>
        <Route path="/" element={<DisplayHome />} />
        <Route path="/album/:id" element={<DisplayAlbum />} />
      </Routes>
    </div>
  );
};

export default Display;
