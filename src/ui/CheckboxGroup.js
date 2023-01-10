/**
 * @description: 复选框组
 * @author: wubaibin
 */
import { View } from "react-native";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Checkbox from "./Checkbox";

CheckboxGroup.propTypes = {
  value: PropTypes.array.isRequired,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  direction: PropTypes.oneOf(["horizontal", "vertical"]),
  max: PropTypes.number,
  min: PropTypes.number,
  style: PropTypes.object,
}
CheckboxGroup.defaultProps = {
  direction: "vertical",
  max: 0,
  min: 0,
  style: {}
}

export default function CheckboxGroup(props) {
  const [list, setList] = useState([]);
  const { direction, style, children, value, min, max, onChange } = props;

  useEffect(() => {
    init();
  }, [children]);

  const init = () => {
    if (!children.length) {
      return;
    }
    let list = [];
    children.forEach((item, index) => {
      list.push({
        title: item.props.children,
        name: item.props.name,
        active: false,
        props: item.props,
      });
      value.forEach(l => {
        if (item.props.name === l) {
          list[index].active = true
        }
      })
    });
    setList(list);
  };

  const listTap = (item, index) => {
    if (!children.length) {
      onChange && onChange([{ name: item.name, active: item.active }]);
      return;
    }
    let val = [...list];
    val[index].active = !item.active;
    const len = val.filter(item => item.active).length;
    if (len > max && max !== 0) {
      val[index].active = false;
    }
    if (len < min && min !== 0) {
      val[index].active = true;
    }
    setList(val);
    onChange && onChange(disposeValue(val));
  };

  const disposeValue = (val) => {
    let result = [];
    val.forEach(item => {
      if (item.active) {
        result.push({ active: item.active, name: item.name });
      }
    })
    return result;
  }

  return (
    <View style={[direction === "horizontal" ? { flexDirection: "row" } : { flexDirection: "column" }, style]}>
      {
        !children ? <></> :
          !children.length ?
            <Checkbox {...children.props} active={!children.props.name ? false : children.props.name === value} onChange={(e) => { listTap({ ...children.props, active: e }, 0) }}>
              {children.props.children}
            </Checkbox> :
            list.map((item, index) => (
              <View style={index === 0 ? {} : direction === "horizontal" ? { marginLeft: 24 } : { marginTop: 12 }} key={index}>
                <Checkbox {...item.props} active={item.active} isGroup onPress={() => { listTap(item, index) }}>
                  {item.title}
                </Checkbox>
              </View>
            ))
      }
    </View>
  )
}
