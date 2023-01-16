import { Text, StyleSheet, View } from "react-native";
import React from "react";
import PropTypes from "prop-types";

SegmentItem.propTypes = {
  active: PropTypes.bool,
  width: PropTypes.number,
  inactiveColor: PropTypes.string,
  activeColor: PropTypes.string,
  inactiveStyle: PropTypes.object,
  activeStyle: PropTypes.object,
  inactiveTilteStyle: PropTypes.object,
  activeTitleStyle: PropTypes.object,
}

SegmentItem.defaultProps = {
  inactiveColor: "#646566",
  activeColor: "#323233",
  inactiveStyle: {},
  activeStyle: {},
  inactiveTilteStyle: {},
  activeTitleStyle: {}
}

export default function SegmentItem(props) {
  const { active, width, lineStyle, showLine } = props;

  return (
    <View style={[styles.container, { width }, active ? props.activeStyle : props.inactiveStyle]}>
      <Text style={[
        active ?
          { fontSize: 13, color: props.activeColor, fontWeight: "500", ...props.inactiveTilteStyle } :
          { fontSize: 13, color: props.inactiveColor, ...props.activeTilteStyle }
      ]}>
        {props.children}
      </Text>
      {
        active && showLine ? <View style={{ ...lineStyle, left: (width - lineStyle.width) / 2 }}></View> : <></>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  title: {
    fontSize: 13,
    color: "#646566",
  },
  titleActive: {
    fontSize: 13,
    color: "#323233",
    fontWeight: "500"
  }
})
