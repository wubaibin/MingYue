import { Text, StyleSheet, View } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import NavBar from '../ui/NavBar';
import { Title } from '../style';
import List from '../components/List';
import Dialog from '../ui/Dialog';

export default (props) => {
  const { title } = props.route.params;
  const dialog = useRef(null);
  const [type, setType] = useState('confirm');
  const handleList = (type) => {
    setType(type);
    dialog.current.show();
  };
  const handleFunShow = () => {
    $dialog.showDialog({
      type: "alert",
      title: "提示",
      content: "这是一个通过全局方法展示",
      success(res) {
        console.log(res);
      },
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f7f8fa' }}>
      <NavBar title={title} />
      <View style={{ paddingHorizontal: 18 }}>
        <Text style={Title}>基础用法</Text>
        <List type={2} title="展示提示框" onPress={() => { handleList('alert') }} />
        <List type={2} title="展示确认框" onPress={() => { handleList('confirm') }} />
        <List type={2} title="通过全局方法展示" onPress={handleFunShow} />
      </View>
      <Dialog ref={dialog} type={type} content="这个是提示框" />
    </View>
  );
};
