import NetInfo from "@react-native-community/netinfo";
import { onlineManager } from "@tanstack/react-query";
import * as React from "react";

export function useIsOnline(): boolean {
  const [isOnline, setIsOnline] = React.useState(onlineManager.isOnline());

  React.useEffect(() => {
    const unsubscribe = onlineManager.subscribe(setIsOnline);
    return unsubscribe;
  }, []);

  React.useEffect(() => {
    return NetInfo.addEventListener((state) => {
      onlineManager.setOnline(state.isConnected === true);
    });
  }, []);

  return isOnline;
}
