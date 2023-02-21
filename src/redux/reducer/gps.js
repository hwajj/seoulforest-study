import { createSlice, current } from "@reduxjs/toolkit";
import { CalculateAngle, checkInsideOne } from "@/utils/utils";
import { EVENTS, IS_AR } from "@/utils/constants";

const initialState = {
  location: {
    lat: 0,
    lon: 0,
  },
  isRunning: false,
  isError: false,
  error: "",
  data: [],
  closest: null,
  isInsideOfAnyStores: false,
  testMode: false,
};

const gpsSlice = createSlice({
  name: "gps",
  initialState,
  reducers: {
    getDataSuccess: (state, action) => {
      console.log(action.payload);
      const newData = [...action.payload].map((d, i) => {
        const newObject = Object.assign({}, d);
        newObject["AR"] = IS_AR[d["AR"]];
        newObject["Latitude"] = parseFloat(d["Latitude"]);
        newObject["Longitude"] = parseFloat(d["Longitude"]);
        newObject["Radius"] = parseFloat(d["Radius"]);
        newObject["A"] = parseInt(d["A"]);
        newObject["B"] = parseInt(d["B"]);
        newObject["No"] = parseInt(d["No"]);
        return newObject;
      });
      return { ...state, isError: false, data: newData };
    },
    getDataFail: (state, action) => {
      return { ...state, isError: true, error: action.payload };
    },
    watchPositionStarted: () => {
      return { ...initialState, isRunning: true };
    },
    watchPositionStopped: () => {
      return initialState;
    },
    getLocationSuccess: (state, { payload }) => {
      const { data, testMode } = current(state);
      if (testMode !== payload.isTest) return;

      let closest = {};
      let isInsideOfAnyStores = false;
      const newData = [...data].map((d, i) => {
        const cio = checkInsideOne(
          payload.lat,
          payload.lon,
          d["Latitude"],
          d["Longitude"],
          d["Radius"]
        );
        const newObject = Object.assign({}, d);
        const angle = CalculateAngle(
          payload.lat,
          payload.lon,
          d["Latitude"],
          d["Longitude"]
        );

        newObject["isInside"] = cio.isInside;
        newObject["distance"] = cio.distance;
        newObject["angle"] = angle * -1;

        if (cio.isInside) isInsideOfAnyStores = true;

        closest =
          i === 0
            ? newObject
            : newObject.distance < closest.distance
            ? newObject
            : closest;

        return newObject;
      });
      setTimeout(() => window.dispatchEvent(new Event(EVENTS.GPS_SUCCESS)), 20);
      return {
        ...state,
        isError: false,
        location: payload,
        data: newData,
        closest,
        isInsideOfAnyStores,
      };
    },
    getLocationFail: (state, action) => {
      return { ...state, isError: true, error: action.payload };
    },
    setTestMode: (state, action) => {
      return { ...state, testMode: action.payload };
    },
  },
});

export const {
  getDataSuccess,
  getDataFail,
  getLocationSuccess,
  getLocationFail,
  watchPositionStarted,
  watchPositionStopped,
  setTestMode,
} = gpsSlice.actions;

export const gpsSelector = (state) => state.gps;

export default gpsSlice.reducer;
