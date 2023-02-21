import React from 'react';
import {useDispatch, useSelector} from "react-redux"
import {MAP_INFO} from "../constants";

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 60, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
  maximumAge: 0,
}
const useWatchLocation = () => {
  const gps = useSelector(state => state.gps)
  const dispatch = useDispatch()
  
  const getData = () => {
  
  }
  
  const run = async () => {
  
  }
  
};

export default useWatchLocation;
