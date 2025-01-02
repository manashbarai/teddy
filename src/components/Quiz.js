import React, { useState } from 'react';
import { motion } from 'framer-motion';

const quizQuestions = [
  {
    question: "What year are we celebrating?",
    options: ["2024", "2025", "2026"],
    correctAnswer: "2025"
  },
  {
    question: "What is the first month of the year?",
    options: ["February", "January", "March"],
    correctAnswer: "January"
  },
  // Add more questions
];

function Quiz({ onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerSelect = (answer) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestion] = answer;
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      checkAnswers();
    }
  };

  const checkAnswers = () => {
    const allCorrect = selectedAnswers.every((answer, index) => 
      answer === quizQuestions[index].correctAnswer
    );

    setShowResult(true);
    if (allCorrect) {
      onComplete();
    }
  };

  const currentQuizQuestion = quizQuestions[currentQuestion];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="quiz-container"
    >
      <h2>{currentQuizQuestion.question}</h2>
      <div className="options-container">
        {currentQuizQuestion.options.map((option) => (
          <motion.button
            key={option}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleAnswerSelect(option)}
            className={`option-button ${
              selectedAnswers[currentQuestion] === option ? 'selected' : ''
            }`}
          >
            {option}
          </motion.button>
        ))}
      </div>
      <button onClick={handleNextQuestion}>
        {currentQuestion === quizQuestions.length - 1 ? 'Submit' : 'Next'}
      </button>
      {showResult && (
        <div className="result">
          {selectedAnswers.every((answer, index) => 
            answer === quizQuestions[index].correctAnswer
          ) 
            ? "Congratulations! All answers are correct!" 
            : "Some answers are incorrect. Try again!"}
        </div>
      )}
    </motion.div>
  );
}

export default Quiz;