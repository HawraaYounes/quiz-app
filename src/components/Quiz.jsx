import { useState, useCallback, useRef } from "react";
import QUESTIONS from "../questions.js";
import quizFinish from "../assets/quiz-complete.png";
import Question from "./Question.jsx";

const Quiz = () => {
  const [userAnswers, setUserAnswers] = useState([]);
  const [answerState, setAnswerState] = useState("");
  const activeQuestion =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;
  const isQuizCompleted = QUESTIONS.length === userAnswers.length;

  const handleAnswerClick = useCallback(
    function handleAnswerClick(answer) {
      setAnswerState("answered");
      setUserAnswers((prevAnswers) => {
        return [...prevAnswers, answer];
      });

      setTimeout(() => {
        if (answer === QUESTIONS[activeQuestion].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }
        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestion]
  );

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
        questionText={QUESTIONS[activeQuestion].text}
        answers={QUESTIONS[activeQuestion].answers}
        onSelectAnswer={handleAnswerClick}
        answerState={answerState}
        selectedAnswer={userAnswers[userAnswers.length - 1]}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
};

export default Quiz;
