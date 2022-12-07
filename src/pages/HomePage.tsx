import { Text, StyleSheet, View } from "react-native";
import React, { useState, useEffect } from "react";
import NavBar from "../ui/NavBar";
import Route from "../router/route";

export default (props: { navigation: object; route: any; }) => {
  useEffect(() => {
    Route.navigation = props.navigation;
  }, [])
  const { title } = props.route.params;
  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <NavBar title={title} left={<View></View>}></NavBar>
      <Text>HomePage</Text>
    </View>
  )
}

const styles = StyleSheet.create({})
