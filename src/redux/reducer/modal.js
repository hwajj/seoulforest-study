import {createSlice, current} from "@reduxjs/toolkit"

const initialState = []

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModalAction: (state, { payload }) => {
      console.log(payload)
      return state.concat({ type: payload.type, props: payload.props })
    },
    closeModalAction: (state, { payload }) => {
      state.pop()
    }
  }
})

export const {
  openModalAction,
  closeModalAction
} = modalSlice.actions

export const modalSelector = state => state.modal

export default modalSlice.reducer
