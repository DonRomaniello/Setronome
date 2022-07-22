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

  const [crossovers, setCrossovers] = useState(crossoverMatrixGenerator(5))

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

    const decimalPlaces = 2

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
        xArray: [...readingsArrays.xArray.slice(-10000), x],
        yArray: [...readingsArrays.yArray.slice(-10000), y],
        zArray: [...readingsArrays.zArray.slice(-10000), z]
      }
      setReadingsArrays(readingsArrayUpdate)
    }, [data])

    useEffect(() => {

      setFrameRate(Date.now() - timeThen)
      setTimeThen(Date.now())


    }, [data])




    return (
      <>
      <Text
      style={styles.header}>
        {getAverageOfEndOfArray(readingsArrays.xArray,10).toFixed(decimalPlaces)}
        {"  "}
        {getAverageOfEndOfArray(readingsArrays.yArray,10).toFixed(decimalPlaces)}
        {"  "}
        {getAverageOfEndOfArray(readingsArrays.zArray,10).toFixed(decimalPlaces)}
      </Text>
      <Text>
        {crossovers.length}
      </Text>
      {/* <Graph readings={averageGArray} /> */}
      <GraphDummyData inputs={inputs}/>
      </>
  );
}

const styles = StyleSheet.create({
  header : {
    fontSize: 32,
    padding: 10,
  }
});
