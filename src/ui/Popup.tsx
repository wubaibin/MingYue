import { StyleSheet, View, Modal, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from './icon';

interface Props {
  // 遮罩层背景颜色
  maskBgColor?: string;
  // 展示层背景颜色
  bgColor?: string;
  // 展示层圆角
  borderRadius?: number;
  // 自定义展示层样式
  style?: object;
  // 弹出位置，可选值为 top bottom right left center
  position?: Position;
  // 弹出层是否设定为锁定态
  locked?: boolean;
  zIndex?: number;
  // 是否留出底部安全距离
  insetBottom?: boolean;
  // 是否留出顶部安全距离（状态栏高度）
  insetTop?: boolean;
  // 是否显示关闭图标
  closeable?: boolean;
  // 关闭图标名称
  closeIcon?: string;
  // 自定义关闭图标大小
  closeSize?: number;
  // 自定义关闭图标颜色
  closeColor?: string;
  // 自定义关闭图标位置样式
  closeStyle?: object;
  // 自定义关闭组件
  customClose?: object;
  children?: any;
}
export type AnimationType = "slide" | "fade" | "none";
export type Position = "top" | "bottom" | "right" | "left" | "center";
export default forwardRef((props: Props, ref) => {
  // 是否展示
  const [visible, setVisible] = useState(false);
  const [animationType, setAnimationType] = useState<AnimationType>("fade");
  const [containerStyle, setContainerStyle] = useState<object>({});
  const {
    maskBgColor = "rgba(0, 0, 0, 0.5)",
    bgColor = "#ffffff",
    position = "center",
    borderRadius = 0,
    style = {},
    locked = false,
    zIndex = 66,
    insetBottom = true,
    insetTop = true,
    closeable = false,
    closeIcon = "close",
    closeSize = 20,
    closeColor = "#999",
    closeStyle = {},
    customClose,
    children,
  } = props;
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const insets = useSafeAreaInsets();
  useEffect(() => {
    setAnimationType(position === "bottom" ? "slide" : "fade");
    const map = [
      [
        () => position === "bottom",
        () => setContainerStyle({ width, borderTopLeftRadius: borderRadius, borderTopRightRadius: borderRadius, paddingBottom: insetBottom ? insets.bottom : 0 })
      ],
      [
        () => position === "top",
        () => setContainerStyle({ width, borderBottomLeftRadius: borderRadius, borderBottomRightRadius: borderRadius, paddingTop: insetTop ? insets.top : 0 })
      ],
      [
        () => position === "left" || position === "right",
        () => setContainerStyle({ height, paddingTop: insetTop ? insets.top : 0, paddingBottom: insetBottom ? insets.bottom : 0 })
      ],
      [
        () => position === "center",
        () => setContainerStyle({ borderRadius })
      ]
    ]
    const target = map.find(m => m[0]());
    if (target) {
      target[1]();
    }
    return () => {
      setVisible(false);
    }
  }, [position, borderRadius]);
  useImperativeHandle(ref, () => ({
    show: () => {
      setVisible(true);
    },
    hidden: () => {
      setVisible(false);
    }
  }));
  return (
    <Modal style={{ position: 'relative' }} visible={visible} transparent={true} animationType={animationType}>
      <TouchableOpacity
        activeOpacity={1}
        style={{ flex: 1, backgroundColor: maskBgColor, ...styles[position] }}
        onPress={!locked ? () => { setVisible(false) } : () => { }}>
        <TouchableOpacity activeOpacity={1}>
          <View style={{ position: "relative", ...containerStyle, backgroundColor: bgColor, zIndex, elevation: zIndex, ...style }}>
            {children}
            {
              closeable && (position === "bottom" || position === "top") ?
                <TouchableOpacity style={[styles.closeContainer, { [position === "bottom" ? "top" : "bottom"]: 16 }, closeStyle]} onPress={() => { setVisible(false) }}>
                  {
                    !customClose ? <Icon name={closeIcon} size={closeSize} color={closeColor}></Icon> : <>{customClose}</>
                  }
                </TouchableOpacity> : <></>
            }
          </View>
        </TouchableOpacity>
      </TouchableOpacity >
    </Modal >
  )
})
const styles = StyleSheet.create({
  top: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  bottom: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  center: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  left: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  right: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  closeContainer: {
    position: "absolute",
    right: 16,
  }
})
