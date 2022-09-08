import { ReactElement, useContext } from "react";
import { useActor } from "@xstate/react";
import { QuestionsOption, GlobalStateContext } from "@/triviaMachine";

import Layout from "@/Components/Layout/Layout";
import { BackgroundColorType } from "@/Components/Layout/LayoutTypes";
import Button from "@/Components/Button/Button";
import { BtnLabelColors, BtnSizeType } from "@/Components/Button/ButtonTypes";

import styles from "./SelectQuestionAmount.module.css";

function SelectQuestionAmount(): ReactElement {
  window.scrollTo(0, 0);

  const globalServices = useContext(GlobalStateContext);
  const [state] = useActor(globalServices.triviaService);
  const { send } = globalServices.triviaService;

  const { questionAmountOptions } = state.context;

  const handleClick = (value: number) => {
    send("SELECT", { value });
  };

  return (
    <Layout backgroundColorType={BackgroundColorType.BLUE}>
      <h2 className={styles.questionAmount__title}>
        Choose Number of Questions
      </h2>
      <div className={styles.questionAmount__container}>
        {questionAmountOptions.map((option: QuestionsOption, index) => {
          return (
            <Button
              key={index}
              label={option.label}
              labelColorType={BtnLabelColors.BLUE}
              btnSizeType={BtnSizeType.SMALL}
              value={option.value}
              handleClick={handleClick}
            />
          );
        })}
      </div>
    </Layout>
  );
}

export default SelectQuestionAmount;
