import { StyleSheet, View, ScrollView, Dimensions, Animated, TouchableOpacity } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import SegmentItem from "./SegmentItem";
import { Color } from "./utils/config";

Segment.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.array.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  fontSize: PropTypes.number,
  bgColor: PropTypes.string,
  hasLine: PropTypes.bool,
  lineWidth: PropTypes.number,
  lineHeight: PropTypes.number,
  lineBgColor: PropTypes.string,
  bottom: PropTypes.number,
  duration: PropTypes.number,
  inactiveColor: PropTypes.string,
  activeColor: PropTypes.string,
  inactiveStyle: PropTypes.object,
  activeStyle: PropTypes.object,
  inactiveTilteStyle: PropTypes.object,
  activeTitleStyle: PropTypes.object,
  lineStyle: PropTypes.object,
  style: PropTypes.object,
  containerStyle: PropTypes.object,
}

Segment.defaultProps = {
  bgColor: "#ffffff",
  height: 50,
  fontSize: 13,
  hasLine: true,
  lineWidth: 40,
  lineHeight: 3,
  lineBgColor: Color.theme,
  bottom: 3,
  duration: 500,
  inactiveColor: "#646566",
  activeColor: "#323233",
  inactiveStyle: {},
  activeStyle: {},
  inactiveTilteStyle: {},
  activeTitleStyle: {},
  lineStyle: {},
  style: {},
  containerStyle: {}
}

export default function Segment(props) {
  const { value, width, hasLine, lineWidth, lineHeight, onChange } = props;
  const [list, setList] = useState([]);
  const [listWidth, setlistWidth] = useState(100);
  const [fixedLine, setFixedLine] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef(null);
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    init();
  }, [listWidth, list.length]);

  const init = () => {
    if (!props.children || !props.children.length) {
      return;
    }
    let list = [];
    let listIndex = 0;
    props.children.forEach((item, index) => {
      if (!item.props) {
        return;
      }
      const { name, disabled, ...itemProps } = item.props;
      list.push({
        name,
        disabled: !!disabled,
        active: false,
        props: itemProps,
      });
      if (value && name === value) {
        list[index].active = true;
        listIndex = index;
      }
      if (!value) {
        list[0].active = true;
      }
    })
    setList(list);
    setlistWidth(width ? width : screenWidth / list.length);
    setline(listIndex);
  }

  const listTap = (index, item) => {
    if (item.disabled) {
      onChange && onChange({ name: value[index].name, index });
      return;
    }
    let value = [...list];
    value.map((l, i) => {
      l.active = false;
      if (index === i) {
        l.active = true;
      }
    })
    setList(value);
    setline(index);
    onChange && onChange({ name: value[index].name, index });
  }

  const setline = (index) => {
    const left = ((listWidth - lineWidth) / 2) + listWidth * index;
    const len = list.length;
    const scrollWidth = listWidth * len;
    const diffWidth = scrollWidth > screenWidth ? (screenWidth / 2 - (index + 1) * listWidth + listWidth / 2) : screenWidth - scrollWidth;
    const overflowWidth = scrollWidth - screenWidth;
    let lineMove = 0;
    let scrollMove = 0;
    if (diffWidth > 0) {
      lineMove = left;
      scrollMove = 0;
    } else {
      if (overflowWidth + diffWidth > 0) {
        lineMove = left + diffWidth;
        scrollMove = - diffWidth;
      } else {
        lineMove = screenWidth - listWidth * (len - index) + (listWidth - lineWidth) / 2;
        scrollMove = scrollWidth - screenWidth;
      }
    }
    if (hasLine) {
      setFixedLine(false);
      Animated.timing(fadeAnim, {
        toValue: lineMove,
        duration: props.duration,
        useNativeDriver: false
      }).start();
    }
    const timer = setTimeout(() => {
      scrollRef && scrollRef.current.scrollTo({ x: scrollMove, y: 0, animated: true });
      clearTimeout(timer);
    }, 200);
  }

  return (
    <View style={[styles.container, { height: props.height, backgroundColor: props.bgColor }, props.style]}>
      <ScrollView
        horizontal={true}
        alwaysBounceHorizontal={false}
        showsHorizontalScrollIndicator={false}
        style={{ flex: 1, ...props.containerStyle }}
        ref={scrollRef}
        onScrollBeginDrag={() => { hasLine && setFixedLine(true) }}
      >
        {
          list.map((item, index) => (
            <TouchableOpacity activeOpacity={1} key={index} onPress={() => { listTap(index, item) }}>
              <SegmentItem
                {...item.props}
                active={item.active}
                disabled={item.disabled}
                width={listWidth}
                fontSize={props.fontSize}
                showLine={fixedLine && hasLine}
                inactiveColor={props.inactiveColor}
                activeColor={props.activeColor}
                inactiveStyle={props.inactiveStyle}
                activeStyle={props.activeStyle}
                inactiveTilteStyle={props.inactiveTilteStyle}
                activeTilteStyle={props.activeTilteStyle}
                lineStyle={{
                  ...styles.line,
                  width: lineWidth,
                  height: lineHeight,
                  bottom: props.bottom,
                  backgroundColor: props.lineBgColor,
                  ...props.lineStyle
                }}
              >
                {item.props.children}
              </SegmentItem>
            </TouchableOpacity>
          ))
        }
      </ScrollView>
      {
        !hasLine || fixedLine ? <></> :
          <Animated.View
            style={{
              ...styles.line,
              width: lineWidth,
              height: lineHeight,
              left: fadeAnim,
              bottom: props.bottom,
              backgroundColor: props.lineBgColor,
              ...props.lineStyle
            }}>
          </Animated.View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    position: "relative",
  },
  line: {
    position: "absolute",
    borderRadius: 3,
  }
})
