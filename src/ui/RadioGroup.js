/**
 * @description: 单选框组
 * @author: wubaibin
 */
import { View } from "react-native";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Radio from "./Radio";

RadioGroup.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  children: PropTypes.array.isRequired,
  direction: PropTypes.oneOf(["horizontal", "vertical"]),
  style: PropTypes.object,
}
RadioGroup.defaultProps = {
  direction: "horizontal",
  style: {}
}

export default function RadioGroup(props) {
  const { children, value, direction, style, onChange } = props;
  const [list, setList] = useState([]);

  useEffect(() => {
    let list = [];
    children.forEach((item, index) => {
      list.push({
        title: item.props.children,
        name: item.props.name,
        active: false,
        props: item.props
      });
      if (!value) {
        list[0].active = true;
      }
      if (value && item.props.name === value) {
        list[index].active = true;
      }
    });
    setList(list);
  }, []);

  const listTap = (item, index) => {
    onChange && onChange({ name: item.name, index });
    if (item.active) {
      return;
    }
    list.map((m, n) => {
      m.active = false;
      if (index === n) {
        m.active = true;
      }
    });
    setList([...list]);
  }

  return (
    <View style={[direction === "horizontal" ? { flexDirection: "row" } : { flexDirection: "column" }, style]}>
      {
        !children ? <></> :
          list.map((item, index) => (
            <View style={index === 0 ? {} : direction === "horizontal" ? { marginLeft: 24 } : { marginTop: 12 }} key={index}>
              <Radio {...item.props} active={item.active} onPress={() => { listTap(item, index) }}>
                {item.title}
              </Radio>
            </View>
          ))
      }
    </View>
  )
}
