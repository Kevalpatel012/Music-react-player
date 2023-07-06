import React, { useState, useRef } from "react"; // Importing necessary dependencies from React
import "./styles/app.scss"; // Importing styles from the "app.scss" file
// Importing Components
import Player from "./components/Player"; // Importing the Player component
import Song from "./components/Song"; // Importing the Song component
import Library from "./components/Library"; // Importing the Library component
import Nav from "./components/Nav"; // Importing the Nav component
// Importing data
import chillhop from "./data"; // Importing the chillhop data
// Importing utility function
import { playAudio } from "./util"; // Importing the playAudio utility function

function App() {
  const audioRef = useRef(null); // Creating a reference to the audio element using useRef hook

  const [songs, setSongs] = useState(chillhop()); // Initializing state for songs and setSongs using useState hook, with initial value from the chillhop data
  const [currentSong, setCurrentSong] = useState(songs[0]); // Initializing state for currentSong and setCurrentSong, with initial value as the first song in the songs array
  const [isPlaying, setIsPlaying] = useState(false); // Initializing state for isPlaying and setIsPlaying, with initial value as false
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
    volume: 0,
  }); // Initializing state for songInfo and setSongInfo, with initial value containing various song information

  const [libraryStatus, setLibraryStatus] = useState(false); // Initializing state for libraryStatus and setLibraryStatus, with initial value as false

  const timeUpdateHandler = (e) => {
    // Event handler for updating the song time information
    const current = e.target.currentTime; // Current time of the song
    const duration = e.target.duration; // Total duration of the song

    const roundedCurrent = Math.round(current); // Rounded current time
    const roundedDuration = Math.round(duration); // Rounded duration

    const percentage = Math.round((roundedCurrent / roundedDuration) * 100); // Percentage of the song progress

    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration: duration,
      animationPercentage: percentage,
      volume: e.target.volume,
    }); // Updating the songInfo state with the updated song time information
  };

  const songEndHandler = async () => {
    // Event handler for when the song ends
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id); // Finding the index of the current song in the songs array

    await setCurrentSong(songs[(currentIndex + 1) % songs.length]); // Setting the next song as the current song, and if it reaches the end, looping back to the first song

    playAudio(isPlaying, audioRef); // Playing the audio if the player was previously playing
    return;
  };

  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}> {/* Conditionally adding a class to the App container based on the libraryStatus */}
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} /> {/* Rendering the Nav component and passing props */}
      <Song isPlaying={isPlaying} currentSong={currentSong} /> {/* Rendering the Song component and passing props */}
      <Player
        audioRef={audioRef}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        isPlaying={isPlaying}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        songs={songs}
        setSongs={setSongs}
        setCurrentSong={setCurrentSong}
      /> {/* Rendering the Player component and passing props */}

      <Library
        songs={songs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
      /> {/* Rendering the Library component and passing props */}

      <audio
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
      ></audio> {/* Rendering the audio element and setting event listeners for time updates and song ending */}
    </div>
  );
}

export default App; // Exporting the App component as the default export
