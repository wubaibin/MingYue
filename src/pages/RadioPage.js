import { Text, StyleSheet, View } from "react-native";
import React, { useState, useEffect } from "react";
import NavBar from "../ui/NavBar";
import Radio from "../ui/Radio";
import RadioGroup from "../ui/RadioGroup";

export default (props) => {
  const { title } = props.route.params;
  const onChange = (value) => {
    console.log(value)
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#f7f8fa" }}>
      <NavBar title={title}></NavBar>
      <View style={{ paddingHorizontal: 18 }}>
        <Text style={styles.title}>基础用法</Text>
        <RadioGroup value={"2"} onChange={onChange} style={{ marginTop: 12 }}>
          <Radio name="1">单选框1</Radio>
          <Radio name="2">单选框2</Radio>
        </RadioGroup>
        <Text style={styles.title}>禁用状态</Text>
        <RadioGroup value={"1"} style={{ marginTop: 12 }}>
          <Radio name="1" disabled>单选框1</Radio>
          <Radio name="2">单选框2</Radio>
        </RadioGroup>
        <Text style={styles.title}>自定义大小</Text>
        <RadioGroup value={"2"} style={{ marginTop: 12 }}>
          <Radio name="1" iconSize={28}>单选框1</Radio>
          <Radio name="2" iconSize={28}>单选框2</Radio>
        </RadioGroup>
        <Text style={styles.title}>自定义图标</Text>
        <RadioGroup value={"1"} style={{ marginTop: 12 }}>
          <Radio name="1" icon="checkbox_normal" iconSelect="checkbox_selected">单选框1</Radio>
          <Radio name="2" icon="checkbox_normal" iconSelect="checkbox_selected">单选框2</Radio>
        </RadioGroup>
        <Text style={styles.title}>自定义颜色</Text>
        <RadioGroup value={"1"} style={{ marginTop: 12 }}>
          <Radio name="1" iconSelectColor="#EE0A24">单选框1</Radio>
          <Radio name="2" iconSelectColor="#EE0A24">单选框2</Radio>
        </RadioGroup>
        <Text style={styles.title}>禁用文本点击</Text>
        <RadioGroup value={"1"} style={{ marginTop: 12 }}>
          <Radio name="1">单选框1</Radio>
          <Radio name="2" labelDisabled>单选框2</Radio>
        </RadioGroup>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 13,
    color: '#999',
    marginTop: 24,
  }
})
