import { combineReducers } from "redux";
import scrollReducer from './scrollSlice'
import userDataReducer from './userSlice'
import categoryReducer from './categorySlice'
import bidsReducer from './bidSlice'
import notificationReducer from './notificationSlice'


export default combineReducers({

    scroll:scrollReducer,
    userData:userDataReducer,
    categories:categoryReducer,
    bids: bidsReducer,
    notifications: notificationReducer,
})