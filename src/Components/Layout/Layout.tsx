import Pattern from "@/Assets/Pattern";
import { FC } from "react";
import styles from "./Layout.module.css";
import { BackgroundColorType, LayoutProps } from "./LayoutTypes";

const Layout: FC<LayoutProps> = ({ children, backgroundColorType }) => {
  let backgroundColor;
  let patternColor;

  switch (backgroundColorType) {
    case BackgroundColorType.BLUE:
      backgroundColor = styles["background--blue"];
      patternColor = styles["background__pattern--blue"];
      break;
    case BackgroundColorType.RED:
      backgroundColor = styles["background--red"];
      patternColor = styles["background__pattern--red"];
      break;
    case BackgroundColorType.PURPLE:
      backgroundColor = styles["background--purple"];
      patternColor = styles["background__pattern--purple"];
      break;
    case BackgroundColorType.SOFT_PURPLE:
      backgroundColor = styles["background--soft-purple"];
      patternColor = styles["background__pattern--soft-purple"];
      break;
  }

  return (
    <div className={`${styles.background} ${backgroundColor}`}>
      <div className={`${styles.background__pattern} ${patternColor}`}>
        <Pattern />
        <div className={styles.container}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
