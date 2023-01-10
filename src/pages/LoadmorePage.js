import { Text, StyleSheet, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import NavBar from "../ui/NavBar";
import { Title } from "../style";
import Loadmore from "../ui/Loadmore";
import { Color } from "../ui/utils/config";

export default (props) => {
  const { title } = props.route.params;
  return (
    <View style={{ flex: 1, backgroundColor: "#f7f8fa" }}>
      <NavBar title={title}></NavBar>
      <ScrollView style={{ paddingHorizontal: 18 }}>
        <Text style={Title}>基础用法</Text>
        <Loadmore></Loadmore>
        <Text style={Title}>提示类型及提示文案</Text>
        <Loadmore type="loading" loadingText="加载中。。。"></Loadmore>
        <Loadmore type="end" endText="我是有底线的~"></Loadmore>
        <Text style={Title}>是否显示分割线</Text>
        <Loadmore line={false}></Loadmore>
        <Text style={Title}>修改颜色</Text>
        <Loadmore color={Color.theme} lineBg={Color.theme}></Loadmore>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({})
