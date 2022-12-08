/*
 * @Description: 首页list
 * @Version: 1.0.0
 * @Autor: wubaibin
 * @Date: 2022-12-07 16:56:34
 * @LastEditors: wubaibin
 * @LastEditTime: 2022-12-07 17:38:44
 */
import { Text, StyleSheet, View, TouchableHighlight } from "react-native";
import React, { useState, useEffect } from "react";
import Icon from '../ui/icon';

interface Props {
  title: string;
  onPress?: () => void;
}

export default (props: Props) => {
  const { title, onPress } = props;
  return (
    <TouchableHighlight style={{ borderRadius: 24, marginTop: 12 }} onPress={onPress}>
      <View style={styles.container}>
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
    borderRadius: 24,
    backgroundColor: '#f7f8fa'
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#323233',
  }
})
