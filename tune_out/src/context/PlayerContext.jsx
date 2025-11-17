import { createContext, useRef, useState, useEffect } from "react";
import axios from "axios";

export const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();
  const url = "https://tune-out-backend.onrender.com";

  const [songsData, setSongsData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);
  const [track, setTrack] = useState(null);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: { second: 0, minute: 0 },
    totalTime: { second: 0, minute: 0 },
  });
  const [volume, setVolume] = useState(1); // default max

  // Play/Pause
  const play = () => {
    audioRef.current.play();
    setPlayStatus(true);
  };
  const pause = () => {
    audioRef.current.pause();
    setPlayStatus(false);
  };

  // Play a specific track by _id
  const playWithId = (id) => {
    const song = songsData.find((s) => s._id === id);
    if (song) setTrack(song);
  };

  const previous = () => {
    if (!track) return;
    const index = songsData.findIndex((s) => s._id === track._id);
    if (index > 0) setTrack(songsData[index - 1]);
  };

  const next = () => {
    if (!track) return;
    const index = songsData.findIndex((s) => s._id === track._id);
    if (index < songsData.length - 1) setTrack(songsData[index + 1]);
  };

  const seekSong = (e) => {
    if (!seekBg.current || !audioRef.current) return;
    const width = seekBg.current.clientWidth;
    const offset = e.nativeEvent.offsetX;
    audioRef.current.currentTime = (offset / width) * audioRef.current.duration;
  };

  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (audioRef.current) audioRef.current.volume = vol;
  };

  // Fetch songs and albums
  const getSongsData = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`);
      setSongsData(response.data.songs);
      if (!track && response.data.songs.length > 0) setTrack(response.data.songs[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const getAlbumsData = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      setAlbumsData(response.data.albums);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSongsData();
    getAlbumsData();
  }, []);

  // Update seek bar and time
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      const current = audio.currentTime;
      const total = audio.duration || 0;

      if (seekBar.current) {
        seekBar.current.style.width = `${(current / total) * 100}%`;
      }

      setTime({
        currentTime: {
          second: Math.floor(current % 60),
          minute: Math.floor(current / 60),
        },
        totalTime: {
          second: Math.floor(total % 60),
          minute: Math.floor(total / 60),
        },
      });
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateTime);

    if (track) {
      audio.play().then(() => setPlayStatus(true)).catch(() => setPlayStatus(false));
    }

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateTime);
    };
  }, [track]);

  return (
    <PlayerContext.Provider
      value={{
        audioRef,
        seekBar,
        seekBg,
        track,
        playStatus,
        play,
        pause,
        previous,
        next,
        seekSong,
        time,
        songsData,
        albumsData,
        playWithId,
        volume,
        handleVolumeChange,
      }}
    >
      <audio ref={audioRef} src={track ? track.file : ""} preload="auto" />
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
