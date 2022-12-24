import React from "react";
import { LogBox } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import Store from "./src/store";
import Stage from "./src/router/stage";

LogBox.ignoreLogs([
  "ViewPropTypes will be removed",
]);
// 隐藏黄色报错
LogBox.ignoreAllLogs();

export default () => {
  return (
    <SafeAreaProvider>
      <Provider store={Store}>{Stage()}</Provider>
    </SafeAreaProvider>
  )
}
