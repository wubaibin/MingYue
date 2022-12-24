/*
 * @Description: 
 * @Version: 1.0.0
 * @Autor: wubaibin
 * @Date: 2022-12-10 10:30:13
 * @LastEditors: wubaibin
 * @LastEditTime: 2022-12-24 09:16:56
 */
import {Text, StyleSheet, View} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import NavBar from '../ui/NavBar';
import {Title} from '../style';
import List from '../components/List';
import Dialog, {Type} from '../ui/Dialog';
import {$dialog, $toast} from '../ui/utils/global';

export default (props: any) => {
  const {title} = props.route.params;
  const dialog = useRef<any>(null);
  const [type, setType] = useState<Type>('confirm');
  useEffect(() => {
    $dialog.current = dialog.current;
  });
  const handleList = (type: Type) => {
    setType(type);
    dialog.current.show();
  };

  return (
    <View style={{flex: 1, backgroundColor: '#f7f8fa'}}>
      <NavBar title={title} />
      <View style={{paddingHorizontal: 18}}>
        <Text style={Title}>基础用法</Text>
        <List
          type={2}
          title="展示提示框"
          onPress={() => {
            handleList('alert');
          }}
        />
        <List
          type={2}
          title="展示确认框"
          onPress={() => {
            handleList('confirm');
          }}
        />
      </View>
      <Dialog ref={dialog} type={type} content="这个是提示框" />
    </View>
  );
};
