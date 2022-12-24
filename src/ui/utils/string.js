export default class StringRegular {
  /**
   * @description: 多于saveLength的长度后...
   * @param {string} res
   * @param {number} saveLength
   */
  static ellipsis(res, saveLength) {
    if (!res) {
      return "";
    }
    if (res.length >= saveLength + 1) {
      return res.slice(0, saveLength) + '...';
    }
    return res;
  }
}
