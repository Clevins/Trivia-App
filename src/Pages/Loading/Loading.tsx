import Layout from "@/Components/Layout/Layout";
import { BackgroundColorType } from "@/Components/Layout/LayoutTypes";
import { State } from "@/State/triviaMachine";
import { ReactElement } from "react";
import styles from "./Loading.module.css";

type LoadingProps = {
  state: String;
};

function Loading({ state }: LoadingProps): ReactElement {
  // If Fetching Questions Make Loader Background Color
  // Purple To Match Difficulty Selection Background
  const backgroundColor =
    state === State.FETCH_QUESTIONS
      ? BackgroundColorType.PURPLE
      : BackgroundColorType.BLUE;
  return (
    <Layout backgroundColorType={backgroundColor}>
      <div className={styles["spinner-container"]}>
        <div className={styles["loading-spinner"]}></div>
      </div>
    </Layout>
  );
}

export default Loading;
