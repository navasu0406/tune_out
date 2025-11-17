import React, { useEffect, useState, useContext } from "react";
import Navbar from "./Navbar";
import AlbumItem from "./AlbumItem";
import SongItem from "./SongItem";
import { PlayerContext } from "../context/PlayerContext";

const DisplayHome = () => {
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
  const { playWithId } = useContext(PlayerContext);

  const fetchAlbums = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/album/list");
      const data = await res.json();
      if (data.success) setAlbums(data.albums);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSongs = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/song/list");
      const data = await res.json();
      if (data.success) setSongs(data.songs);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAlbums();
    fetchSongs();
  }, []);

  return (
    <>
      <Navbar />

      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Albums</h1>
        <div className="flex overflow-x-auto gap-4 pb-2 scroll-smooth hide-scrollbar">
          {albums.length > 0
            ? albums.map((item) => (
                <AlbumItem
                  key={item._id}
                  name={item.name}
                  desc={item.desc}
                  id={item._id}
                  image={item.image}
                />
              ))
            : "No albums uploaded"}
        </div>
      </div>

      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Songs</h1>
        <div className="flex overflow-x-auto gap-4 pb-2 scroll-smooth hide-scrollbar">
          {songs.length > 0
            ? songs.map((item) => (
                <SongItem
                  key={item._id}
                  name={item.name}
                  desc={item.desc}
                  id={item._id}
                  image={item.image}
                  onClick={() => playWithId(item._id)}
                />
              ))
            : "No songs uploaded"}
        </div>
      </div>
    </>
  );
};

export default DisplayHome;
