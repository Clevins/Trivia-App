import { ReactElement, useContext } from "react";
import { useActor } from "@xstate/react";
import { GlobalStateContext } from "@/triviaMachine";

import styles from "./Quiz.module.css";
import Question from "./Question/Question";
import Layout from "@/Components/Layout/Layout";
import { BackgroundColorType } from "@/Components/Layout/LayoutTypes";

function randomEnum<T>(anEnum: T): T[keyof T] {
  const enumValues = Object.keys(anEnum)
    .map((n) => Number.parseInt(n))
    .filter((n) => !Number.isNaN(n)) as unknown as T[keyof T][];
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  const randomEnumValue = enumValues[randomIndex];
  return randomEnumValue;
}

const shuffleArray = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

function Quiz(): ReactElement {
  window.scrollTo(0, 0);

  const globalServices = useContext(GlobalStateContext);
  const [state] = useActor(globalServices.triviaService);

  const { questions } = state.context;
  const numOfQuestions = questions.results.length;
  const { activeQuestionIndex } = state.context;
  const activeQuestion = questions.results[activeQuestionIndex];

  const { question, correct_answer, incorrect_answers } = activeQuestion;
  const allAnswers = shuffleArray([...[correct_answer], ...incorrect_answers]);

  const randomBackgroundColorType = randomEnum(BackgroundColorType);

  return (
    <Layout backgroundColorType={randomBackgroundColorType}>
      <h2 className={styles.quiz__title}>
        Question {activeQuestionIndex + 1}/{numOfQuestions}
      </h2>
      <div className={styles.quiz__container}>
        <Question
          question={question}
          correct_answer={correct_answer}
          incorrect_answers={incorrect_answers}
          allAnswers={allAnswers}
        />
      </div>
    </Layout>
  );
}

export default Quiz;
