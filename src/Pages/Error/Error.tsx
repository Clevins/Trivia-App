import { ReactElement, useContext } from "react";
import { GlobalStateContext } from "@/triviaMachine";

import Layout from "@/Components/Layout/Layout";
import { BackgroundColorType } from "@/Components/Layout/LayoutTypes";
import Button from "@/Components/Button/Button";
import {
  BtnBackgroundType,
  BtnLabelColors,
  BtnSizeType,
} from "@/Components/Button/ButtonTypes";

import styles from "./Error.module.css";

function Error(): ReactElement {
  const globalServices = useContext(GlobalStateContext);
  const { send } = globalServices.triviaService;

  const handleClick = () => {
    send("SELECT");
  };

  return (
    <Layout backgroundColorType={BackgroundColorType.RED}>
      <h2 className={styles.error__title}>Something Is Wrong</h2>
      <div className={styles.error__container}>
        <Button
          btnSizeType={BtnSizeType.MEDIUM}
          btnBackgroundType={BtnBackgroundType.WHITE}
          labelColorType={BtnLabelColors.RED}
          key='errorBtn'
          label='Try Again'
          value=''
          handleClick={() => handleClick()}
        />
      </div>
    </Layout>
  );
}

export default Error;
