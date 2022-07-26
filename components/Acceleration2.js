import React, { useState, useEffect } from 'react';

import {
  Text,
  StyleSheet
} from "react-native";

import {
  Accelerometer,
} from 'expo-sensors';

import {
  crossoverMatrixGenerator,
  getAverageOfEndOfArray,
  slidingWindow,
  statsBreakdown
} from './modules'

import Graph from "./Graph";

import GraphDummyData from './GraphDummyData';

const initialData = {
  x: 0,
  y: 0,
  z: 0,
}

export default Acceleration = () => {

  const [data, setData] = useState(initialData);

  const [crossovers, setCrossovers] = useState(crossoverMatrixGenerator())

  const [subscription, setSubscription] = useState(null);

  const [inputs, setInputs] = useState([0]);

  const [i, setI] = useState(0);

  const incrementIt = () => {
    let newI = i + 1
    setI(newI)
    setInputs([...inputs, Math.sin(i/5)].slice(-30))
  }

  useEffect(() => {
    setTimeout(incrementIt, 500)
  }, [i])

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

    const decimalPlaces = 3

    const initialReadingsArrays = {xArray: [x.toFixed(decimalPlaces)],
                                   yArray: [y.toFixed(decimalPlaces)],
                                   zArray: [z.toFixed(decimalPlaces)]}

    const [readingsArrays, setReadingsArrays] = useState(initialReadingsArrays)

    const [timeThen, setTimeThen] = useState(Date.now());

    const [frameRate, setFrameRate] = useState();

    const [breakdownX, setBreakdownX] = useState({});

    const [breakdownY, setBreakdownY] = useState({});

    const [breakdownZ, setBreakdownZ] = useState({});

    const _unsubscribe = () => {
      subscription && subscription.remove();
      setSubscription(null);
    };

    useEffect(() => {
      _subscribe();
      _setSpeed(10);
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

    useEffect(() => {

      setFrameRate(Date.now() - timeThen)
      setTimeThen(Date.now())
      setBreakdownX(statsBreakdown(readingsArrays.xArray))
      setBreakdownY(statsBreakdown(readingsArrays.yArray))
      setBreakdownZ(statsBreakdown(readingsArrays.zArray))

    }, [data])





    return (
      <>
      {/* <Text
      style={styles.header}>
        {getAverageOfEndOfArray(readingsArrays.xArray,10).toFixed(decimalPlaces)}
        {"  "}
        {getAverageOfEndOfArray(readingsArrays.yArray,10).toFixed(decimalPlaces)}
        {"  "}
        {getAverageOfEndOfArray(readingsArrays.zArray,10).toFixed(decimalPlaces)}
      </Text>
      <Text
      style={styles.header}>
        {inputs.slice(-1)[0].toFixed(decimalPlaces)}
        {' '}
        {slidingWindow(inputs, 3).slice(-3)[0].toFixed(decimalPlaces)}
        {' '}
        {slidingWindow(inputs, 6).slice(-6)[0].toFixed(decimalPlaces)}
      </Text> */}
      <Text
      style={styles.header}>
        {readingsArrays?.xArray?.length}
      </Text>
      <Text
      style={styles.header}>
        sY: {breakdownX?.variance?.toFixed(10)}
      </Text>
      <Text
      style={styles.header}>
        Sx: {breakdownX?.std?.toFixed(10)}
      </Text>
      <Text
      style={styles.header}>
        Vy: {breakdownY?.variance?.toFixed(10)}
      </Text>
      <Text
      style={styles.header}>
        Sy: {breakdownY?.std?.toFixed(10)}
      </Text>
      <Text
      style={styles.header}>
        Vz: {breakdownZ?.variance?.toFixed(10)}
      </Text>
      <Text
      style={styles.header}>
        Sz: {breakdownZ?.std?.toFixed(10)}
      </Text>
      {/* <Graph readings={averageGArray} /> */}
      {/* <GraphDummyData inputs={inputs}/> */}
      </>
  );
}

const styles = StyleSheet.create({
  header : {
    fontSize: 32,
    padding: 10,
  }
});
