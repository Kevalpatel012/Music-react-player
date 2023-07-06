import React from "react"; // Importing necessary dependencies from React

const Song = ({ currentSong, isPlaying }) => {
  return (
    <div className="song-container"> {/* Container for the song information */}
      <img
        className={isPlaying ? "rotateSong" : ""} // Conditionally applying a class to rotate the image if the song is playing
        src={currentSong.cover} // Image source for the song cover
        alt="" // Alternative text for the image
      />
      <h2>{currentSong.name}</h2> {/* Displaying the name of the current song */}
      <h3>{currentSong.artist}</h3> {/* Displaying the artist of the current song */}
    </div>
  );
};

export default Song; // Exporting the Song component as the default export
