import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePage from "../pages/HomePage";
import Icon from "../ui/icon";
import CenterPage from "../pages/CenterPage";
import { Color } from "../ui/utils/config";

const Tab = createBottomTabNavigator();

const TABS = {
  HomePage: {
    screen: HomePage,
    navigationOptions: {
      tabBarLabel: '首页',
      headerShown: false,
      tabBarIcon: ({ color }) => (
        <Icon size={20} color={color} name={'home'} />
      )
    }
  },
  CenterPage: {
    screen: CenterPage,
    navigationOptions: {
      tabBarLabel: '我的',
      headerShown: false,
      tabBarIcon: ({ color }) => (
        <Icon size={20} color={color} name={'user'} />
      )
    }
  }
}
export default (props) => {
  return (
    <Tab.Navigator>
      {Object.entries(TABS).map((item, index) => {
        return (
          <Tab.Screen
            key={item[0]}
            name={item[0]}
            component={item[1].screen}
            options={{
              ...(item[1].navigationOptions),
              tabBarActiveTintColor: Color.theme,
            }}
            initialParams={{ title: item[1].navigationOptions.tabBarLabel }}
            listeners={({ navigation, route }) => ({
              tabPress: async (e) => {
                e.preventDefault()
                // 可以在跳转页面之前做一些事情
                // if(true) {
                //   dosomething
                //   return
                // }
                navigation.jumpTo(route.name, route.params)
              },
            })}
          />
        )
      })}
    </Tab.Navigator>
  )
}
