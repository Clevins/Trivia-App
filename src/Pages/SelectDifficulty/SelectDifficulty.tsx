import { ReactElement, useContext } from "react";
import { useActor } from "@xstate/react";
import { GlobalStateContext, Difficulty } from "@/State/triviaMachine";

import Layout from "@/Components/Layout/Layout";
import { BackgroundColorType } from "@/Components/Layout/LayoutTypes";
import Button from "@/Components/Button/Button";
import { BtnLabelColors, BtnSizeType } from "@/Components/Button/ButtonTypes";

import styles from "./SelectDifficulty.module.css";

function SelectDifficulty(): ReactElement {
  window.scrollTo(0, 0);

  const globalServices = useContext(GlobalStateContext);
  const [state] = useActor(globalServices.triviaService);
  const { send } = globalServices.triviaService;

  const { difficultyOptions } = state.context;

  const handleClick = (value: string) => {
    send("SELECT", { difficulty: value });
  };

  return (
    <Layout backgroundColorType={BackgroundColorType.PURPLE}>
      <h2 className={styles.difficulties__title}>Choose Difficulty</h2>
      <div className={styles.difficulties__container}>
        {difficultyOptions.map((difficulty: Difficulty, index) => {
          return (
            <Button
              key={index}
              label={difficulty.label}
              labelColorType={BtnLabelColors.PURPLE}
              btnSizeType={BtnSizeType.SMALL}
              value={difficulty.value}
              handleClick={handleClick}
            />
          );
        })}
      </div>
    </Layout>
  );
}

export default SelectDifficulty;
