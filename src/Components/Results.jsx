import React from "react";
import { useLocation } from "react-router-dom";

const Results = () => {
  const location = useLocation();
  const { score, total } = location.state;

  return (
    <div>
      <h1>Quiz Results</h1>
      <p>Your Score: {score} / {total}</p>
    </div>
  );
};

export default Results;