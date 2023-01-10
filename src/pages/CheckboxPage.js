import { Text, StyleSheet, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import NavBar from "../ui/NavBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Checkbox from "../ui/Checkbox";
import CheckboxGroup from "../ui/CheckboxGroup";

export default (props) => {
  const { title } = props.route.params;
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: "#f7f8fa", paddingBottom: insets.bottom }}>
      <NavBar title={title}></NavBar>
      <ScrollView style={{ paddingHorizontal: 18 }}>
        <Text style={styles.title}>基础用法</Text>
        <Checkbox style={{ marginTop: 12 }}>复选框</Checkbox>
        <Text style={styles.title}>禁用状态</Text>
        <Checkbox style={{ marginTop: 12 }} disabled>复选框</Checkbox>
        <Text style={styles.title}>自定义图标</Text>
        <Checkbox active={true} icon="radio_normal" iconSelect="radio_selected" style={{ marginTop: 12 }}>复选框</Checkbox>
        <Text style={styles.title}>自定义颜色</Text>
        <Checkbox active={true} iconSelectColor="#EE0A24" style={{ marginTop: 12 }}>复选框</Checkbox>
        <Text style={styles.title}>自定义大小</Text>
        <Checkbox active={true} iconSize={28} style={{ marginTop: 12 }}>复选框</Checkbox>
        <Text style={styles.title}>禁用文本点击</Text>
        <Checkbox style={{ marginTop: 12 }} labelDisabled>复选框</Checkbox>
        <Text style={styles.title}>复选框组</Text>
        <CheckboxGroup value={["a"]} style={{ marginTop: 12 }}>
          <Checkbox name="a">复选框 a</Checkbox>
          <Checkbox name="b">复选框 b</Checkbox>
        </CheckboxGroup>
        <Text style={styles.title}>限制最大可选数</Text>
        <CheckboxGroup value={["a"]} max={2} style={{ marginTop: 12 }}>
          <Checkbox name="a">复选框 a</Checkbox>
          <Checkbox name="b">复选框 b</Checkbox>
          <Checkbox name="c">复选框 c</Checkbox>
        </CheckboxGroup>
        <Text style={styles.title}>限制最小可选数</Text>
        <CheckboxGroup value={["a"]} min={1} style={{ marginTop: 12 }}>
          <Checkbox name="a">复选框 a</Checkbox>
          <Checkbox name="b">复选框 b</Checkbox>
        </CheckboxGroup>
      </ScrollView>
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
