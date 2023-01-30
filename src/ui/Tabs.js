import { Text, StyleSheet, View, ScrollView, Dimensions, Animated, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Tab from "./Tab";
import { Color } from "./utils/config";

Tabs.propTypes = {
  // 默认选中
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.array.isRequired,
  screenWidth: PropTypes.number,
  // tab 宽度
  tabWidth: PropTypes.number,
  // tab 高度
  tabHeight: PropTypes.number,
  // 头部背景颜色
  bgColor: PropTypes.string,
  // 是否展示line
  showLine: PropTypes.bool,
  // 自定义line
  line: PropTypes.object,
  // 是否使用动画切换装饰线
  animatedLine: PropTypes.bool,
  // 是否开启切换标签内容时的转场动画
  animated: PropTypes.bool,
  // 是否开启手势滑动切换
  swipeable: PropTypes.bool,
  // 设置激活状态标签的文本和图标颜色
  activeColor: PropTypes.string,
  // 设置未激活状态标签的文本和颜色
  inactiveColor: PropTypes.string,
  // 设置禁用状态标签的文本和颜色
  disabledColor: PropTypes.string,
  // 动画时间，单位毫秒
  duration: PropTypes.number,
  iconStyle: PropTypes.object,
  tabStyle: PropTypes.object,
  activeTabStyle: PropTypes.object,
  inactiveTabStyle: PropTypes.object,
  disabledTabStyle: PropTypes.object,
  activeTitleStyle: PropTypes.object,
  inactiveTitleStyle: PropTypes.object,
  disabledTitleStyle: PropTypes.object,
  style: PropTypes.object,
}

Tabs.defaultProps = {
  screenWidth: Dimensions.get('window').width,
  tabHeight: 50,
  bgColor: "#ffffff",
  showLine: true,
  animatedLine: true,
  animated: true,
  swipeable: true,
  activeColor: "#323233",
  inactiveColor: "#646566",
  disabledColor: "#c8c9cc",
  duration: 500,
  tabStyle: {},
  inactiveTabStyle: {},
  activeTabStyle: {},
  inactiveTitleStyle: {},
  activeTitleStyle: {},
  style: {},
}

export default function Tabs(props) {
  const { value, screenWidth, tabWidth, animatedLine, showLine, onChange } = props;
  const [list, setList] = useState([]);
  const [listWidth, setlistWidth] = useState(100);
  const [lineWidth, setLineWidth] = useState(null);
  const [lineBottom, setLineBottom] = useState(3);
  const [hasContent, setHasContent] = useState(false);
  const [fixedLine, setFixedLine] = useState(false); // 滚动的时候需要固定line
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    init();
  }, [listWidth, list.length, lineWidth]);

  const init = () => {
    if (!props.children || !props.children.length) {
      return;
    }
    let list = [];
    let listIndex = 0;
    let hasContent = false;
    props.children.forEach((item, index) => {
      if (!item.props) {
        return;
      }
      const { name, title, disabled, children, ...itemProps } = item.props;
      hasContent = !!children;
      list.push({
        name,
        title,
        disabled: !!disabled,
        children,
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
    });
    setHasContent(hasContent);
    setList(list);
    setlistWidth(tabWidth ? tabWidth : screenWidth / list.length);
    moveLine(listIndex);
    hasContent && moveContent(listIndex);
  }

  const Line = () => {
    const onLayout = ({ nativeEvent: { layout: { x, y, width, height } } }) => {
      if (!lineWidth) {
        setLineWidth(width);
      }
    }
    if (props.line) {
      setLineBottom(!props.line.props.style.bottom ? 3 : props.line.props.style.bottom)
      return (
        <View onLayout={onLayout}>{props.line}</View>
      )
    }
    return (
      <View style={styles.line} onLayout={onLayout}></View>
    )
  }

  const moveLine = (index) => {
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
    if (showLine) {
      setFixedLine(false);
      Animated.timing(fadeAnim, {
        toValue: lineMove,
        duration: props.duration,
        useNativeDriver: false
      }).start();
    }
    const timer = setTimeout(() => {
      titleRef && titleRef.current.scrollTo({ x: scrollMove, y: 0, animated: true });
      clearTimeout(timer);
    }, 200);
  }

  const listTap = (index) => {
    changeList("title", index);
  }

  const changeList = (type, index) => {
    if (list[index].disabled) {
      if (type === "content") {
        const index = list.findIndex(val => val.active);
        moveContent(index);
      }
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
    moveLine(index);
    type === "title" && moveContent(index);
    onChange && onChange({ name: value[index].name, index });
  }

  const moveContent = (index) => {
    if (!hasContent) {
      return;
    }
    const timer = setTimeout(() => {
      contentRef && contentRef.current.scrollTo({ x: screenWidth * index, y: 0, animated: props.animated });
      clearTimeout(timer);
    }, 200);
  }

  const _onMomentumScrollEnd = ({ nativeEvent: { contentOffset: { x } } }) => {
    const index = x < 0 ? 0 : Math.round(x / screenWidth);
    changeList("content", index);
  }

  return (
    <View style={props.style}>
      <View style={[styles.titleContainer, { height: props.tabHeight }]}>
        <ScrollView
          horizontal={true}
          alwaysBounceHorizontal={false}
          showsHorizontalScrollIndicator={false}
          onScrollBeginDrag={() => { showLine && setFixedLine(true) }}
          style={[{ backgroundColor: props.bgColor }, props.tabStyle]}
          ref={titleRef}
        >
          {
            list.map((item, index) => (
              <TouchableOpacity activeOpacity={1} key={index} onPress={() => { listTap(index) }}>
                <Tab
                  title={item.title}
                  width={listWidth}
                  disabled={item.disabled}
                  active={item.active}
                  line={<Line width={lineWidth} bottom={lineBottom}></Line>}
                  animated={animatedLine}
                  showLine={showLine}
                  fixedLine={fixedLine}
                  activeColor={props.activeColor}
                  inactiveColor={props.inactiveColor}
                  disabledColor={props.disabledColor}
                  iconStyle={props.iconStyle}
                  activeStyle={props.activeTabStyle}
                  inactiveStyle={props.inactiveTabStyle}
                  disabledStyle={props.disabledTabStyle}
                  activeTitleStyle={props.activeTitleStyle}
                  inactiveTitleStyle={props.inactiveTitleStyle}
                  disabledTitleStyle={props.disabledTitleStyle}
                  {...item.props}
                >
                </Tab>
              </TouchableOpacity>
            ))
          }
        </ScrollView>
        {
          animatedLine && showLine && !fixedLine ?
            <Animated.View style={{ position: "absolute", bottom: lineBottom, left: fadeAnim }}>
              <Line></Line>
            </Animated.View> : <></>
        }
      </View>
      {
        hasContent ?
          <ScrollView
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={props.swipeable}
            onMomentumScrollEnd={_onMomentumScrollEnd}
            ref={contentRef}
          >
            {
              list.map((item, index) => (
                <View style={{ flex: 1, width: screenWidth }} key={index}>
                  {item.children}
                </View>
              ))
            }
          </ScrollView> : <></>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    position: "relative",
  },
  line: {
    width: 40,
    height: 3,
    borderRadius: 3,
    backgroundColor: Color.theme,
  }
})
