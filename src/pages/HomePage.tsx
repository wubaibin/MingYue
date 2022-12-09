import { Text, StyleSheet, View } from "react-native";
import React, { useState, useEffect } from "react";
import NavBar from "../ui/NavBar";
import Route from "../router/route";
import List from "../components/List";
import { Title } from "../style";

export default (props: any) => {
  useEffect(() => {
    Route.navigation = props.navigation;
  }, [])
  const { title } = props.route.params;
  const handleList = (path: string) => {
    Route.navigate(path);
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <NavBar title={title} left={<View></View>}></NavBar>
      <View style={{ paddingHorizontal: 18 }}>
        <Text style={Title}>基础</Text>
        <List title="Button" onPress={() => { handleList("ButtonPage") }}></List>
        <List title="Icon 图标" onPress={() => { handleList("IconPage") }}></List>
        <Text style={Title}>视图</Text>
        <List title="Popup" onPress={() => { handleList("PopupPage") }}></List>
        <Text style={Title}>操作反馈</Text>
        <List title="Toast" onPress={() => { handleList("ToastPage") }}></List>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({

})
