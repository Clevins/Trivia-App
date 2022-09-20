import { ReactElement, useContext } from "react";
import { useActor } from "@xstate/react";
import { GlobalStateContext } from "@/State/triviaMachine";
import Button from "@/Components/Button/Button";
import Layout from "@/Components/Layout/Layout";
import { BackgroundColorType } from "@/Components/Layout/LayoutTypes";
import {
  BtnBackgroundType,
  BtnLabelColors,
  BtnSizeType,
} from "@/Components/Button/ButtonTypes";
import styles from "./EndQuiz.module.css";

function EndQuiz(): ReactElement {
  const globalServices = useContext(GlobalStateContext);
  const [state] = useActor(globalServices.triviaService);
  const { send } = globalServices.triviaService;

  const { correctAnswersCount, questions } = state.context;

  const handleClick = () => {
    send("SELECT");
  };

  return (
    <Layout backgroundColorType={BackgroundColorType.SOFT_PURPLE}>
      <h2 className={styles.endQuiz__title}>Congratulations On Finishing</h2>
      <p className={styles.endQuiz__score}>
        You Got {correctAnswersCount}/{questions.results.length} Correct. Well
        Done!!!
      </p>
      <div className={styles.endQuiz__container}>
        <Button
          btnSizeType={BtnSizeType.MEDIUM}
          btnBackgroundType={BtnBackgroundType.WHITE}
          labelColorType={BtnLabelColors.SOFT_PURPLE}
          key='endQuizBtn'
          label='Start Again'
          value=''
          handleClick={() => handleClick()}
        />
      </div>
    </Layout>
  );
}

export default EndQuiz;
