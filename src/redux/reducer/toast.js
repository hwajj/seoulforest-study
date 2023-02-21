import {createSlice, current} from "@reduxjs/toolkit"

const initialState = {
  message: null,
  color: '#000',
  isOpen: false,
}

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    openToastAction: (state, { payload }) => {
      state.message = payload.message
      state.color = payload.color || '#000'
      state.isOpen = true
    },
    closeToastAction: (state, { payload }) => {
      state.message = null
      state.color = '#000'
      state.isOpen = false
    }
  }
})

export const {
  openToastAction,
  closeToastAction
} = toastSlice.actions

export const toastSelector = state => state.toast

export default toastSlice.reducer
