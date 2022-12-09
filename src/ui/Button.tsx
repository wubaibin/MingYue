/**
 * @description: 按钮
 * @author: wubaibin
 */
import { Text, StyleSheet, View, TouchableWithoutFeedback, TouchableHighlight, ActivityIndicator } from "react-native";
import React from "react";
import { Color } from "./utils/config";
import Icon from "./icon";

interface Props {
  // 大小
  size?: Size;
  // 字体大小
  fontSize?: number;
  // 形状
  shape?: Shape;
  // 是否镂空
  plain?: boolean;
  // 是否禁用
  disabled?: boolean;
  // 字体颜色
  color?: string;
  // 背景颜色
  bgColor?: string;
  // 镂空状态下的border颜色
  borderColor?: string;
  // 按钮自定义长度
  width?: number;
  // 按钮自定义宽度
  height?: number;
  // container自定义样式 例如：margin padding
  style?: object;
  // 按钮自定义样式
  btnStyle?: object;
  // 是否包含图标
  icon?: string;
  // 图标大小
  iconSize?: number;
  // 图标颜色
  iconColor?: string;
  // 图标自定义样式
  iconStyle?: object;
  // 是否加载中
  loading?: boolean;
  // 加载图标大小
  loadingSize?: LoadingSize;
  // 加载自定义样式
  loadingStyle?: object;
  children?: any;
  onPress?: () => void;

}
// long 100% 44 16  large 329 44 16 medium 80 32 13 mini 60 28 12
export type Size = "long" | "large" | "medium" | "mini";
// 直角 圆弧 半圆
export type Shape = "square" | "circle" | "semicircle";
export type LoadingSize = "small" | "large";

export default (props: Props) => {
  const {
    size = "medium",
    shape = "semicircle",
    disabled = false,
    style = {},
    onPress = () => { },
  } = props;
  return (
    <View style={[size === "long" ? {} : { flexDirection: 'row' }, style]}>
      {
        disabled ?
          <TouchableWithoutFeedback onPress={() => { onPress() }}>
            <View>
              <ButtonView {...props}></ButtonView>
            </View>
          </TouchableWithoutFeedback> :
          <TouchableHighlight style={[styles[shape]]} onPress={() => { onPress() }}>
            <View>
              <ButtonView {...props}></ButtonView>
            </View>
          </TouchableHighlight>
      }
    </View>
  )
}
const ButtonView = (props: Props) => {
  const {
    size = "medium",
    fontSize,
    shape = "semicircle",
    plain = false,
    disabled = false,
    color = "#fff",
    bgColor = Color.theme,
    borderColor = "#CACACA",
    width,
    height,
    btnStyle = {},
    icon = "",
    iconSize = 12,
    iconColor = "#fff",
    iconStyle = {},
    loading = false,
    loadingSize = "small",
    loadingStyle = {},
    children,
  } = props;
  const childrenType = typeof (children);
  const disabledBgColor = "#EBEBEB";
  const plainBgColor = "#fff";
  const disabledColor = "#CACACA";
  const plainColor = "#454545";
  return (
    <View style={[
      styles.btn,
      styles[size],
      styles[shape],
      { backgroundColor: disabled ? disabledBgColor : plain ? plainBgColor : bgColor },
      { ...plain ? { borderColor, borderWidth: 1 } : {} },
      { ...width ? { minWidth: width } : {} },
      { ...height ? { height: height } : {} },
      { ...btnStyle }
    ]}>
      {
        loading ? <ActivityIndicator size={loadingSize} color={color} style={[styles['marginRight' + size], { ...loadingStyle }]} /> : <></>
      }
      {
        icon ?
          <View style={[styles['marginRight' + size], { ...iconStyle }]}>
            <Icon name={icon} color={iconColor} size={iconSize}></Icon>
          </View> : <></>
      }
      {
        childrenType === 'string' ?
          <Text style={[
            styles['text' + size],
            { ...fontSize ? { fontSize } : {} },
            { color: color !== "#fff" ? color : disabled ? disabledColor : plain ? plainColor : "#fff" },
          ]}>
            {children}
          </Text> :
          <>
            {children}
          </>
      }
    </View>
  )
}
const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  long: {
    width: '100%',
    height: 44,
  },
  textlong: {
    fontSize: 16
  },
  marginRightlong: {
    marginRight: 6
  },
  large: {
    minWidth: 329,
    height: 44,
    paddingHorizontal: 12
  },
  textlarge: {
    fontSize: 16
  },
  marginRightlarge: {
    marginRight: 6
  },
  medium: {
    minWidth: 80,
    height: 32,
    paddingHorizontal: 10
  },
  textmedium: {
    fontSize: 13
  },
  marginRightmedium: {
    marginRight: 6
  },
  mini: {
    minWidth: 60,
    height: 28,
    paddingHorizontal: 10
  },
  textmini: {
    fontSize: 12
  },
  marginRightmini: {
    marginRight: 6
  },
  square: {
    borderRadius: 0
  },
  circle: {
    borderRadius: 8
  },
  semicircle: {
    borderRadius: 25
  }
})
