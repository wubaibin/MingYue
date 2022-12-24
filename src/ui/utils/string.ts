export default class StringRegular {
  /**
   * @description: 多于saveLength的长度后...
   * @param {string} res
   * @param {number} saveLength
   */
  static ellipsis(res: string, saveLength: number) {
    if (res.length >= saveLength + 1) {
      return res.slice(0, saveLength) + '...';
    }
    return res;
  }
}
