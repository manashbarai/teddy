import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Snowfall from "react-snowfall";
import musicFile from "./opening_doraemon.mp3"; // Replace with your music file path

function HappyNewYear() {
  const words = ["Happy", "New", "Year", "Oliur_Saheen"];

  const uniqueStyles = {
    Happy: { color: "red", textShadow: "2px 2px 8px gold" },
    New: { color: "blue", textShadow: "2px 2px 8px silver" },
    Year: { color: "green", textShadow: "2px 2px 8px yellow" },
    Oliur_Saheen: { color: "purple", textShadow: "2px 2px 8px pink" },
  };

  const balloonEffect = {
    animate: {
      scale: [1, 1.2, 1],
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "mirror",
    },
  };

  const audioRef = useRef(new Audio(musicFile));
  const [isPlaying, setIsPlaying] = useState(false);

  const handleDragStart = (word) => {
    if (word === "Oliur_Saheen" && !isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);

      // Listen for when the audio ends and reset the state
      audioRef.current.onended = () => {
        setIsPlaying(false);
      };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="happy-new-year-container"
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        backgroundColor: "#001F3F",
        overflow: "hidden",
      }}
    >
      {/* Snowfall Effect */}
      <Snowfall color="white" snowflakeCount={100} />

      {/* "Happy New Year" */}
      {words.map((word) => (
        <motion.div
          key={word}
          drag
          dragConstraints={{
            left: -window.innerWidth * 0.45,
            right: window.innerWidth * 0.45,
            top: -window.innerHeight * 0.4,
            bottom: window.innerHeight * 0.4,
          }}
          style={{
            fontSize: "100px",
            fontFamily: "'Comic Sans MS', cursive",
            margin: "auto",
            position: "absolute",
            ...uniqueStyles[word],
          }}
          whileDrag={{ scale: 1.2 }}
          {...balloonEffect}
          onDragStart={() => handleDragStart(word)}
          className="draggable-text"
        >
          {word}
        </motion.div>
      ))}
    </motion.div>
  );
}

export default HappyNewYear;
