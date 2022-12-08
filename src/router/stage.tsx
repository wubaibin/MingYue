/**
 * @description: App所有页面(tabBar里面的页面可以不写在这里)
 * @author: wubaibin
 */
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabBarPage from '../pages/TabBarPage';
import ButtonPage from '../pages/ButtonPage';

const Stack = createNativeStackNavigator();

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='TabBarPage' component={TabBarPage} />
        <Stack.Screen name="ButtonPage" component={ButtonPage} initialParams={{ title: 'Button' }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
