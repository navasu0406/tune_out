import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { assets } from "../assets/assets";

const Player = () => {
  const {
    track,
    playStatus,
    play,
    pause,
    previous,
    next,
    seekBar,
    seekBg,
    seekSong,
    time,
    volume,
    handleVolumeChange,
  } = useContext(PlayerContext);

  if (!track) return <div className="text-white p-2">No song is playing</div>;

  const formatTime = (min, sec) =>
    `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;

  const playIcon = assets.play_icon;
  const pauseIcon = assets.pause_icon;
  const volumeIcon = assets.volume_icon; // Fixed icon

  return (
    <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
      {/* Track Info */}
      <div className="flex items-center gap-4">
        <img
          className="w-12 h-12 object-cover rounded"
          src={track.image || assets.default_song}
          alt="Cover"
        />
        <div>
          <p className="font-semibold">{track.name}</p>
          <p className="text-sm opacity-70">{track.desc}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-2 mx-4">
        <div className="flex gap-5 items-center">
          <button onClick={previous}>
            <img src={assets.prev_icon} className="w-5" alt="Previous" />
          </button>

          <button onClick={playStatus ? pause : play}>
            <img src={playStatus ? pauseIcon : playIcon} className="w-6" alt="Play/Pause" />
          </button>

          <button onClick={next}>
            <img src={assets.next_icon} className="w-5" alt="Next" />
          </button>
        </div>

        {/* Seek Bar */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs">{formatTime(time.currentTime.minute, time.currentTime.second)}</span>
          
          {/* Fixed-width seek bar */}
          <div
            ref={seekBg}
            onClick={seekSong}
            className="w-60 h-1 bg-gray-600 rounded cursor-pointer relative"
          >
            <div ref={seekBar} className="h-1 bg-green-600 rounded absolute top-0 left-0 w-0"></div>
          </div>
          
          <span className="text-xs">{formatTime(time.totalTime.minute, time.totalTime.second)}</span>
        </div>
      </div>

      {/* Volume */}
      <div className="flex items-center gap-2">
        <img src={volumeIcon} alt="Volume" className="w-5" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-20"
        />
      </div>
    </div>
  );
};

export default Player;
