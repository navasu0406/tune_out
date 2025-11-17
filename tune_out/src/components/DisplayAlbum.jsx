import React, { useEffect, useState, useContext } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";

const DisplayAlbum = () => {
  const { id } = useParams();
  const { playWithId } = useContext(PlayerContext);

  const [album, setAlbum] = useState(null);
  const [songs, setSongs] = useState([]);

  // fetch single album
  const fetchAlbum = async () => {
    const res = await fetch("https://tune-out-backend.onrender.com");
    const data = await res.json();

    if (data.success) {
      const found = data.albums.find(a => a._id === id);
      setAlbum(found);
    }
  };

  // fetch songs for this album
  const fetchSongs = async () => {
    const res = await fetch("https://tune-out-backend.onrender.com");
    const data = await res.json();

    if (data.success && album) {
      const filtered = data.songs.filter(song => song.album === album.name);
      setSongs(filtered);
    }
  };

  useEffect(() => {
    fetchAlbum();
  }, [id]);

  useEffect(() => {
    if (album) fetchSongs();
  }, [album]);

  if (!album) {
    return (
      <>
        <Navbar />
        <div className="text-white p-6">Album not found</div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end text-white">
        <img className="w-48 rounded" src={album.image} alt={album.name} />
        <div>
          <p className="uppercase text-sm text-gray-400">Playlist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">{album.name}</h2>
          <h4 className="text-gray-300">{album.desc}</h4>
        </div>
      </div>

      {/* Table header */}
      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p><b className="mr-4">#</b>Title</p>
        <p>Album</p>
        <p className="hidden sm:block">Date Added</p>
        <img className="m-auto w-4" src={assets.clock_icon} alt="" />
      </div>

      <hr />

      {/* Songs of this album */}
      {songs.length > 0 ? (
        songs.map((item, index) => (
          <div
            key={item._id}
            onClick={() => playWithId(item._id)}
            className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center hover:bg-[#ffffff2b] cursor-pointer text-[#a7a7a7]"
          >
            <p className="text-white flex items-center">
              <b className="mr-4">{index + 1}</b>
              <img className="w-10 mr-5 rounded" src={item.image} alt="" />
              {item.name}
            </p>

            <p>{album.name}</p>
            <p className="hidden sm:block">recent</p>
            <p>{item.duration}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-400 p-4">No songs in this album</p>
      )}
    </>
  );
};

export default DisplayAlbum;
