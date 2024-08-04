import { useState, useCallback, useRef } from "react";
import QUESTIONS from "../questions.js";
import quizFinish from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";

const Quiz = () => {
  const shuffledAnswers = useRef();
  const [userAnswers, setUserAnswers] = useState([]);
  const [answerState, setAnswerState] = useState("");
  const activeQuestion =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;
  const isQuizCompleted = QUESTIONS.length === userAnswers.length;

  const handleAnswerClick = useCallback(function handleAnswerClick(answer) {
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
  }, [activeQuestion]);

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

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...QUESTIONS[activeQuestion].answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          timeout={10000}
          onTimeout={handleSkipAnswer}
          key={activeQuestion}
        />
        <h2>{QUESTIONS[activeQuestion].text}</h2>
        <ul id="answers">
          {shuffledAnswers.current.map((answer) => {
            let cssClass = "";
            const isSelected = userAnswers[userAnswers.length - 1] === answer;
            if (answerState === "answered" && isSelected) {
            
              cssClass = "selected";
            }
            if (
              (answerState === "correct" || answerState === "wrong") &&
              isSelected
            ) {
              cssClass = answerState;
            }

            return (
              <li key={answer} className="answer">
                <button
                  onClick={() => {
                    handleAnswerClick(answer);
                  }}
                  className={cssClass}
                >
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Quiz;
