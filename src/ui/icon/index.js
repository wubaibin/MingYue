/**
 * @description: 图标
 * @author: wubaibin
 */
import { View, Text } from "react-native";
import React from "react";
import PropTypes from 'prop-types';
import { iconNames } from "./name";
import { Color } from "../utils/config";

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  style: PropTypes.object,
}
Icon.defaultProps = {
  size: 16,
  color: Color.theme,
  style: {}
}

export default function Icon(props) {
  const { name, size, color, style } = props;
  return (
    <View style={{ ...style }}>
      <Text style={{ fontFamily: 'iconfont', fontSize: size, color }}>{iconNames[name]}</Text>
    </View>
  )
}