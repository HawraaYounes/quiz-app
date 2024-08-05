import { useState, useCallback, useRef } from "react";
import QUESTIONS from "../questions.js";
import quizFinish from "../assets/quiz-complete.png";
import Question from "./Question.jsx";

const Quiz = () => {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestion = userAnswers.length;
  const isQuizCompleted = QUESTIONS.length === userAnswers.length;

  const handleAnswerClick = useCallback(function handleAnswerClick(answer) {
    setUserAnswers((prevAnswers) => {
      return [...prevAnswers, answer];
    });
  }, []);

  const handleSkipAnswer = useCallback(() => {
    handleAnswerClick(null);
  }, [handleAnswerClick]);

  if (isQuizCompleted) {
    return (
      <div id="summary">
        <h2>Quiz Completed!</h2>
        <img src={quizFinish} />
      </div>
    );
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestion}
        index={activeQuestion}
        onSelectAnswer={handleAnswerClick}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
};

export default Quiz;
