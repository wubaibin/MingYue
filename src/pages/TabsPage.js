import { Text, StyleSheet, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import NavBar from "../ui/NavBar";
import Tabs from "../ui/Tabs";
import Tab from "../ui/Tab";
import { Title } from "../style";
import { Color } from "../ui/utils/config";

export default (props) => {
  const { title } = props.route.params;

  return (
    <View style={{ flex: 1, backgroundColor: "#f7f8fa" }}>
      <NavBar title={title}></NavBar>
      <Text style={Title}>基础用法</Text>
      <Tabs value={"b"} style={{ marginTop: 24 }}>
        <Tab title="标签 1" name="a"></Tab>
        <Tab title="标签 2" name="b"></Tab>
        <Tab title="标签 3" name="c"></Tab>
      </Tabs>
      <Text style={Title}>图标标签页</Text>
      <Tabs value={"b"} style={{ marginTop: 24 }}>
        <Tab title="标签 1" name="a" icon="user"></Tab>
        <Tab title="标签 2" name="b"></Tab>
        <Tab title="标签 3" name="c"></Tab>
      </Tabs>
      <Text style={Title}>禁用标签页</Text>
      <Tabs value={"b"} style={{ marginTop: 24 }}>
        <Tab title="标签 1" name="a" disabled></Tab>
        <Tab title="标签 2" name="b"></Tab>
        <Tab title="标签 3" name="c"></Tab>
      </Tabs>
      <Text style={Title}>自定义选项卡</Text>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Tabs value="2" style={{ marginTop: 24, width: 300 }}
          tabWidth={100}
          showLine={false}
          inactiveTabStyle={styles.card}
          activeTabStyle={{ backgroundColor: Color.theme }}
          inactiveTitleStyle={{ fontSize: 16, color: Color.theme }}
          activeTitleStyle={{ fontSize: 16, color: "#ffffff" }}
          tabStyle={{ borderRightColor: Color.theme, borderRightWidth: 1 }}
        >
          <Tab title="标签 1" name="1"></Tab>
          <Tab title="标签 2" name="2"></Tab>
          <Tab title="标签 3" name="3"></Tab>
        </Tabs>
      </View>
      <Text style={Title}>标签页滚动</Text>
      <Tabs value={"c"} tabWidth={100} style={{ marginTop: 24 }}>
        <Tab title="标签 1" name="a"></Tab>
        <Tab title="标签 2" name="b"></Tab>
        <Tab title="标签 3" name="c"></Tab>
        <Tab title="标签 4" name="d"></Tab>
        <Tab title="标签 5" name="e"></Tab>
        <Tab title="标签 6" name="f"></Tab>
        <Tab title="标签 7" name="g"></Tab>
      </Tabs>
      <Text style={Title}>内容标签页</Text>
      <Tabs value={"a"} style={{ marginTop: 24, flex: 1 }}>
        <Tab title="标签 1" name="a">
          <Text>内容 1</Text>
        </Tab>
        <Tab title="标签 2" name="b">
          <Text>内容 2</Text>
        </Tab>
        <Tab title="标签 3" name="c">
          <Text>内容 3</Text>
        </Tab>
      </Tabs>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderColor: Color.theme,
    borderWidth: 1,
    borderRightWidth: 0,
  },
})
