import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Instructions = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 to-teal-300 p-4">
      <motion.div
        className="bg-white bg-opacity-80 rounded-xl shadow-2xl p-8 max-w-2xl text-teal-900 border border-teal-400"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold mb-4 text-center">Instructions</h2>
        <ul className="list-disc list-inside mb-6 text-lg">
          <li>Read each question carefully.</li>
          <li>Select the correct answer from the options provided.</li>
          <li>After choosing an option, click the "Next" button to proceed.</li>
          <li>On the final question, click the "Submit" button to finish the quiz.</li>
          <li>A timer of 45 seconds is provided for each question.</li>
          <li>Your score will be calculated based on correct answers and the time taken for answering.</li>
        </ul>
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/quiz")}
            className="px-8 py-3 bg-teal-700 text-white font-semibold rounded-full shadow-lg hover:bg-teal-600 transition"
          >
            Start Quiz
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Instructions;
