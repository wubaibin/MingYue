/*
 * @Description: 模态框
 * @Version: 1.0.0
 * @Autor: wubaibin
 * @Date: 2022-12-10 10:32:30
 * @LastEditors: wubaibin
 * @LastEditTime: 2022-12-24 09:16:10
 */
import { Text, StyleSheet, View, Modal, TouchableHighlight } from 'react-native';
import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { Color } from './utils/config';

export interface Props {
  type?: Type;
  showTitle?: boolean;
  title?: string;
  content?: string;
  contentColor?: string;
  cancelText?: string;
  cancelColor?: string;
  confirmText?: string;
  confirmColor?: string;
  children?: any;
  onCancel?: (value: boolean) => {};
  onConfirm?: (value: boolean) => {};
}
export interface ShowDialog {
  type?: Type;
  showTitle?: boolean;
  title?: string;
  content?: string;
  contentColor?: string;
  cancelText?: string;
  cancelColor?: string;
  confirmText?: string;
  confirmColor?: string;
  success?: any;
}
export interface Success {
  confirm?: boolean;
  cancel?: boolean;
}

export type Type = 'alert' | 'confirm';

export default forwardRef((props: Props, ref) => {
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState<Type>('confirm');
  const [title, setTitle] = useState<string>('');
  const [showTitle, setShowTitle] = useState(true);
  const [content, setContent] = useState<string>('');
  const [contentColor, setContentColor] = useState<string>('');
  const [cancelText, setCancelText] = useState<string>('');
  const [cancelColor, setCancelColor] = useState<string>('');
  const [confirmText, setConfirmText] = useState<string>('');
  const [confirmColor, setConfirmColor] = useState<string>('');
  const [success, setSuccess] = useState<any>(null);
  useEffect(() => {
    const {
      type = 'confirm',
      showTitle = true,
      title = '提示',
      content = '',
      contentColor = '#454545',
      cancelText = '取消',
      cancelColor = '#454545',
      confirmText = '确认',
      confirmColor = Color.theme,
    } = props;
    setType(type);
    setTitle(title);
    setShowTitle(showTitle);
    setContent(content);
    setContentColor(contentColor);
    setCancelText(cancelText);
    setCancelColor(cancelColor);
    setConfirmText(confirmText);
    setConfirmColor(confirmColor);
  }, [props]);
  useImperativeHandle(ref, () => ({
    show: () => {
      setVisible(true);
    },
    hidden: () => {
      setVisible(false);
    },
    showDialog: (t: ShowDialog) => {
      const {
        type = 'confirm',
        title = '提示',
        content = '',
        confirmText = '确认',
        contentColor = '#454545',
        cancelColor = '#454545',
        cancelText = '取消',
        confirmColor = Color.theme,
        success = null,
      } = t;
      console.log(success);
      setVisible(true);
      setType(type);
      setTitle(title);
      setContent(content);
      setContentColor(contentColor);
      setCancelText(cancelText);
      setCancelColor(cancelColor);
      setConfirmText(confirmText);
      setConfirmColor(confirmColor);
      setSuccess(success);
    },
  }));
  const cancelTap = () => {
    success &&
      success({
        confirm: !1,
        cancel: !0,
      });
    if (!props.onCancel) {
      setVisible(false);
      return;
    }
    props.onCancel(true);
  };
  const confirmTap = () => {
    success &&
      success({
        confirm: !0,
        cancel: !1,
      });
    if (!props.onConfirm) {
      setVisible(false);
      return;
    }
    props.onConfirm(true);
  };
  const width = 320;
  const btnHeight = 50;
  const bgColor = '#ffffff';
  const maskBgColor = 'rgba(0, 0, 0, 0.5)';
  const radius = 8;
  return (
    <Modal
      visible={visible}
      transparent={true}
      presentationStyle="overFullScreen"
      animationType="fade">
      <View style={[styles.maskContainer, { backgroundColor: maskBgColor }]}>
        <View style={{ width, borderRadius: radius, backgroundColor: bgColor }}>
          {showTitle && title ? (
            <Text style={styles.title}>{title}</Text>
          ) : (
            <></>
          )}
          <View style={styles.content}>
            {content ? (
              <Text style={[styles.contentText, { color: contentColor }]}>
                {content}
              </Text>
            ) : (
              <></>
            )}
            {props.children}
          </View>
          <View style={styles.line} />
          <View style={[styles.btnContainer, { height: btnHeight }]}>
            {type === 'alert' ? (
              <></>
            ) : (
              <>
                <TouchableHighlight
                  style={{
                    flex: 1,
                    width: width / 2 - 1,
                    height: btnHeight,
                    backgroundColor: bgColor,
                    borderBottomLeftRadius: radius,
                  }}
                  onPress={cancelTap}>
                  <View
                    style={[
                      styles.cancel,
                      {
                        backgroundColor: bgColor,
                        borderBottomLeftRadius: radius,
                      },
                    ]}>
                    <Text style={[{ color: cancelColor, fontSize: 16 }]}>
                      {cancelText}
                    </Text>
                  </View>
                </TouchableHighlight>
                <View style={[styles.cancelLine, { height: btnHeight }]} />
              </>
            )}
            <TouchableHighlight
              style={[
                styles.confirm,
                type === 'alert'
                  ? { borderBottomLeftRadius: radius }
                  : { borderBottomRightRadius: radius },
              ]}
              onPress={confirmTap}>
              <View
                style={[
                  styles.confirm,
                  {
                    height: btnHeight,
                    backgroundColor: bgColor,
                    borderBottomRightRadius: radius,
                  },
                  type === 'alert' ? { borderBottomLeftRadius: radius } : {},
                ]}>
                <Text
                  style={{
                    color: confirmColor,
                    fontWeight: '600',
                    fontSize: 16,
                  }}>
                  {confirmText}
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  );
});

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
    color: '#2c3248',
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
