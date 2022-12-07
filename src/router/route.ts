/*
 * @Description: 路由跳转
 * @Version: 1.0.0
 * @Autor: wubaibin
 * @Date: 2022-02-23 18:27:19
 * @LastEditors: wubaibin
 * @LastEditTime: 2022-12-06 17:53:50
 */
import { StackActions } from '@react-navigation/native'

export default class Route {
  static navigation: any
  // navigation: undefined, //fix Non-serializable values were found in the navigation state. Check:
  /**
   * @description: 保留当前页面，跳转到应用内的某个页面
   * @param {string} page
   * @param {object} params
   */
  static navigate(page: string, params: object) {
    this.navigation && this.navigation.navigate(page, { ...params })
  }
  /**
   * @description: 保留当前页面，跳转到应用内的某个页面 可以多次跳转同一个路由页面用于detail页面
   * @param {string} page
   * @param {object} params
   */
  static push(page: string, params: object) {
    this.navigation && this.navigation.push(page, { ...params })
  }

  /**
   * @description: 导航到选项卡导航器中的现有屏幕
   * @param {string} page
   * @param {object} params
   */
  static jumpTo(page: string, params: object) {
    this.navigation && this.navigation.jumpTo(page, { ...params })
  }
  /**
   * @description: 关闭当前页面，跳转到应用内的某个页面
   * @param {string} page
   */
  static dispatch(page: string = 'HomePage') {
    this.navigation && this.navigation.dispatch(StackActions.replace(page, {}))
  }
  /**
   * @description: 关闭当前页面，返回上一页面
   */
  static goBack() {
    if (!this.navigation) {
      return
    }
    if (!Route.navigation.canGoBack()) {
      Route.dispatch('TabBarPage')
      return
    }
    this.navigation.goBack()
  }
  /**
   * @description: 将您带回到堆栈中的上一个屏幕。它需要一个可选参数 ( count)，它允许您指定要弹出多少屏幕
   * @param {number} count
   */
  static pop(count: number = 1) {
    if (!this.navigation) {
      return
    }
    if (!Route.navigation.canGoBack()) {
      Route.dispatch('TabBarPage')
      return
    }
    this.navigation.pop(count)
  }

  /**
   * @description: 将您带回堆栈中的第一个屏幕，关闭所有其他屏幕
   */
  static popToTop() {
    if (!this.navigation) {
      return
    }
    this.navigation.popToTop()
  }
}