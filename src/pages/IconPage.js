import { Text, StyleSheet, View } from "react-native";
import React from "react";
import NavBar from "../ui/NavBar";
import { Title } from "../style";
import Icon from "../ui/icon";

export default (props) => {
  const { title } = props.route.params;
  return (
    <View style={{ flex: 1, backgroundColor: "#f7f8fa" }}>
      <NavBar title={title}></NavBar>
      <View style={{ paddingHorizontal: 18 }}>
        <Text style={Title}>基础用法</Text>
        <View style={styles.content}>
          <Icon name="refresh"></Icon>
          <Icon name="arrow"></Icon>
        </View>
        <Text style={Title}>图标颜色</Text>
        <View style={styles.content}>
          <Icon name="refresh" color="#1989fa"></Icon>
          <Icon name="arrow" color="#ee0a24"></Icon>
        </View>
        <Text style={Title}>图标大小</Text>
        <View style={styles.content}>
          <Icon name="refresh" size={20}></Icon>
          <Icon name="refresh" size={24} style={{ marginLeft: 12 }}></Icon>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 12
  }
})
