import { useState } from "react";
import QUESTIONS from "../questions.js";
import quizFinish from "../assets/quiz-complete.png";

const Quiz = () => {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestion = userAnswers.length;
  const isQuizCompleted = QUESTIONS.length === userAnswers.length;

  function handleAnswerClick(answer) {
    setUserAnswers((prevAnswers) => {
      return [...prevAnswers, answer];
    });
  }
  if (isQuizCompleted) {
    return (
      <div id="summary">
        <h2>Quiz Completed!</h2>
        <img src={quizFinish} />
      </div>
    );
  }
  
  const suffledAnswers = [...QUESTIONS[activeQuestion].answers];
  suffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="question">
        <h2>{QUESTIONS[activeQuestion].text}</h2>
        <ul id="answers">
          {suffledAnswers.map((answer) => (
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
