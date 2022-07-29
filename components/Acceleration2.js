import React, { useState, useEffect } from 'react';

const randomNormal = require('random-normal');

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

import PlaySound from './PlaySound'

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

    let sinI = Math.sin(i/5) * .8

    let normalSinI = randomNormal({mean: sinI, dev: .05})

    setInputs([...inputs, Number(normalSinI)].slice(-30))
    setI(newI)
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

    const _unsubscribe = () => {
      subscription && subscription.remove();
      setSubscription(null);
    };

    useEffect(() => {
      _subscribe();
      _setSpeed(1000);
      return () => _unsubscribe();
    }, []);

    useEffect(() => {
      const readingsArrayUpdate = {
        xArray: [...readingsArrays.xArray.slice(-1023), x],
        yArray: [...readingsArrays.yArray.slice(-1023), y],
        zArray: [...readingsArrays.zArray.slice(-1023), z]
      }
      setReadingsArrays(readingsArrayUpdate)
    }, [data])

    useEffect(() => {

      setFrameRate(Date.now() - timeThen)
      setTimeThen(Date.now())

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
      {/* <Text
      style={styles.header}>
        {readingsArrays?.xArray?.length}
      </Text> */}
      {/* <Graph readings={averageGArray} /> */}
      {/* <GraphDummyData inputs={inputs}/> */}
      <PlaySound />
      </>
  );
}

const styles = StyleSheet.create({
  header : {
    fontSize: 32,
    padding: 10,
  }
});
