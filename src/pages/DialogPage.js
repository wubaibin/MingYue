import { Text, StyleSheet, View, Image } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import NavBar from "../ui/NavBar";
import { Title } from "../style";
import List from "../components/List";
import Dialog from "../ui/Dialog";

export default (props) => {
  const { title } = props.route.params;
  const dialog = useRef(null);
  const [show, setShow] = useState(false);
  const [type, setType] = useState("confirm");
  const [showTitle, setShowTitle] = useState(true);
  const handleList = (type, showTitle) => {
    setType(type);
    setShowTitle(!showTitle);
    setShow(true)
    // dialog.current.show();
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
  const handleFunShow2 = () => {
    $dialog.showDialog({
      type: "confirm",
      title: "提示",
      content: "这是一个通过全局方法展示",
      confirmText: "yes",
      cancelText: "no",
      confirmColor: "#f60",
      cancelColor: "#999",
      success(res) {
        console.log(res);
      },
    });
  };
  const handleFunShow3 = () => {
    $dialog.showDialog({
      type: "alert",
      title: "提示",
      content: (
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Image source={require("../assets/images/pic.png")} style={{ width: 40, height: 40 }}></Image>
        </View>
      ),
      success(res) {
        console.log(res);
      },
    });
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#f7f8fa' }}>
      <NavBar title={title} />
      <View style={{ paddingHorizontal: 18 }}>
        <Text style={Title}>基础用法</Text>
        <List type={2} title="展示提示框" onPress={() => { handleList("alert") }} />
        <List type={2} title="展示确认框" onPress={() => { handleList("confirm") }} />
        <List type={2} title="无标题的模态弹框" onPress={() => { handleList("confirm", true) }} />
        <List type={2} title="通过全局方法展示" onPress={handleFunShow} />
        <List type={2} title="修改按钮文字和颜色" onPress={handleFunShow2} />
        <List type={2} title="设置子节点" onPress={handleFunShow3} />
      </View>
      <Dialog ref={dialog} show={show} type={type} showTitle={showTitle} content={type === "alert" ? "这个是提示框" : "这个是确认框"} />
    </View>
  );
};
