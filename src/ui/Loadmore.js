import { Text, StyleSheet, View, ActivityIndicator } from "react-native";
import React from "react";
import PropTypes from "prop-types";

Loadmore.propTypes = {
  type: PropTypes.oneOf(["loading", "end"]),
  line: PropTypes.bool,
  fontSize: PropTypes.number,
  color: PropTypes.string,
  loadingText: PropTypes.string,
  endText: PropTypes.string,
  lineBg: PropTypes.string,
  lineWidth: PropTypes.number,
  lineHeight: PropTypes.number,
  style: PropTypes.object,
  textStyle: PropTypes.object,
  lineStyle: PropTypes.object,
  loadingStyle: PropTypes.object,
}
Loadmore.defaultProps = {
  type: "loading",
  line: true,
  fontSize: 12,
  color: "#999999",
  loadingText: "正在加载...",
  endText: "没有更多内容了",
  lineBg: "#CACACA",
  lineWidth: 60,
  lineHeight: 1,
  style: {},
  textStyle: {},
  lineStyle: {},
  loadingStyle: {}
}

export default function Loadmore(props) {
  const { type, line, fontSize, color, loadingText, endText, lineBg, lineWidth, lineHeight, style, textStyle, lineStyle, loadingStyle } = props;

  return (
    <View style={[styles.container, style]}>
      {line ? <View style={[{ width: lineWidth, height: lineHeight, backgroundColor: lineBg }, lineStyle]} ></View > : <></>}
      {
        type === "loading" ? <ActivityIndicator size="small" color={color} style={{ marginLeft: 12, ...loadingStyle }} /> : <></>
      }
      <Text style={[styles.text, { fontSize, color }, textStyle]}>
        {type === "loading" ? loadingText : endText}
      </Text>
      {line ? <View style={[{ width: lineWidth, height: lineHeight, backgroundColor: lineBg }, lineStyle]} ></View > : <></>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 24
  },
  text: {
    color: "#999999",
    fontSize: 12,
    paddingHorizontal: 12,
  }
})
