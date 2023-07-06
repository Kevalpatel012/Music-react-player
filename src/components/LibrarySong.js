// Import the React library
import React from "react";
// Import the playAudio function from the "../util" file
import { playAudio } from "../util";

// LibrarySong component responsible for rendering an individual song in the library
const LibrarySong = ({
  name,
  artist,
  cover,
  id,
  setCurrentSong,
  songs,
  audioRef,
  isPlaying,
  setSongs,
  active,
}) => {
  // Function to handle the selection of a song
  const songSelectHandler = () => {
    // Filter the songs array to find the selected song based on its id
    const selectedSong = songs.filter((state) => state.id === id);
    // Set the selected song as the current song
    setCurrentSong({ ...selectedSong[0] });

    // Set the active state of the songs in the library
    const newSongs = songs.map((song) => {
      if (song.id === id) {
        // Set the active state to true for the selected song
        return {
          ...song,
          active: true,
        };
      } else {
        // Set the active state to false for other songs
        return {
          ...song,
          active: false,
        };
      }
    });
    // Update the songs state with the new active states
    setSongs(newSongs);

    // Play or pause the audio based on the isPlaying state
    playAudio(isPlaying, audioRef);
  };

  // Render the LibrarySong component
  return (
    <div
      onClick={songSelectHandler}
      className={`library-song ${active ? "selected" : ""}`}
    >
      {/* Render the song cover image */}
      <img src={cover} alt="" />
      <div className="song-description">
        {/* Render the song name */}
        <h3>{name}</h3>
        {/* Render the artist name */}
        <h4>{artist}</h4>
      </div>
    </div>
  );
};

// Export the LibrarySong component as the default export
export default LibrarySong;
