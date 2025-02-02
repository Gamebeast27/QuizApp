// // import { useState } from 'react'
// // import reactLogo from './assets/react.svg'
// // import viteLogo from '/vite.svg'
// // import './App.css'

// // function App() {
// //   const [count, setCount] = useState(0)

// //   return (
// //     <>
// //       <div>
// //         <a href="https://vite.dev" target="_blank">
// //           <img src={viteLogo} className="logo" alt="Vite logo" />
// //         </a>
// //         <a href="https://react.dev" target="_blank">
// //           <img src={reactLogo} className="logo react" alt="React logo" />
// //         </a>
// //       </div>
// //       <h1>Vite + React</h1>
// //       <div className="card">
// //         <button onClick={() => setCount((count) => count + 1)}>
// //           count is {count}
// //         </button>
// //         <p>
// //           Edit <code>src/App.jsx</code> and save to test HMR
// //         </p>
// //       </div>
// //       <p className="read-the-docs">
// //         Click on the Vite and React logos to learn more
// //       </p>
// //     </>
// //   )
// // }

// // export default App

// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Welcome from "./components/Welcome";
// import Quiz from "./components/Quiz";
// import Results from "./components/Results";
// import "./styles/global.css";
// import "./styles/animations.css";

// // const API_URL = "https://api.jsonserve.com/Uw5CrX";

// // const Welcome = () => {
// //   const navigate = useNavigate();
// //   return (
// //     <div className="flex flex-col items-center justify-center h-screen bg-blue-600">
// //       <motion.h1 className="text-white text-4xl mb-6" animate={{ scale: 1.2 }}>Welcome to the Quiz!</motion.h1>
// //       <button
// //         onClick={() => navigate("/quiz")}
// //         className="bg-white text-blue-600 px-6 py-3 rounded-xl shadow-lg hover:bg-gray-200 transition"
// //       >
// //         Start Quiz
// //       </button>
// //     </div>
// //   );
// // };

// // const Quiz = () => {
// //   const [questions, setQuestions] = useState([]);
// //   const [currentIndex, setCurrentIndex] = useState(0);
// //   const [score, setScore] = useState(0);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     axios.get(API_URL)
// //       .then(response => {
// //         setQuestions(response.data);
// //         setLoading(false);
// //       })
// //       .catch(error => {
// //         console.error(error);
// //         setError("Failed to fetch quiz data. Please try again later.");
// //         setLoading(false);
// //       });
// //   }, []);

// //   const handleAnswer = (isCorrect) => {
// //     if (isCorrect) setScore(score + 10);
// //     if (currentIndex + 1 < questions.length) {
// //       setCurrentIndex(currentIndex + 1);
// //     } else {
// //       navigate("/results", { state: { score } });
// //     }
// //   };

// //   if (loading) return <div className="text-center mt-20 text-white">Loading...</div>;
// //   if (error) return <div className="text-center mt-20 text-red-500">{error}</div>;

// //   return (
// //     <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white">
// //       <motion.h2 className="text-2xl mb-4" animate={{ opacity: 1 }}>{questions[currentIndex].question}</motion.h2>
// //       <div className="grid grid-cols-2 gap-4">
// //         {questions[currentIndex].options.map((option, index) => (
// //           <button
// //             key={index}
// //             className="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-400"
// //             onClick={() => handleAnswer(option.isCorrect)}
// //           >
// //             {option.text}
// //           </button>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // const Results = ({ location }) => {
// //   const score = location.state?.score || 0;
// //   return (
// //     <div className="flex flex-col items-center justify-center h-screen bg-green-600 text-white">
// //       <h1 className="text-4xl">Quiz Completed!</h1>
// //       <p className="text-xl mt-4">Total Score: {score}</p>
// //       <button
// //         onClick={() => window.location.reload()}
// //         className="mt-6 bg-white text-green-600 px-6 py-3 rounded-lg shadow-lg hover:bg-gray-200"
// //       >
// //         Restart Quiz
// //       </button>
// //     </div>
// //   );
// // };

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Welcome />} />
//         <Route path="/quiz" element={<Quiz />} />
//         <Route path="/results" element={<Results />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome";
import Instructions from "./components/Intructions";
import Quiz from "./components/Quiz";
import Results from "./components/Results";
import "./styles/global.css";
import "./styles/animations.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/instructions" element={<Instructions />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
};

export default App;
