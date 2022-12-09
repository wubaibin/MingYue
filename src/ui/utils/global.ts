class $toast {
  static current: any;
  static showToast(param: object) {
    this.current.showToast(param);
  }
  static showLoading(param: object) {
    this.current.showLoading(param);
  }
  static hideLoading() {
    this.current.hideLoading();
  }
}
export {
  $toast
}