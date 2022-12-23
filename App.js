import React, { useState, useEffect, useRef } from "react";
import { LogBox } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import Store from "./src/store";
import Stage from "./src/router/stage";
import Toast from "./src/ui/Toast";
import Dialog from "./src/ui/Dialog";

LogBox.ignoreLogs([
  "ViewPropTypes will be removed",
]);
// 隐藏黄色报错
LogBox.ignoreAllLogs();

export default () => {
  return (
    <SafeAreaProvider>
      <Toast ref={ref => global.$toast = ref}></Toast>
      <Dialog ref={ref => global.$dialog = ref}></Dialog>
      <Provider store={Store}>{Stage()}</Provider>
    </SafeAreaProvider>
  )
}
