/**
 * @description: 复选框
 * @author: wubaibin
 */
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Icon from "./icon";
import { Color } from "./utils/config";

Checkbox.propTypes = {
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
  isGroup: PropTypes.bool,
}
Checkbox.defaultProps = {
  iconSize: 18,
  icon: "checkbox_normal",
  iconSelect: "checkbox_selected",
  iconColor: "#c8c9cc",
  iconSelectColor: Color.theme,
  color: "#323233",
  disabledColor: "#c8c9cc",
  active: false,
  disabled: false,
  labelDisabled: false,
  style: {},
  titleStyle: {},
  isGroup: false,
}

export default function Checkbox(props) {
  const { active, iconSize, icon, iconSelect, color, disabledColor, iconColor, iconSelectColor, disabled, labelDisabled, onChange, onPress, style, titleStyle } = props;
  const [checked, setChecked] = useState(active);

  useEffect(() => {
    setChecked(active);
  }, [active]);

  const checkboxTap = () => {
    if (props.isGroup) {
      onPress();
      return;
    }
    setChecked(!checked);
    onChange && onChange(!checked);
  };
  return (
    <>
      {
        labelDisabled ?
          <View style={[styles.container, style]}>
            <TouchableOpacity activeOpacity={1} onPress={disabled ? () => { } : () => { checkboxTap() }}>
              <Icon
                name={checked ? iconSelect : icon}
                size={iconSize}
                color={disabled ? disabledColor : checked ? iconSelectColor : iconColor}
              ></Icon>
            </TouchableOpacity>
            <Text style={[styles.title, { color: disabled ? disabledColor : color }]}>{props.children}</Text>
          </View> :
          <TouchableOpacity activeOpacity={1} style={[styles.container, style]} onPress={disabled ? () => { } : () => { checkboxTap() }}>
            <Icon
              name={checked ? iconSelect : icon}
              size={iconSize}
              color={disabled ? disabledColor : checked ? iconSelectColor : iconColor}
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