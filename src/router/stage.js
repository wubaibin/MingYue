/**
 * @description: App所有页面(tabBar里面的页面可以不写在这里)
 * @author: wubaibin
 */
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabBar from "./TabBar";
import ButtonPage from "../pages/ButtonPage";
import IconPage from "../pages/IconPage";
import PopupPage from "../pages/PopupPage";
import ToastPage from "../pages/ToastPage";
import DialogPage from "../pages/DialogPage";
import RadioPage from "../pages/RadioPage";
import CheckboxPage from "../pages/CheckboxPage";

const Stack = createNativeStackNavigator();
export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='TabBar' component={TabBar} />
        <Stack.Screen name="ButtonPage" component={ButtonPage} initialParams={{ title: 'Button' }} />
        <Stack.Screen name="IconPage" component={IconPage} initialParams={{ title: 'Icon' }} />
        <Stack.Screen name="PopupPage" component={PopupPage} initialParams={{ title: 'Popup' }} />
        <Stack.Screen name="ToastPage" component={ToastPage} initialParams={{ title: 'Toast' }} />
        <Stack.Screen name="DialogPage" component={DialogPage} initialParams={{ title: 'Dialog' }} />
        <Stack.Screen name="RadioPage" component={RadioPage} initialParams={{ title: 'Radio' }} />
        <Stack.Screen name="CheckboxPage" component={CheckboxPage} initialParams={{ title: 'Checkbox' }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
