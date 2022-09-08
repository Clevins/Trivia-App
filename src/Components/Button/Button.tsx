import ReactMarkdown from "react-markdown";
import styles from "./Button.module.css";
import {
  BtnLabelColors,
  BtnSizeType,
  BtnBackgroundType,
  ButtonProps,
} from "./ButtonTypes";

function Button<T>({
  label,
  value,
  disabled,
  labelColorType,
  btnSizeType,
  btnBackgroundType = BtnBackgroundType.WHITE,
  handleClick,
}: ButtonProps<T>) {
  let labelColor;
  let btnSize;
  let btnBackgroundColor;

  switch (labelColorType) {
    case BtnLabelColors.BLUE:
      labelColor = styles["btn__label--blue"];
      break;
    case BtnLabelColors.RED:
      labelColor = styles["btn__label--red"];
      break;
    case BtnLabelColors.PURPLE:
      labelColor = styles["btn__label--purple"];
      break;
    case BtnLabelColors.SOFT_PURPLE:
      labelColor = styles["btn__label--soft-purple"];
      break;
    case BtnLabelColors.WHITE:
      labelColor = styles["btn__label--white"];
      break;
    case BtnLabelColors.BLACK:
      labelColor = styles["btn__label--black"];
      break;
  }

  switch (btnSizeType) {
    case BtnSizeType.LARGE:
      btnSize = styles["btn--large"];
      break;
    case BtnSizeType.MEDIUM:
      btnSize = styles["btn--medium"];
      break;
    case BtnSizeType.SMALL:
      btnSize = styles["btn--small"];
      break;
  }

  switch (btnBackgroundType) {
    case BtnBackgroundType.WHITE:
      btnBackgroundColor = styles["btn__background--white"];
      break;
    case BtnBackgroundType.GREEN:
      btnBackgroundColor = styles["btn__background--green"];
      labelColor = styles["btn__label--white"];
      break;
    case BtnBackgroundType.RED:
      btnBackgroundColor = styles["btn__background--red"];
      labelColor = styles["btn__label--white"];
      break;
  }

  return (
    <button
      className={`${styles.btn} ${btnSize} ${btnBackgroundColor} ${labelColor}`}
      onClick={() => handleClick(value)}
      disabled={disabled}>
      <div className={styles.btn__label}>
        <ReactMarkdown>{label}</ReactMarkdown>
      </div>
    </button>
  );
}

export default Button;
