import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-300 to-blue-300">
      <motion.div
        className="text-center p-6 bg-white bg-opacity-70 rounded-xl shadow-lg backdrop-blur-sm"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-bold text-teal-800 mb-4 drop-shadow-md">
          Welcome to the Quiz!
        </h1>
        <p className="text-lg text-teal-700 mb-8">
          Test your knowledge with a fun, interactive quiz.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/instructions")}
          className="px-8 py-3 bg-teal-700 text-white font-semibold rounded-full shadow-lg hover:bg-teal-600 transition"
        >
          Continue
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Welcome;
