import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { PieChart } from "react-minimal-pie-chart"; 
import Confetti from "react-confetti"; 

const API_URL = "/api"; 

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
 
  const [attemptedAnswers, setAttemptedAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timer, setTimer] = useState(45);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

 
  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        const data = response.data;
        if (data && data.questions && Array.isArray(data.questions)) {
          setQuestions(data.questions);
        } else {
          console.error("Invalid API response format");
          setError("Invalid data format from API");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch quiz data. Please try again later.");
        setLoading(false);
      });
  }, []);

 
  useEffect(() => {
    if (!loading && !error) {
      setTimer(45);
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            if (currentIndex + 1 === questions.length) {
              setShowConfirmation(true);
            } else {
              recordAnswerAndNext(null); 
            }
            return 45;
          }
          return prevTimer - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [loading, error, currentIndex]);


  const recordAnswerAndNext = (option) => {
    const isAttempted = option !== null;
    const isCorrect = isAttempted ? option.is_correct : false;
    
    setAttemptedAnswers((prev) => [...prev, { attempted: isAttempted, correct: isCorrect }]);
    let bonus = 0;
    let newScore = score;
    let newStreak = streak;
    if (isCorrect) {
      bonus = timer;
      newScore += 10 + bonus;
      newStreak += 1;

      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1500);
    } else {
      newStreak = 0;
    }
    setScore(newScore);
    setStreak(newStreak);
    setCurrentIndex((prevIndex) => prevIndex + 1);
    setSelectedOption(null);
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      recordAnswerAndNext(selectedOption);
    } else {
      setShowConfirmation(true);
    }
  };

 
  const confirmSubmission = () => {
    const isAttempted = selectedOption !== null;
    const isCorrect = isAttempted ? selectedOption.is_correct : false;
    let bonus = 0;
    let finalScore = score;
    let finalStreak = streak;
    if (isCorrect) {
      bonus = timer;
      finalScore += 10 + bonus;
      finalStreak += 1;
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1500);
    } else {
      finalStreak = 0;
    }
    
    const finalAttempt = { attempted: isAttempted, correct: isCorrect };
    const finalAttemptedAnswers = [...attemptedAnswers, finalAttempt];
    const attemptedCount = finalAttemptedAnswers.filter((a) => a.attempted).length;
    const correctCount = finalAttemptedAnswers.filter((a) => a.correct).length;
    const wrongCount = attemptedCount - correctCount;
    navigate("/results", {
      state: { score: finalScore, attemptedCount, correctCount, wrongCount, total: questions.length },
    });
  };

  
  const cancelSubmission = () => {
    setShowConfirmation(false);
  };

  const progressText = questions.length ? `${currentIndex + 1} / ${questions.length}` : "";

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-teal-300">
        <p className="text-teal-900 text-lg">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-teal-300">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  
  const finalAttempt = { attempted: selectedOption !== null, correct: selectedOption ? selectedOption.is_correct : false };
  const finalAttemptedAnswers = [...attemptedAnswers, finalAttempt];
  const attemptedCount = finalAttemptedAnswers.filter((a) => a.attempted).length;
  const notAttemptedCount = questions.length - attemptedCount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-teal-300 p-4 flex flex-col items-center relative">
    
      <AnimatePresence>{showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={200} />}</AnimatePresence>

      <div className="w-full max-w-xl flex justify-between items-center mb-4">
        <div className="text-teal-900 text-xl font-semibold">
          Time: <span className="text-orange-500">{timer}</span> sec
        </div>
        <div className="text-teal-900 text-xl font-semibold">{progressText}</div>
        <div className="text-teal-900 text-xl font-semibold">
          Streak: <span className="text-green-600">{streak}</span>
        </div>
      </div>


      <motion.div
        key={currentIndex}
        className="bg-white bg-opacity-90 rounded-xl shadow-2xl p-6 max-w-xl w-full border border-teal-500"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.6 }}
      >
   
        <div className="mb-4 border-b border-teal-500 pb-2">
          <motion.h2 className="text-xl font-semibold text-black">{currentQuestion?.description}</motion.h2>
        </div>
 
        <div className="flex flex-col gap-3">
          {currentQuestion?.options?.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedOption(option)}
              className={`w-full px-4 py-2 rounded-lg border border-teal-500 transition ${
                selectedOption?.id === option.id ? "bg-teal-800 text-white" : "bg-teal-500 text-white"
              } hover:bg-teal-600`}
            >
              {option.description}
            </motion.button>
          ))}
        </div>

        <div className="mt-6 text-right">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleNext}
            disabled={!selectedOption && timer > 0}
            className={`px-6 py-2 font-semibold rounded-full shadow-lg transition ${
              !selectedOption && timer > 0 ? "bg-gray-500 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-500"
            } text-white`}
          >
            {currentIndex + 1 === questions.length ? "Submit" : "Next"}
          </motion.button>
        </div>
      </motion.div>

    
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div className="bg-white rounded-xl p-6 max-w-md w-full text-center border border-teal-500"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold mb-4 text-teal-900">Confirm Submission</h3>
              <div className="mb-4">
                <PieChart
                  data={[
                    { title: "Attempted", value: attemptedCount, color: "#4caf50" },
                    { title: "Not Attempted", value: notAttemptedCount, color: "#f44336" },
                  ]}
                  style={{ height: "200px" }}
                />
                <p className="mt-2 text-teal-900">
                  Attempted: {attemptedCount} / {questions.length}
                </p>
              </div>
              <div className="flex justify-around">
                <button onClick={confirmSubmission} className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-500 transition">
                  Confirm
                </button>
                <button onClick={cancelSubmission} className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-500 transition">
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Quiz;
