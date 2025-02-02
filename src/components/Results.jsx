import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, attemptedCount, correctCount, wrongCount, total } = location.state || {
    score: 0,
    attemptedCount: 0,
    correctCount: 0,
    wrongCount: 0,
    total: 0,
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-300 to-blue-200 p-4">
      <motion.div
        className="bg-white bg-opacity-90 rounded-xl shadow-2xl p-8 text-center max-w-md border border-teal-500"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold text-teal-800 mb-4">Quiz Completed!</h1>
        <p className="text-2xl text-teal-900 mb-2">Your Total Score: {score}</p>
        <p className="text-lg text-teal-900 mb-1">Attempted: {attemptedCount} / {total}</p>
        <p className="text-lg text-teal-900 mb-1">Correct: {correctCount}</p>
        <p className="text-lg text-teal-900 mb-4">Wrong: {wrongCount}</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-full shadow-lg hover:bg-purple-500 transition"
        >
          Try Again
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Results;
