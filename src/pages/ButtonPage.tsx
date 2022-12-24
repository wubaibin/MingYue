import { Text, StyleSheet, View, ScrollView, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import NavBar from "../ui/NavBar";
import { Title } from "../style";
import Button from "../ui/Button";

export default (props: any) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, backgroundColor: '#f7f8fa', paddingBottom: insets.bottom }}>
      <NavBar title={'Button'}></NavBar>
      <ScrollView style={{ paddingHorizontal: 18 }}>
        <Text style={Title}>按钮尺寸</Text>
        <Button size="mini" style={styles.btn}>小按钮</Button>
        <Button size="medium" style={styles.btn}>中按钮</Button>
        <Button size="large" style={styles.btn}>大按钮</Button>
        <Button size="long" style={styles.btn}>通栏按钮</Button>
        <Text style={Title}>按钮形状</Text>
        <Button shape="square" size="large" style={styles.btn}>直角按钮</Button>
        <Button shape="circle" size="large" style={styles.btn}>圆弧按钮</Button>
        <Button shape="semicircle" size="large" style={styles.btn}>半圆按钮</Button>
        <Text style={Title}>镂空按钮</Text>
        <Button plain size="large" style={styles.btn}>镂空按钮</Button>
        <Text style={Title}>禁用按钮</Text>
        <Button disabled size="large" style={styles.btn}>禁用按钮</Button>
        <Text style={Title}>加载状态</Text>
        <Button loading size="large" style={styles.btn}>加载中</Button>
        <Text style={Title}>图标按钮</Text>
        <Button size="large" icon="ic_refresh" style={styles.btn}>图标按钮</Button>
        <Text style={Title}>自定义按钮长宽 字体大小 背景颜色</Text>
        <Button width={200} height={50} fontSize={20} bgColor="red" style={styles.btn}>自定义按钮</Button>
        <Button plain width={200} height={50} fontSize={20} borderColor="red" color="red" style={styles.btn}>自定义按钮</Button>
        <Text style={Title}>插槽按钮</Text>
        <Button size="large" style={styles.btn}>
          <Image source={require("../assets/images/pic.png")} style={{ width: 20, height: 20 }}></Image>
          <Text style={{ fontSize: 16, color: '#fff', marginLeft: 8 }}>插槽按钮</Text>
        </Button>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  btn: {
    marginTop: 8
  }
})
