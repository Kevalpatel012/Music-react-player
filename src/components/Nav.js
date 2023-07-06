// Import the React library
import React from "react";
// Import the FontAwesomeIcon component from the "@fortawesome/react-fontawesome" library
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Import the faMusic icon from the "@fortawesome/free-solid-svg-icons" library
import { faMusic } from "@fortawesome/free-solid-svg-icons";

// Nav component responsible for rendering the navigation bar
const Nav = ({ setLibraryStatus, libraryStatus }) => {
  // Function to handle the opening/closing of the library
  const openLibraryHandler = () => {
    setLibraryStatus(!libraryStatus);
  };

  // Render the Nav component
  return (
    <nav>
      {/* Render the title/logo */}
      <h1>Vibes</h1>
      {/* Render the library button */}
      <button
        className={libraryStatus ? "library-active" : ""}
        onClick={openLibraryHandler}
      >
        {/* Render the "Library" text and the music icon */}
        Library
        <FontAwesomeIcon icon={faMusic}></FontAwesomeIcon>
      </button>
    </nav>
  );
};

// Export the Nav component as the default export
export default Nav;
