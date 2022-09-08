export enum BtnLabelColors {
  BLUE,
  RED,
  PURPLE,
  SOFT_PURPLE,
  WHITE,
  BLACK,
}

export enum BtnSizeType {
  LARGE,
  MEDIUM,
  SMALL,
}

export enum BtnBackgroundType {
  WHITE,
  RED,
  GREEN,
}

export type ButtonProps<T> = {
  labelColorType: BtnLabelColors;
  btnSizeType: BtnSizeType;
  btnBackgroundType?: BtnBackgroundType;
  label: string;
  value: T;
  disabled?: boolean;
  handleClick: (value: T) => void;
};
