import { Text, StyleSheet, View } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import NavBar from '../ui/NavBar';
import { Title } from "../style";
import List from "../components/List";
import Toast from "../ui/Toast";
import { $toast } from "../ui/utils/global";

export default (props: any) => {
  const { title } = props.route.params;
  const toast = useRef<any>(null);
  let timer: any = null;
  useEffect(() => {
    $toast.current = toast.current;
    return () => {
      timer && clearInterval(timer);
    }
  }, [])
  const handleList = (type: string, icon?: string) => {
    if (type === "showToast") {
      if (icon) {
        $toast.showToast({ title: `${icon === 'success' ? '成功' : '失败'}文案`, icon });
        return
      }
      // toast.current.showToast({ title: "这是一条基础提示框" });
      $toast.showToast({ title: "这是一条基础提示框" });
      return
    }
    if (type === "showLoading") {
      $toast.showLoading({ title: "加载中..." });
      timer = setTimeout(() => {
        $toast.hideLoading();
      }, 3000)
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#f7f8fa' }}>
      <NavBar title={title}></NavBar>
      <View style={{ paddingHorizontal: 18 }}>
        <Text style={Title}>基础用法</Text>
        <List type={2} title="文字提示" onPress={() => { handleList("showToast") }}></List>
        <List type={2} title="加载提示" onPress={() => { handleList("showLoading") }}></List>
        <List type={2} title="成功提示" onPress={() => { handleList("showToast", "success") }}></List>
        <List type={2} title="失败提示" onPress={() => { handleList("showToast", "fail") }}></List>
        <Toast ref={toast}></Toast>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})
