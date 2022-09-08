import { ReactNode } from "react";

export type LayoutProps = {
  children: ReactNode;
  backgroundColorType: BackgroundColorType;
};

export enum BackgroundColorType {
  BLUE,
  RED,
  PURPLE,
  SOFT_PURPLE,
}
