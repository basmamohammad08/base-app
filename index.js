import { registerRootComponent } from "expo";
import { DevSettings } from "react-native";
import "react-native-gesture-handler";
import "./global.css";
import i18n from "./src/i18n/config";
import { applyDirection } from "./src/i18n/rtl";

import { Entry } from "./src/navigation/entry";

if (applyDirection(i18n.language)) {
  if (__DEV__ && typeof DevSettings.reload === "function") {
    DevSettings.reload();
  }
}

registerRootComponent(Entry);
