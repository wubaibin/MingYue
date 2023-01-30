import { Text, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Icon from "./icon";

Tab.propTypes = {
  title: PropTypes.string,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.object,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  iconSize: PropTypes.number,
  iconStyle: PropTypes.object,
}

Tab.defaultProps = {
  iconStyle: { marginRight: 6 },
}

export default function Tab(props) {
  const { width, title, active, disabled, activeColor, inactiveColor, disabledColor, animated, showLine, fixedLine, line: { props: { bottom, width: lineWidth } } } = props;
  return (
    <View style={[styles.container, { width }, disabled ? props.disabledStyle : active ? props.activeStyle : props.inactiveStyle]}>
      {
        props.icon ?
          <Icon name={props.icon} color={disabled ? disabledColor : active ? activeColor : inactiveColor} size={props.iconSize} style={props.iconStyle}></Icon> : <></>
      }
      <Text style={[
        { color: disabled ? disabledColor : active ? activeColor : inactiveColor },
        disabled ? { ...styles.titleDisabled, ...props.disabledTitleStyle } : active ? { ...styles.titleActive, ...props.activeTitleStyle } : { ...styles.title, ...props.inactiveTitleStyle },
      ]}>
        {title}
      </Text>
      {
        showLine && active && (!animated || fixedLine) ?
          <View style={{ position: "absolute", bottom: bottom, left: (width - lineWidth) / 2 }}>
            {props.line}
          </View> : <></>
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
  },
  titleActive: {
    fontSize: 13,
    fontWeight: "500"
  },
  titleDisabled: {
    fontSize: 13,
  }
});
