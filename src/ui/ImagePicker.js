import { Text, StyleSheet, View, Image, TouchableOpacity, TouchableHighlight, Platform, PermissionsAndroid } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import Popup from "./Popup";

ImagePicker.propTypes = {
  // 图片上传数量
  count: PropTypes.number,
  // 图片剪裁、缩放的模式
  mode: PropTypes.string,
  // 限制图片上传大小
  maxImageSize: PropTypes.number,
  // 上传图片的容器间距
  margin: PropTypes.number,

}

ImagePicker.defaultProps = {
  count: 2,
  mode: "contain",
  maxImageSize: 5,
  margin: 18,
}


export default function ImagePicker(props) {
  const { count, maxImageSize, onChange } = props;

  const [storage, setStorage] = useState(false);
  const [list, setList] = useState([]);
  const typeRef = useRef(null);

  const isAndroid = Platform.OS === "android";
  const insets = useSafeAreaInsets();
  const clearImage = "data:image/png;base64,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";
  const photoImage = "data:image/png;base64,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";

  useEffect(() => {
    if (isAndroid) {
      requestPermissions();
    }
  }, []);
  // 安卓权限获取
  const requestPermissions = async () => {
    try {
      const CAMERA = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: '是否授权相机权限',
          message: '请确认授权，否则无法正常上传图片',
          buttonNegative: '取消',
          buttonPositive: '确定'
        }
      );
      const storage = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      setStorage(storage == PermissionsAndroid.RESULTS.GRANTED);
      if (CAMERA !== PermissionsAndroid.RESULTS.GRANTED) {
        showPermissionsTip();
      }
      return CAMERA;
    } catch (error) {
      return null;
    }
  }

  const showPermissionsTip = () => {
    $dialog.showDialog({
      type: "alert",
      title: "提示",
      content: "请在设置中授权相机权限，否则无法正常上传图片",
    });
  }

  const showType = async () => {
    if (isAndroid) {
      const res = await requestPermissions();
      if (res !== PermissionsAndroid.RESULTS.GRANTED) {
        return;
      }
    }
    typeRef && typeRef.current.show();
  }

  const choseType = (val) => {
    if (val === "cancel") {
      typeRef.current.hidden();
      $toast.showToast({ title: "您取消了上传图片" });
      return
    }
    typeRef.current.hidden();
    getImage(val);
  }

  getImage = async (type) => {
    if (type === "camera") {
      const timer = setTimeout(async () => {
        const result = await launchCamera({
          mediaType: "photo",
          cameraType: "back",
          saveToPhotos: isAndroid ? storage : true,
        });
        clearTimeout(timer);
        if (result.errorCode) {
          if (result.errorCode === "camera_unavailable") {
            $toast.showToast({ title: "相机在设备上不可用" });
            return;
          }
          if (result.errorCode === "permission") {
            showPermissionsTip();
            return;
          }
          return;
        }
        disposeResult(result);
      }, 200);
      return;
    }
    if (type === "image") {
      const result = await launchImageLibrary({
        mediaType: "photo",
      });
      disposeResult(result);
    }
  }

  const disposeResult = (result) => {
    if (result.didCancel) {
      $toast.showToast({ title: "您取消了上传图片" });
      return;
    }
    if (result.assets) {
      const { width, height, fileSize, uri } = result.assets[0];
      if (fileSize >= 1024 * 1024 * maxImageSize) {
        $toast.showToast({ title: `上传图片不能超过${maxImageSize}M` });
        return;
      }
      onChange && onChange([...list, uri]);
      setList([...list, uri]);
    }
  }

  const delImage = (index) => {
    const list = [...list];
    list.splice(index, 1);
    onChange && onChange(list);
    setList(list);
  }

  return (
    <View>
      <View style={styles.container}>
        {
          list.map((item, index) => (
            <View style={[styles.listContainer, { position: "relative", marginLeft: index === 0 ? 0 : 18, }]} key={index}>
              <TouchableOpacity style={{ flex: 1 }} onPress={() => { }}>
                <Image
                  style={{ width: 90, height: 90 }}
                  source={{ uri: item }}
                  resizeMode={props.mode}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.clearContainer} onPress={() => { delImage(index) }}>
                <Image source={{ uri: clearImage }} style={{ width: 20, height: 20 }}></Image>
              </TouchableOpacity>
            </View>
          ))
        }
        {
          list.length < count ?
            <View style={[styles.listContainer, { marginLeft: list.length !== 0 && count >= 2 ? 18 : 0 }]}>
              <TouchableOpacity style={styles.listContent} onPress={showType}>
                <Image source={{ uri: photoImage }} style={{ width: 24, height: 24 }}></Image>
              </TouchableOpacity>
            </View> : <></>
        }
      </View>
      {/* 选择拍照或相册 */}
      <Popup position="bottom" borderRadius={10} insetBottom={false} ref={typeRef}>
        <View style={{ backgroundColor: "#F7F7F7", ...styles.typeBorderRadius }}>
          <TouchableHighlight style={styles.typeBorderRadius} onPress={() => { choseType("camera") }}>
            <View style={[styles.typeList, styles.typeLine, styles.typeBorderRadius]}>
              <Text style={styles.typeText}>拍照</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => { choseType("image") }}>
            <View style={styles.typeList}>
              <Text style={styles.typeText}>从手机相册选择</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={{ marginTop: 6 }} onPress={() => { choseType("cancel") }}>
            <View>
              <View style={styles.typeList}>
                <Text style={styles.typeText}>取消</Text>
              </View>
              <View style={{ height: insets.bottom, backgroundColor: "#ffffff" }}></View>
            </View>
          </TouchableHighlight>
        </View>
      </Popup>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  listContainer: {
    width: 90,
    height: 90,
    borderRadius: 12,
    backgroundColor: "#F4F6F8",
  },
  listContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  typeList: {
    width: "100%",
    height: 52,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  typeText: {
    fontSize: 16,
    color: "#1A1A1A",
    fontWeight: "300",
  },
  typeLine: {
    borderBottomColor: "#E5E5E5",
    borderBottomWidth: 1
  },
  typeBorderRadius: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  clearContainer: {
    position: "absolute",
    right: 4,
    top: 4,
  }
})
