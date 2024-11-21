import { combineReducers } from "redux";
import scrollReducer from './scrollSlice'
export default combineReducers({

    scroll:scrollReducer,
  
})