import { Text, StyleSheet, View } from "react-native";
import React, { useState, useEffect } from "react";
import NavBar from "../ui/NavBar";
import { Title } from "../style";
import Button from "../ui/Button";

export default (props) => {
  const { title } = props.route.params;
  return (
    <View style={{ flex: 1, backgroundColor: "#f7f8fa" }}>
      <NavBar title={title}></NavBar>
      <Text style={Title}>基础用法</Text>
      <NavBar title="基础用法"></NavBar>
      <Text style={Title}>使用插槽</Text>
      <NavBar
        left={
          <View></View>
        }
        right={
          <Button>自定义right</Button>
        }
        title={<Button>自定义title</Button>}
      ></NavBar>
    </View>
  )
}

const styles = StyleSheet.create({})
