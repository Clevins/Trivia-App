import Button from "@/Components/Button/Button";
import {
  BtnLabelColors,
  BtnSizeType,
  BtnBackgroundType,
} from "@/Components/Button/ButtonTypes";

interface IAnswerProps<T> {
  label: string;
  value: string;
  hasSelectedAnswer: boolean;
  correctAnswer: string;
  handleClick: (value: string) => void;
}

function Answer<T>({
  label,
  value,
  hasSelectedAnswer,
  correctAnswer,
  handleClick,
}: IAnswerProps<T>) {
  let btnBackgroundColor = BtnBackgroundType.WHITE;
  let isCorrectAnswer = correctAnswer === value;

  if (hasSelectedAnswer) {
    btnBackgroundColor = isCorrectAnswer
      ? BtnBackgroundType.GREEN
      : BtnBackgroundType.RED;
  } else {
    btnBackgroundColor = BtnBackgroundType.WHITE;
  }

  return (
    <Button
      key={label}
      label={label}
      value={value}
      labelColorType={BtnLabelColors.BLACK}
      btnSizeType={BtnSizeType.LARGE}
      btnBackgroundType={btnBackgroundColor}
      disabled={hasSelectedAnswer}
      handleClick={() => handleClick(value)}
    />
  );
}

export default Answer;
