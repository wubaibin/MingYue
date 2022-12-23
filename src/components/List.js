import { Text, StyleSheet, View, TouchableHighlight } from "react-native";
import React, { useState, useEffect } from "react";
import Icon from '../ui/icon';

export default (props) => {
  const { title, type = 1, onPress } = props;
  const [borderRadius, setBorderRadius] = useState(24);
  const [backgroundColor, setBackgroundColor] = useState("#f7f8fa");
  useEffect(() => {
    setBorderRadius(type === 1 ? 24 : 8);
    setBackgroundColor(type === 1 ? "#f7f8fa" : "#ffffff");
  }, [type])

  return (
    <TouchableHighlight style={{ borderRadius, marginTop: 12 }} onPress={onPress}>
      <View style={[styles.container, { borderRadius, backgroundColor }]}>
        <Text style={styles.title}>{title}</Text>
        <Icon name="arrow" size={16} color="#999"></Icon>
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    height: 48,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#323233',
  }
})
