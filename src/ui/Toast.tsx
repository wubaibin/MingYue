
import { Text, StyleSheet, View, TouchableOpacity, Modal, ActivityIndicator } from "react-native";
import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import Icon from "./icon";
import StringRegular from "./utils/string";

export interface ShowToast {
  title: string,
  icon?: string,
  duration?: number,
  mask?: boolean,
}
export interface ShowLoading {
  title: string,
  mask?: boolean,
}

export default forwardRef((props: any, ref) => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("");
  const [loading, setLoading] = useState(false);
  const [mask, setMask] = useState(true);
  const backgroundColor = "rgba(0, 0, 0, 0.8)";
  const color = "#ffffff";
  let timer: NodeJS.Timer | null = null;
  useEffect(() => {
    return (): void => {
      timer && clearTimeout(Number(timer));
    }
  }, [])
  useImperativeHandle(ref, (): object => ({
    showToast: (params: ShowToast) => {
      const { title, icon = "", duration = 2000, mask = true } = params;
      setTitle(title);
      setIcon(icon);
      setVisible(true);
      setMask(mask);
      timer = setTimeout((): void => {
        setVisible(false);
        timer && clearTimeout(Number(timer));
      }, duration)
    },
    showLoading: (params: ShowLoading): void => {
      const { title, mask = true } = params;
      setTitle(title);
      setMask(mask);
      setLoading(true);
      setVisible(true);
    },
    hideLoading: (): void => {
      hide();
    },
  }));
  const hide = (): void => {
    setVisible(false);
    setLoading(false);
  }
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <TouchableOpacity
        activeOpacity={1}
        style={{ flex: 1, flexDirection: "column", justifyContent: 'center', alignItems: 'center' }}
        onPress={mask ? () => { } : () => { hide() }}
      >
        {
          loading ?
            <View style={{ ...styles.toastContainer, backgroundColor }}>
              <ActivityIndicator size="large" color={color} />
              <Text style={{ color, fontSize: 14, marginTop: 14 }}>{StringRegular.ellipsis(title, 20)}</Text>
            </View> :
            icon ?
              <View style={{ ...styles.toastContainer, backgroundColor }}>
                <Icon name={icon} size={28} color={color}></Icon>
                <Text style={{ color, fontSize: 13, marginTop: 14 }}>{StringRegular.ellipsis(title, 20)}</Text>
              </View> :
              <View style={{ ...styles.toastMsgContainer, backgroundColor }}>
                <Text style={{ color, fontSize: 13 }}>{StringRegular.ellipsis(title, 20)}</Text>
              </View>
        }
      </TouchableOpacity>
    </Modal>
  )
})

const styles = StyleSheet.create({
  toastContainer: {
    minWidth: 136,
    minHeight: 136,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 12,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  toastMsgContainer: {
    maxWidth: 240,
    padding: 15,
    borderRadius: 5,
  }
})
