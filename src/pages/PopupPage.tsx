import { Text, StyleSheet, View } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import NavBar from "../ui/NavBar";
import { Title } from "../style";
import List from "../components/List";
import Popup, { Position } from "../ui/Popup";

export default (props: any) => {
  const { title } = props.route.params;
  const [position, setPosition] = useState<Position>("center");
  const [radius, setRadius] = useState<number>(0);
  const [closeable, setCloseable] = useState<boolean>(false);
  const popupRef = useRef<any>(null);

  const handleList = (type: Position, radius?: number, close?: boolean) => {
    setPosition(type);
    radius && setRadius(radius);
    setCloseable(!!close);
    popupRef.current.show();
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#f7f8fa' }}>
      <NavBar title={title}></NavBar>
      <View style={{ paddingHorizontal: 18 }}>
        <Text style={Title}>基础用法</Text>
        <List type={2} title="展示弹出层" onPress={() => { handleList("center") }}></List>
        <Text style={Title}>弹出位置</Text>
        <List type={2} title="顶部弹出" onPress={() => { handleList("top") }}></List>
        <List type={2} title="底部弹出" onPress={() => { handleList("bottom") }}></List>
        <List type={2} title="左侧弹出" onPress={() => { handleList("left") }}></List>
        <List type={2} title="右侧弹出" onPress={() => { handleList("right") }}></List>
        <Text style={Title}>关闭图标</Text>
        <List type={2} title="关闭图标" onPress={() => { handleList("bottom", 0, true) }}></List>
        <Text style={Title}>圆角弹窗</Text>
        <List type={2} title="圆角弹窗" onPress={() => { handleList("bottom", 12) }}></List>
      </View>
      <Popup ref={popupRef} position={position} borderRadius={radius} closeable={closeable}>
        <View style={{ width: 120, height: 120 }}></View>
      </Popup>
    </View>
  )
}

const styles = StyleSheet.create({})
