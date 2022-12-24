import Types from "../actions/types";

export default function countReducer(preState: number = 0, action: { type: string; data: number }) {
  const { type, data } = action
  switch (type) {
    case Types.INCREMENT: // 加
      return preState + data;
    case Types.DECREMENT: // 减
      return preState - data;
    default:
      return preState;
  }
}