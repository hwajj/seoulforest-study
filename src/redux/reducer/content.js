import { createSlice, current } from "@reduxjs/toolkit"
import { MODE } from "@/utils/constants";
import {getClosestTarget} from "@/utils/utils";

const initialState = {
  course: ['A', 'B'], // 'A', 'B'
  mode: MODE.DEFAULT, // MODE.DEFAULT or MODE.NAVI
  target: null,
  activeArData: null,
  loadedModelCount: 0,
}

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setContentCourse: (state, action) => {
      console.log(action.payload)
      const { courses, gpsData } = action.payload
      const mode = courses.length === 2 ? MODE.DEFAULT : MODE.NAVI
      console.log(courses.length)
      const isNavMode = mode === MODE.NAVI
      const target = isNavMode ? getClosestTarget(gpsData, courses[0]) : null
      return { ...state, course: courses, mode, target }
    },
    setContentTarget: (state, action) => {
      const target = action.payload?.Name === current(state)['target']?.Name ? null : action.payload
      return { ...state, target }
    },
    setActiveArData: (state, action) => {
      return { ...state, activeArData: action.payload }
    },
    addLoadedModelCount: (state, action) => {
      return { ...state, loadedModelCount: state.loadedModelCount + 1 }
    },
    initLoadedModelCount: (state, action) => {
      return { ...state, loadedModelCount: 0 }
    },
  }
})

export const {
  setContentCourse,
  setContentTarget,
  setActiveArData,
  addLoadedModelCount,
  initLoadedModelCount
} = contentSlice.actions

export const contentSelector = state => state.content

export default contentSlice.reducer
