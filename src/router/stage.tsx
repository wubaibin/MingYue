/*
 * @Description: 
 * @Version: 1.0.0
 * @Autor: wubaibin
 * @Date: 2022-12-06 15:29:11
 * @LastEditors: wubaibin
 * @LastEditTime: 2022-12-07 11:03:58
 */
/*
 * @Description: app所有页面
 */
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "../pages/HomePage";

const Stack = createNativeStackNavigator();

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomePage" component={HomePage} initialParams={{ title: "首页" }} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}
