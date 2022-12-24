import { ShowDialog } from "../Dialog";
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

class $dialog {
  static current: any;
  static show() {
    this.current.show();
  }
  static hide() {
    this.current.hide();
  }
  static showDialog(param: ShowDialog) {
    this.current.showDialog(param);
  }
}

export {
  $toast,
  $dialog
}