/**
 * @description: 图标
 * @author: wubaibin
 */
import { View, Text } from "react-native";
import React from "react";
import { iconNames } from "./name";
import { Color } from "../utils/config";

interface Props {
  name: string;
  size?: number;
  color?: string;
  style?: object;
}
export default (props: Props) => {
  const { name, size = 10, color = Color.theme, style = {} } = props;
  return (
    <View style={{ ...style  }}>
      <Text style={{ fontFamily: 'iconfont', fontSize: size, color }}>{iconNames[name]}</Text>
    </View>
  )
}