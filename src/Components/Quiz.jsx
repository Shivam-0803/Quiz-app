import React, { useState, useEffect } from "react";
import { quizData } from "../data";
import { saveAttempt, getAttempts } from "../utils/Db";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizFinished, setQuizFinished] = useState(false);
  const [attempts, setAttempts] = useState([]); // Track attempt history
  const [feedback, setFeedback] = useState(""); // Instant feedback
  const [selectedOption, setSelectedOption] = useState(null); // Track selected option

  // Load attempts from IndexedDB on component mount
  useEffect(() => {
    const loadAttempts = async () => {
      const savedAttempts = await getAttempts();
      setAttempts(savedAttempts);
    };
    loadAttempts();
  }, []);

  // Timer logic
  useEffect(() => {
    if (timeLeft > 0 && !quizFinished) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleSubmit();
    }
  }, [timeLeft, quizFinished]);

  // Handle user's answer selection
  const handleAnswer = (answer) => {
    const question = quizData[currentQuestion];
    const isCorrect = answer === question.answer;

    // Provide instant feedback
    setFeedback(isCorrect ? "Correct! 🎉" : "Incorrect! ❌");

    // Save the user's answer
    setUserAnswers({ ...userAnswers, [currentQuestion]: answer });

    // Highlight the selected option
    setSelectedOption(answer);

    // Save the attempt to IndexedDB
    const attempt = {
      questionId: currentQuestion,
      question: question.question,
      userAnswer: answer,
      correctAnswer: question.answer,
      isCorrect,
      timestamp: new Date().toLocaleString(),
    };
    saveAttempt(attempt);

    // Move to the next question after 1 second
    setTimeout(() => {
      if (currentQuestion < quizData.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setTimeLeft(30);
        setSelectedOption(null); // Reset selected option
      } else {
        handleSubmit();
      }
    }, 1000); // Delay for 1 second to show feedback
  };

  // Submit the quiz
  const handleSubmit = async () => {
    let newScore = 0;
    quizData.forEach((question, index) => {
      if (userAnswers[index] === question.answer) {
        newScore += 1;
      }
    });

    // Save the final attempt to IndexedDB
    const attempt = {
      questionId: "final",
      question: "Quiz Completed",
      userAnswer: "N/A",
      correctAnswer: "N/A",
      isCorrect: true,
      timestamp: new Date().toLocaleString(),
    };
    await saveAttempt(attempt);

    // Update the attempts state
    setAttempts([...attempts, attempt]);

    // Reset quiz state
    setScore(newScore);
    setQuizFinished(true);
    setCurrentQuestion(0);
    setUserAnswers({});
    setTimeLeft(30);
  };

  // Restart the quiz
  const handleRestart = () => {
    setQuizFinished(false); // Reset quiz finished state
    setScore(0); // Reset score
    setCurrentQuestion(0); // Start from the first question
    setUserAnswers({}); // Clear all user answers
    setTimeLeft(30); // Reset timer
    setSelectedOption(null); // Reset selected option
    setFeedback(""); // Clear feedback
  };

  // Get the correct answer for the current question
  const getCorrectAnswer = () => {
    return quizData[currentQuestion].answer;
  };

  return (
    <div className="quiz-container">
      <h1>Interactive Quiz Platform</h1>
      {!quizFinished ? (
        <>
          <div id="timer">Time Left: {timeLeft} seconds</div>
          <div className="question">
            <h3>{quizData[currentQuestion].question}</h3>
            {quizData[currentQuestion].type === "multiple-choice" ? (
              quizData[currentQuestion].options.map((option, i) => (
                <button
                  key={i}
                  className={`option-button ${
                    selectedOption === option
                      ? option === getCorrectAnswer()
                        ? "correct"
                        : "incorrect"
                      : ""
                  }`}
                  onClick={() => handleAnswer(option)}
                  disabled={selectedOption !== null} // Disable buttons after selection
                >
                  {option}
                </button>
              ))
            ) : (
              <input
                type="number"
                onChange={(e) => handleAnswer(parseInt(e.target.value))}
              />
            )}
          </div>
          <div className="feedback">{feedback}</div>
          <button onClick={handleSubmit}>Submit Quiz</button>
        </>
      ) : (
        <div className="results">
          <h2>Quiz Finished!</h2>
          <p>Your Score: {score} / {quizData.length}</p>
          <button onClick={handleRestart}>Restart Quiz</button>
        </div>
      )}

      {/* Brief Attempt History */}
      <div className="attempt-history">
        <h3>Attempt History</h3>
        {attempts.slice(-3).map((attempt, index) => ( // Show only the last 3 attempts
          <div key={index} className="attempt">
            <p>
              Attempt {attempts.length - index}: {attempt.question} -{" "}
              {attempt.isCorrect ? "Correct" : "Incorrect"} (
              {attempt.timestamp})
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quiz;