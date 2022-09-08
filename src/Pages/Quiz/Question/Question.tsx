import { ReactElement, useContext, useState } from "react";
import ReactMarkdown from "react-markdown";
import { GlobalStateContext } from "@/triviaMachine";

import Answer from "../Answer/Answer";
import styles from "./Question.module.css";
import { QuestionProp } from "./QuestionTypes";

function Question({
  question,
  correct_answer,
  allAnswers,
}: QuestionProp): ReactElement {
  const [hasSelectedAnswer, setHasSelectedAnswer] = useState(false);

  const globalServices = useContext(GlobalStateContext);
  const { send } = globalServices.triviaService;

  const sendSelectEvent = (value: string) => {
    if (value === correct_answer) {
      send("SELECT", { correct: true });
      return;
    }
    send("SELECT", { correct: false });
  };

  const handleClick = (value: string) => {
    setHasSelectedAnswer(true);
    setTimeout(() => {
      setHasSelectedAnswer(false);
      sendSelectEvent(value);
    }, 2000);
  };

  const answers = allAnswers.map((answer: string, index: number) => {
    return (
      <Answer
        key={answer + index}
        label={answer}
        value={answer}
        hasSelectedAnswer={hasSelectedAnswer}
        correctAnswer={correct_answer}
        handleClick={handleClick}
      />
    );
  });

  return (
    <div>
      <div className={styles.question__title}>
        <ReactMarkdown>{question}</ReactMarkdown>
      </div>
      <div className={styles.answers__container}>{answers}</div>
    </div>
  );
}

export default Question;
