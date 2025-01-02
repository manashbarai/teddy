import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Snowfall from "react-snowfall";
import musicFile from "./opening_doraemon.mp3"; // Replace with your music file path

function HappyNewYear() {
  const words = ["Happy", "New", "Year", "Jyoti"];

  const uniqueStyles = {
    Happy: { color: "purple", textShadow: "2px 2px 8px gold" },
    New: { color: "blue", textShadow: "2px 2px 8px silver" },
    Year: { color: "green", textShadow: "2px 2px 8px yellow" },
    Jyoti: { color: "red", textShadow: "2px 2px 8px pink", position: "relative" },
  };

  const audioRef = useRef(new Audio(musicFile));
  const [isPlaying, setIsPlaying] = useState(false);
  const [showHeart, setShowHeart] = useState(false);

  const handleDragStart = (word) => {
    if (word === "Jyoti" && !isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
      setShowHeart(true);

      // Reset when audio ends
      audioRef.current.onended = () => {
        setIsPlaying(false);
        setShowHeart(false);
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

      {/* Falling Hearts Across Website */}
      <div className="falling-hearts">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="heart"
            initial={{ y: -0, x: Math.random() * window.innerWidth }}
            animate={{ y: window.innerHeight }}
            transition={{ duration: Math.random() * 3 + 2, repeat: Infinity }}
            style={{
              position: "absolute",
              fontSize: Math.random() * 20 + 20,
              color: Math.random() > 0.5 ? "red" : "white",
            }}
          >
            ♥
          </motion.div>
        ))}
      </div>

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
            fontSize: "calc(5vw + 70px)", // Responsive font size
            fontFamily: "'Comic Sans MS', cursive",
            margin: "auto",
            position: "absolute",
            ...uniqueStyles[word],
          }}
          whileDrag={{ scale: 1.2 }}
          onDragStart={() => handleDragStart(word)}
          className="draggable-text"
        >
          {word}
          {/* "Love" Right-End Part for "Jyoti" */}
          {word === "Jyoti" && (
            <motion.div
              className="love-icon"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              style={{
                position: "absolute",
                bottom: "-20%",
                right: "-20%",
                color: "red",
                fontSize: "calc(4vw + 10px)",
              }}
            >
              ♥
            </motion.div>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}

export default HappyNewYear;
