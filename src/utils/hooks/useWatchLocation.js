import React, { useRef } from "react";
import {
  getDataSuccess,
  getDataFail,
  getLocationSuccess,
  getLocationFail,
  watchPositionStarted,
  watchPositionStopped,
} from "@/redux/reducer/gps";
import { useDispatch, useSelector } from "react-redux";
import { MAP_INFO, MAP_MODE } from "@/utils/constants";
import { TSVToJSON } from "@/utils/utils";

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 60, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
  maximumAge: 0,
};
const useWatchLocation = () => {
  const gps = useSelector((state) => state.gps);
  const dispatch = useDispatch();
  const watchId = useRef(null);
  const getData = () => {
    const request = new XMLHttpRequest();
    request.open("GET", MAP_INFO[MAP_MODE].tsv, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = () => {
      if (request.status >= 200 && request.status < 300) {
        const jsonData = TSVToJSON(request.response);
        dispatch(getDataSuccess(jsonData));
      } else {
        dispatch(getDataFail(request.statusText));
      }
    };
    request.onerror = () => {
      dispatch(getDataFail(request.statusText));
    };
    request.send();
  };

  const run = async () => {
    await getData();
    const { geolocation } = navigator;
    if (!geolocation) {
      dispatch(getLocationFail("Geolocation is not supported."));
      return;
    }
    watchId.current = geolocation.watchPosition(
      handleSuccess,
      handleError,
      geolocationOptions
    );
    dispatch(watchPositionStarted());
  };

  const stop = () => {
    const { geolocation } = navigator;

    if (watchId.current && geolocation) {
      geolocation.clearWatch(watchId.current);
      watchId.current = null;
      dispatch(watchPositionStopped());
    }
  };

  const handleSuccess = (pos) => {
    dispatch(
      getLocationSuccess({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
        isTest: false,
      })
    );
  };

  const handleError = (error) => {
    dispatch(getLocationFail(error.message));
  };

  return {
    location: gps?.location,
    isGpsRunning: gps?.isRunning,
    isGpsError: gps?.isError,
    gpsError: gps?.error,
    gpsData: gps?.data,
    closest: gps?.closest,
    gpsState: gps,
    runGps: run,
    stopGps: stop,
  };
};

export default useWatchLocation;
