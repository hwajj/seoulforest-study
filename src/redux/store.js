import {combineReducers, configureStore} from '@reduxjs/toolkit';
import gpsReducer from '@/redux/reducer/gps'
import modalReducer from '@/redux/reducer/modal'
import contentReducer from '@/redux/reducer/content'
import toastReducer from '@/redux/reducer/toast'

const rootReducer = combineReducers({
  gps: gpsReducer,
  modal: modalReducer,
  content: contentReducer,
  toast: toastReducer,
})

export default configureStore({
  reducer: rootReducer
})
