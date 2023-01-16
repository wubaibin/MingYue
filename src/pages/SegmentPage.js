import { Text, StyleSheet, View } from "react-native";
import React, { useState, useEffect } from "react";
import NavBar from "../ui/NavBar"
import Segment from "../ui/Segment";
import SegmentItem from "../ui/SegmentItem";
import { Color } from "../ui/utils/config";

export default (props) => {
  const { title } = props.route.params;
  const onChange = (value) => {
    console.log(value);
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#f7f8fa" }}>
      <NavBar title={title}></NavBar>
      <Segment value="3" onChange={onChange}>
        <SegmentItem name="1">标题1</SegmentItem>
        <SegmentItem name="2">标题2</SegmentItem>
        <SegmentItem name="3">标题3</SegmentItem>
      </Segment>
      <Segment value="4" width={100} style={{ marginTop: 48 }}>
        <SegmentItem name="1">标题1</SegmentItem>
        <SegmentItem name="2">标题2</SegmentItem>
        <SegmentItem name="3">标题3</SegmentItem>
        <SegmentItem name="4">标题4</SegmentItem>
        <SegmentItem name="5">标题5</SegmentItem>
        <SegmentItem name="6">标题6</SegmentItem>
      </Segment>
      <View style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
        <Segment value="2" style={{ marginTop: 48, width: 300 }}
          width={100}
          hasLine={false}
          inactiveStyle={styles.card}
          activeStyle={{ backgroundColor: Color.theme }}
          inactiveTilteStyle={{ color: "#fff", fontSize: 16 }}
          activeTilteStyle={{ color: Color.theme, fontSize: 16 }}
          containerStyle={{ borderRightColor: Color.theme, borderRightWidth: 1 }}
        >
          <SegmentItem name="1">标题1</SegmentItem>
          <SegmentItem name="2">标题2</SegmentItem>
          <SegmentItem name="3">标题3</SegmentItem>
        </Segment>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderColor: Color.theme,
    borderWidth: 1,
    borderRightWidth: 0,
  },
})
