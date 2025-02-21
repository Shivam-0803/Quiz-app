import React from "react";
import { Link } from "react-router-dom";
import './App.css'

function App() {
  return (
    <div className="App">
      <h1>Welcome to the Quiz Platform</h1>
      <Link to="/quiz">
        <button>Start Quiz</button>
      </Link>
    </div>
  );
}

export default App;