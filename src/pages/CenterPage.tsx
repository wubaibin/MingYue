import { Text, StyleSheet, View } from "react-native";
import React, { useState, useEffect } from "react";
import NavBar from "../ui/NavBar";

export default (props: any) => {
  const { title } = props.route.params;
  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <NavBar title={title} left={<View></View>}></NavBar>
    </View>
  )
}

const styles = StyleSheet.create({})
