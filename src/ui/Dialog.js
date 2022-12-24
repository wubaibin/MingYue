import { Text, StyleSheet, View, Modal, TouchableHighlight, TouchableOpacity } from "react-native";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Color } from "./utils/config";

export default class Dialog extends Component {
  static propTypes = {
    type: PropTypes.oneOf(["alert", "confirm"]),
    locked: PropTypes.bool,
    showTitle: PropTypes.bool,
    title: PropTypes.string,
    titleColor: PropTypes.string,
    content: PropTypes.string,
    contentColor: PropTypes.string,
    cancelText: PropTypes.string,
    cancelColor: PropTypes.string,
    confirmText: PropTypes.string,
    confirmColor: PropTypes.string,
  }
  static defaultProps = {
    type: "alert",
    locked: true,
    showTitle: true,
    title: "提示",
    titleColor: "#2c3248",
    content: "",
    contentColor: "#454545",
    cancelText: "取消",
    cancelColor: "#454545",
    confirmText: "确认",
    confirmColor: Color.theme,
  }
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      locked: props.locked,
      type: props.type,
      title: props.title,
      titleColor: props.titleColor,
      content: props.content,
      contentColor: props.contentColor,
      cancelText: props.cancelText,
      cancelColor: props.cancelColor,
      confirmText: props.confirmText,
      confirmColor: props.confirmColor,
      success: null,
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(this.props) !== JSON.stringify(prevProps)) {
      this.setState({
        type: this.props.type,
        locked: this.props.locked,
        title: this.props.title,
        titleColor: this.props.titleColor,
        content: this.props.content,
        confirmText: this.props.confirmText,
        cancelColor: this.props.cancelColor,
        cancelText: this.props.cancelText,
        confirmColor: this.props.confirmColor,
        contentColor: this.props.contentColor,
      })
    }
  }
  // 弹窗开放函数
  showDialog = (t) => {
    const {
      locked = true,
      type = "confirm",
      title = "提示",
      titleColor = "#2c3248",
      content = "",
      confirmText = "确认",
      contentColor = "#454545",
      cancelColor = "#454545",
      cancelText = "取消",
      confirmColor = Color.theme,
      success = null,
    } = t;
    this.setState({
      visible: true,
      locked,
      type,
      title,
      titleColor,
      content,
      confirmText,
      cancelColor,
      cancelText,
      confirmColor,
      contentColor,
      success
    })
  }
  show = () => {
    this.setState({
      visible: true,
    })
  }
  hidden = () => {
    this.setState({
      visible: false,
    })
  }
  onCancel = () => {
    const {
      success: t
    } = this.state
    t && t({
      confirm: !1,
      cancel: !0,
      errMsg: "showDialog: success"
    })
    if (!this.props.onCancel) {
      this.hidden()
      return
    }
    this.props.onCancel(true)
  }
  onConfirm = () => {
    const {
      success: t
    } = this.state
    t && t({
      confirm: !0,
      cancel: !1,
      errMsg: "showDialog: success"
    })
    if (!this.props.onConfirm) {
      this.hidden()
      return
    }
    this.props.onConfirm(true)
  }
  render() {
    const { showTitle } = this.props;
    const { visible, title, titleColor, type, content, contentColor, cancelText, cancelColor, confirmText, confirmColor, locked } = this.state
    const width = 320;
    const btnHeight = 50;
    const bgColor = '#ffffff';
    const maskBgColor = 'rgba(0, 0, 0, 0.5)';
    const radius = 8;
    const contentType = typeof (content);
    return (
      <Modal visible={visible} transparent={true} presentationStyle="overFullScreen" animationType="fade">
        <TouchableOpacity activeOpacity={1} style={[styles.maskContainer, { backgroundColor: maskBgColor }]} onPress={locked ? () => { } : this.hidden()}>
          <View style={{ width, borderRadius: radius, backgroundColor: bgColor }}>
            {showTitle && title ? <Text style={[styles.title, { color: titleColor }]}>{title}</Text> : <></>
            }
            <View style={styles.content}>
              {
                !content ? <></> :
                  contentType === "string" ?
                    <Text style={[styles.contentText, { color: contentColor }]}>{content}</Text> :
                    <>{content}</>
              }
              {this.props.children}
            </View>
            <View style={styles.line} />
            <View style={[styles.btnContainer, { height: btnHeight }]}>
              {
                type === 'alert' ? <></> :
                  <>
                    <TouchableHighlight
                      style={{ flex: 1, width: width / 2 - 1, height: btnHeight, backgroundColor: bgColor, borderBottomLeftRadius: radius }}
                      onPress={this.onCancel}
                    >
                      <View style={[styles.cancel, { backgroundColor: bgColor, borderBottomLeftRadius: radius }]}>
                        <Text style={[{ color: cancelColor, fontSize: 16 }]}>{cancelText}</Text>
                      </View>
                    </TouchableHighlight>
                    <View style={[styles.cancelLine, { height: btnHeight }]} />
                  </>
              }
              <TouchableHighlight
                style={[
                  styles.confirm,
                  type === 'alert' ? { borderBottomLeftRadius: radius } : { borderBottomRightRadius: radius }
                ]}
                onPress={this.onConfirm}
              >
                <View
                  style={[
                    styles.confirm,
                    { height: btnHeight, backgroundColor: bgColor, borderBottomRightRadius: radius },
                    type === 'alert' ? { borderBottomLeftRadius: radius } : {}
                  ]}>
                  <Text style={{ color: confirmColor, fontWeight: '600', fontSize: 16 }}>
                    {confirmText}
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  maskContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
    marginTop: 25,
    paddingHorizontal: 32,
    textAlign: 'center',
  },
  content: {
    paddingTop: 25,
    paddingBottom: 33,
    paddingHorizontal: 32,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#f3f3f3',
  },
  btnContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cancel: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelLine: {
    width: 1,
    backgroundColor: '#f3f3f3',
  },
  confirm: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});