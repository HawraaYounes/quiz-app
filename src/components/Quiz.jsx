import { useState } from "react";
import QUESTIONS from "../questions.js";

const Quiz = () => {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestion = userAnswers.length;
 
  function handleAnswerClick(answer) {
    setUserAnswers((prevAnswers) => {
      return [...prevAnswers, answer];
    });
  }
  return (
    <div id="quiz">
      <div id="question">
        <h2>{QUESTIONS[activeQuestion].text}</h2>
        <ul id="answers">
          {QUESTIONS[activeQuestion].answers.map((answer) => (
            <li key={answer} className="answer">
              <button
                onClick={() => {
                  handleAnswerClick(answer);
                }}
              >
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Quiz;
