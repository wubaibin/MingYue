/**
 * @description: 弹出层
 * @author: wubaibin
 */
import { StyleSheet, View, Modal, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import PropTypes from "prop-types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from './icon';

const Popup = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(props.show);
  const [animationType, setAnimationType] = useState("fade");
  const [containerStyle, setContainerStyle] = useState({});
  const { maskBgColor, bgColor, position, borderRadius, style, locked, insetBottom, insetTop, closeable, closeIcon, closeSize, closeColor, closeStyle, customClose, children } = props;
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
  }, [props.position, props.borderRadius]);
  useEffect(() => {
    setVisible(props.show);
  }, [props.show])
  useImperativeHandle(ref, () => ({
    show: () => {
      setVisible(true);
    },
    hidden: () => {
      setVisible(false);
    }
  }));
  const onBgTap = () => {
    if (locked) {
      props.onBgTap && props.onBgTap("bg");
      return;
    }
    props.onBgTap && props.onBgTap("bg");
    setVisible(false);
  }
  return (
    <Modal style={{ position: 'relative' }} visible={visible} transparent={true} animationType={animationType}>
      <TouchableOpacity
        activeOpacity={1}
        style={{ flex: 1, backgroundColor: maskBgColor, ...styles[position] }}
        onPress={onBgTap}>
        <TouchableOpacity activeOpacity={1}>
          <View style={{ position: "relative", ...containerStyle, backgroundColor: bgColor, ...style }}>
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
      </TouchableOpacity>
    </Modal>
  )
})
export default Popup;

Popup.propTypes = {
  show: PropTypes.bool,
  // 遮罩层背景颜色
  maskBgColor: PropTypes.string,
  // 展示层背景颜色
  bgColor: PropTypes.string,
  // 展示层圆角
  borderRadius: PropTypes.number,
  // 自定义展示层样式
  style: PropTypes.object,
  // 弹出位置，可选值为 top bottom right left center
  position: PropTypes.oneOf(['top', 'bottom', 'right', 'left', 'center']),
  animationType: PropTypes.oneOf(['slide', 'fade', 'none']),
  // 弹出层是否设定为锁定态
  locked: PropTypes.bool,
  // 是否留出底部安全距离
  insetBottom: PropTypes.bool,
  // 是否留出顶部安全距离（状态栏高度）
  insetTop: PropTypes.bool,
  // 是否显示关闭图标
  closeable: PropTypes.bool,
  // 关闭图标名称
  closeIcon: PropTypes.string,
  // 自定义关闭图标大小
  closeSize: PropTypes.number,
  // 自定义关闭图标颜色
  closeColor: PropTypes.string,
  // 自定义关闭图标位置样式
  closeStyle: PropTypes.object,
  // 自定义关闭组件
  customClose: PropTypes.object,
}
Popup.defaultProps = {
  show: false,
  maskBgColor: "rgba(0, 0, 0, 0.5)",
  bgColor: "#ffffff",
  position: "center",
  borderRadius: 0,
  style: {},
  locked: false,
  insetBottom: true,
  insetTop: true,
  closeable: false,
  closeIcon: "close",
  closeSize: 20,
  closeColor: "#999",
  closeStyle: {},
}

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
