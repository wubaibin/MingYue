import Types from "./types";

export const increment = (data: number) => ({ type: Types.INCREMENT, data });
export const decrement = (data: number) => ({ type: Types.DECREMENT, data });