import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Quiz from './components/Quiz';
import HappyNewYear from './components/HappyNewYear';
import './App.css';

function App() {
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleQuizComplete = () => {
    setQuizCompleted(true);
  };

  return (
    <div className="App">
      <HappyNewYear />
     
    </div>
  );
}

export default App;