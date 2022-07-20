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

import Graph from "./Graph";

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

    const initialReadingsArrays = {xArray: [x], yArray: [y], zArray: [z]}

    const [readingsArrays, setReadingsArrays] = useState(initialReadingsArrays)

    const _unsubscribe = () => {
      subscription && subscription.remove();
      setSubscription(null);
    };

    const getAverageOfEndOfArray = (array, samples) => {
      return (array.slice(samples * -1).reduce((a, b) => a + b) / samples);
    }

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
      <Text
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
      </Text>
      <Text
      style={styles.header}>
        {getAverageOfEndOfArray(readingsArrays.xArray,100).toFixed(3)}
      </Text>
      {/* <Graph readings={averageGArray} /> */}
      </>
  );
}

const styles = StyleSheet.create({
  header : {
    fontSize: 32,
    padding: 10,
  }
});
