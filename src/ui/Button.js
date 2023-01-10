/**
 * @description: 按钮
 * @author: wubaibin
 */
import { Text, StyleSheet, View, TouchableWithoutFeedback, TouchableHighlight, ActivityIndicator } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { Color } from "./utils/config";
import Icon from "./icon";

Button.propTypes = {
  size: PropTypes.oneOf(['long', 'large', 'medium', 'mini']),
  fontSize: PropTypes.number,
  shape: PropTypes.oneOf(['square', 'circle', 'semicircle']),
  plain: PropTypes.bool,
  disabled: PropTypes.bool,
  color: PropTypes.string,
  bgColor: PropTypes.string,
  borderColor: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  style: PropTypes.object,
  btnStyle: PropTypes.object,
  icon: PropTypes.string,
  iconSize: PropTypes.number,
  iconColor: PropTypes.string,
  iconStyle: PropTypes.object,
  loading: PropTypes.bool,
  loadingSize: PropTypes.oneOf(['small', 'large']),
  loadingStyle: PropTypes.object,
}
Button.defaultProps = {
  size: "medium",
  shape: "semicircle",
  plain: false,
  disabled: false,
  color: "#ffffff",
  bgColor: Color.theme,
  borderColor: "#CACACA",
  btnStyle: {},
  iconSize: 12,
  iconColor: "#ffffff",
  iconStyle: {},
  loading: false,
  loadingSize: "small",
  loadingStyle: {}
}

export default function Button(props) {
  const { size, shape, disabled, style, onPress } = props;
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
const ButtonView = (props) => {
  const { size, fontSize, shape, plain, disabled, color, bgColor, borderColor, width, height, btnStyle, icon, iconSize, iconColor, iconStyle, loading, loadingSize, loadingStyle, children } = props;
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
            { color: disabled ? disabledColor : plain ? plainColor : color },
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
