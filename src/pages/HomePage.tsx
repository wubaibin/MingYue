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
    console.log('aaa');
    Route.navigate(path);
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <NavBar title={title} left={<View></View>}></NavBar>
      <View style={{ paddingHorizontal: 18 }}>
        <Text style={Title}>基础组件</Text>
        <List title="Button" onPress={() => { handleList("ButtonPage") }}></List>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({

})
