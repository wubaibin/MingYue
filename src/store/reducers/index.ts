import { combineReducers } from "redux";
import countReducer from './count';

const reducer = combineReducers({
  countReducer,
});

export default reducer;