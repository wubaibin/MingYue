/**
 * @description: 单选框
 * @author: wubaibin
 */
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Icon from "./icon";
import { Color } from "./utils/config";

Radio.propTypes = {
  iconSize: PropTypes.number,
  iconColor: PropTypes.string,
  iconSelectColor: PropTypes.string,
  icon: PropTypes.string,
  iconSelect: PropTypes.string,
  color: PropTypes.string,
  disabledColor: PropTypes.string,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  labelDisabled: PropTypes.bool,
  style: PropTypes.object,
  titleStyle: PropTypes.object,
}
Radio.defaultProps = {
  iconSize: 18,
  icon: "radio_normal",
  iconSelect: "radio_selected",
  iconColor: "#c8c9cc",
  iconSelectColor: Color.theme,
  color: "#323233",
  disabledColor: "#c8c9cc",
  active: false,
  disabled: false,
  labelDisabled: false,
  style: {},
  titleStyle: {}
}

export default function Radio(props) {
  const { iconSize, icon, iconSelect, color, disabledColor, iconColor, iconSelectColor, active, disabled, labelDisabled, style, titleStyle, onPress } = props;

  return (
    <>
      {
        labelDisabled ?
          <View style={[styles.container, style]}>
            <TouchableOpacity activeOpacity={1} onPress={disabled ? () => { } : () => { onPress() }}>
              <Icon
                name={active ? iconSelect : icon}
                size={iconSize}
                color={disabled ? disabledColor : active ? iconSelectColor : iconColor}
              ></Icon>
            </TouchableOpacity>
            <Text style={[styles.title, { color: disabled ? disabledColor : color }]}>{props.children}</Text>
          </View> :
          <TouchableOpacity activeOpacity={1} style={[styles.container, style]} onPress={disabled ? () => { } : () => { onPress() }}>
            <Icon
              name={active ? iconSelect : icon}
              size={iconSize}
              color={disabled ? disabledColor : active ? iconSelectColor : iconColor}
            ></Icon>
            <Text style={[styles.title, { color: disabled ? disabledColor : color }, titleStyle]}>{props.children}</Text>
          </TouchableOpacity>
      }
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center"
  },
  title: {
    fontSize: 16,
    marginLeft: 8,
  }
})
