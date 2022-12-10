import { ShowToast, ShowLoading } from "../Toast";

class $toast {
  static current: any;
  static showToast(param: ShowToast) {
    this.current.showToast(param);
  }
  static showLoading(param: ShowLoading) {
    this.current.showLoading(param);
  }
  static hideLoading() {
    this.current.hideLoading();
  }
}
export {
  $toast
}