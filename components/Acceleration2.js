/*
DETECT CROSSOVERS
DETECT CROSSOVERS
DETECT CROSSOVERS
DETECT CROSSOVERS
DETECT CROSSOVERS
DETECT CROSSOVERS
DETECT CROSSOVERS
DETECT CROSSOVERS
*/

import React, { useState, useEffect } from 'react';

import {
  Text,
  StyleSheet
} from "react-native";

import {
  Accelerometer,
} from 'expo-sensors';

import {
  getAverageOfEndOfArray,
} from './modules'

import Graph from "./Graph";

import GraphDummyData from './GraphDummyData';


export default Acceleration = () => {

  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const [subscription, setSubscription] = useState(null);

  /* This sets the speed of updates */
  const _setSpeed = (millis) => {
    Accelerometer.setUpdateInterval(millis);
  };

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener(accelerometerData => {
        setData(accelerometerData);
      })
      );
    };

    const { x, y, z } = data;

    const decimalPlaces = 2

    const initialReadingsArrays = {xArray: [x.toFixed(decimalPlaces)],
                                   yArray: [y.toFixed(decimalPlaces)],
                                   zArray: [z.toFixed(decimalPlaces)]}

    const [readingsArrays, setReadingsArrays] = useState(initialReadingsArrays)

    const _unsubscribe = () => {
      subscription && subscription.remove();
      setSubscription(null);
    };

    useEffect(() => {
      _subscribe();
      _setSpeed(100);
      return () => _unsubscribe();
    }, []);

    useEffect(() => {
      const readingsArrayUpdate = {
        xArray: [...readingsArrays.xArray.slice(-1000), x],
        yArray: [...readingsArrays.yArray.slice(-1000), y],
        zArray: [...readingsArrays.zArray.slice(-1000), z]
      }
      setReadingsArrays(readingsArrayUpdate)
    }, [data])



    return (
      <>
      {/* <Text
      style={styles.header}>
        {x.toFixed(3)}
      </Text>
      <Text
      style={styles.header}>
      {y.toFixed(3)}
      </Text>
      <Text
      style={styles.header}>
        {z.toFixed(3)}
    </Text>*/}
      <Text
      style={styles.header}>
        {getAverageOfEndOfArray(readingsArrays.xArray,10).toFixed(decimalPlaces)}_
        {getAverageOfEndOfArray(readingsArrays.yArray,10).toFixed(decimalPlaces)}_
        {getAverageOfEndOfArray(readingsArrays.zArray,10).toFixed(decimalPlaces)}_
      </Text>
      {/* <Graph readings={averageGArray} /> */}
      <GraphDummyData />
      </>
  );
}

const styles = StyleSheet.create({
  header : {
    fontSize: 32,
    padding: 10,
  }
});
