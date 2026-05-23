import { Dimensions } from "react-native";

export const WINDOW = Dimensions.get("window");

export const widthRatio = (target: number) => {
  return WINDOW.width * (target / 375);
};

export const heightRatio = (target: number) => {
  return WINDOW.height * (target / 812);
};
