/*
 * @Description: 
 * @Version: 1.0.0
 * @Autor: wubaibin
 * @Date: 2022-12-06 15:29:11
 * @LastEditors: wubaibin
 * @LastEditTime: 2022-12-07 15:16:44
 */
import { Text, StyleSheet, View } from "react-native";
import React, { useState, useEffect } from "react";
import NavBar from "../ui/NavBar";
import Route from "../router/route";
import Icon from "../ui/icon";

export default (props: { navigation: object; route: any; }) => {
  useEffect(() => {
    Route.navigation = props.navigation;
  }, [])
  const { title } = props.route.params;
  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <NavBar title={title} left={<View></View>}></NavBar>
      <Text>HomePage</Text>
      <Icon name="ic_home"></Icon>
    </View>
  )
}

const styles = StyleSheet.create({})
