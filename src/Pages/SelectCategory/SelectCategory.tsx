import { ReactElement, useContext } from "react";
import { useActor } from "@xstate/react";
import { GlobalStateContext, Category } from "@/State/triviaMachine";

import Layout from "@/Components/Layout/Layout";
import { BackgroundColorType } from "@/Components/Layout/LayoutTypes";
import Button from "@/Components/Button/Button";
import { BtnLabelColors, BtnSizeType } from "@/Components/Button/ButtonTypes";

import styles from "./SelectCategory.module.css";

function SelectCategory(): ReactElement {
  window.scrollTo(0, 0);

  const globalServices = useContext(GlobalStateContext);
  const [state] = useActor(globalServices.triviaService);
  const { send } = globalServices.triviaService;

  const { categoryOptions } = state.context;

  const handleClick = (value: number) => {
    send("SELECT", { category: value });
  };

  return (
    <Layout backgroundColorType={BackgroundColorType.RED}>
      <h2 className={styles.categories__title}>Choose Category</h2>
      <div className={styles.categories__container}>
        {categoryOptions?.map((category: Category, index) => {
          return (
            <Button
              key={category.id}
              label={category.name}
              labelColorType={BtnLabelColors.RED}
              btnSizeType={BtnSizeType.LARGE}
              value={category.id}
              handleClick={handleClick}
            />
          );
        })}
      </div>
    </Layout>
  );
}

export default SelectCategory;
