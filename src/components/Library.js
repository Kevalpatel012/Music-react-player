// Import the React library
import React from "react";

// Import the LibrarySong component from the specified file path
import LibrarySong from "./LibrarySong";

// Library component responsible for displaying the library of songs
const Library = ({
  songs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
  libraryStatus,
}) => {
  // Render the library component
  return (
    <div className={`library ${libraryStatus ? "active-library" : " "}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {/* Map over the songs array and render a LibrarySong component for each song */}
        {songs.map((song) => (
          <LibrarySong
            songs={songs}
            cover={song.cover}
            name={song.name}
            artist={song.artist}
            active={song.active}
            key={song.id}
            id={song.id}
            setCurrentSong={setCurrentSong}
            audioRef={audioRef}
            isPlaying={isPlaying}
            setSongs={setSongs}
          />
        ))}
      </div>
    </div>
  );
};

// Export the Library component as the default export
export default Library;
