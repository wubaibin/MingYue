import { Text, StyleSheet, View } from "react-native";
import React, { useState, useEffect } from "react";
import NavBar from "../ui/NavBar";

export default (props) => {
  const { title } = props.route.params;
  return (
    <View style={{ flex: 1, backgroundColor: "#f7f8fa" }}>
      <NavBar title={title}></NavBar>
    </View>
  )
}

const styles = StyleSheet.create({})
