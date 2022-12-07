/*
 * @Description: App根目录
 * @Version: 1.0.0
 * @Autor: wubaibin
 * @Date: 2022-08-05 14:03:37
 * @LastEditors: wubaibin
 * @LastEditTime: 2022-12-06 17:47:54
 */
import React, { useEffect } from "react";
import { LogBox, Platform, NativeModules } from "react-native";
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
