import React, { useState } from "react"; // Importing necessary dependencies from React
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Importing the FontAwesomeIcon component from the react-fontawesome library
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
  faVolumeDown,
} from "@fortawesome/free-solid-svg-icons"; // Importing necessary font awesome icons

import { playAudio } from "../util"; // Importing the playAudio utility function

const Player = ({ // Declaring the Player component and destructuring the props
  isPlaying,
  setIsPlaying,
  audioRef,
  songInfo,
  setSongInfo,
  currentSong,
  songs,
  setCurrentSong,
  setSongs,
}) => {
  const [activeVolume, setActiveVolume] = useState(false); // Declaring a state variable for the volume control

  const activeLibraryHandler = (nextPrev) => { // Function to handle the active state of the library song
    const newSongs = songs.map((song) => {
      if (song.id === nextPrev.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });

    setSongs(newSongs);
  };

  const trackAnim = { // Object representing the animation style for the track slider
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  function getTime(time) { // Function to convert time in seconds to a formatted string
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  }

  const dragHandler = (e) => { // Event handler for dragging the track slider
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const playSongHandler = () => { // Event handler for play/pause button
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const skipTrackHandler = async (direction) => { // Event handler for skipping to the next or previous track
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);

    if (direction === "skip-forward") {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === "skip-back") {
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);
        activeLibraryHandler(songs[songs.length - 1]);
        playAudio(isPlaying, audioRef);
        return;
      }
      await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
    }
    if (isPlaying) audioRef.current.play();
  };

  const changeVolume = (e) => { // Event handler for changing the volume
    let value = e.target.value;
    audioRef.current.volume = value;
    setSongInfo({ ...songInfo, volume: value });
  };

  return (
    <div className="player"> {/* Main container for the player component */}
      <div className="time-control"> {/* Container for the time control section */}
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
          }}
          className="track" // Track container
        >
          <input
            value={songInfo.currentTime}
            type="range" // Slider input for track progress
            max={songInfo.duration || 0} // max duration is the duration of the song
            min={0} // min for song is always 0
            onChange={dragHandler} // Event handler for dragging the slider
          />
          <div style={trackAnim} className="animate-track"></div> {/* Animated track progress indicator */}
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p> {/* Displaying the duration of the song */}
      </div>
      <div className="play-control"> {/*Container for the play control section*/}
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-back")}
          className="skip-back" // Skip back button
          size="2x"
          icon={faAngleLeft} // Icon for skip back
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play" // Play/pause button
          size="2x"
          icon={isPlaying ? faPause : faPlay} // Icon changes based on the playing state
        />
        <FontAwesomeIcon
          className="skip-forward" // Skip forward button
          size="2x"
          icon={faAngleRight} // Icon for skip forward
          onClick={() => skipTrackHandler("skip-forward")}
        />
        <FontAwesomeIcon
          onClick={() => setActiveVolume(!activeVolume)}
          icon={faVolumeDown} // Volume button
        />
        {activeVolume && (
          <input
            onChange={changeVolume}
            value={songInfo.volume}
            max="1"
            min="0"
            step="0.01"
            type="range" // Slider input for volume control
          />
        )}
      </div>
    </div>
  );
};

export default Player;
