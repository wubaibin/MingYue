import { Text, StyleSheet, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import NavBar from "../ui/NavBar";
import Route from "../router/route";
import List from "../components/List";
import { Title } from "../style";

export default (props) => {
  useEffect(() => {
    Route.navigation = props.navigation;
  }, [])
  const { title } = props.route.params;
  const handleList = (path) => {
    Route.navigate(path);
  }
  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <NavBar title={title} left={<View></View>}></NavBar>
      <ScrollView style={{ paddingHorizontal: 18 }}>
        <Text style={Title}>基础</Text>
        <List title="按钮 Button" onPress={() => { handleList("ButtonPage") }}></List>
        <List title="图标 Icon" onPress={() => { handleList("IconPage") }}></List>
        <Text style={Title}>视图</Text>
        <List title="弹出层 Popup" onPress={() => { handleList("PopupPage") }}></List>
        <List title="页底提示 Loadmore" onPress={() => { handleList("LoadmorePage") }}></List>
        <Text style={Title}>操作反馈</Text>
        <List title="轻提示 Toast" onPress={() => { handleList("ToastPage") }}></List>
        <List title="模态框 Dialog" onPress={() => { handleList("DialogPage") }}></List>
        <Text style={Title}>导航</Text>
        <List title="标签页 Tabs" onPress={() => { handleList("TabsPage") }}></List>
        <List title="导航栏 NavBar" onPress={() => { handleList("NavBarPage") }}></List>
        <Text style={Title}>表单</Text>
        <List title="单选框 Radio" onPress={() => { handleList("RadioPage") }}></List>
        <List title="复选框 Checkbox" onPress={() => { handleList("CheckboxPage") }}></List>
        <List title="图片选择器 ImagePicker" onPress={() => { handleList("CheckboxPage") }}></List>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({

})
