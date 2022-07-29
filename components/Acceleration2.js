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
  crossoverDetector,
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

const runningWindowSize = {
  alpha: 3,
  beta: 5,
  gamma: 7,
}

const runningAveragesInit = {
  alpha: [0],
  beta: [0],
  gamma: [0],
}

const readingArrayLength = 24 - 1

export default Acceleration = () => {

  const [data, setData] = useState(initialData);

  const [crossovers, setCrossovers] = useState(crossoverMatrixGenerator());

  const [subscription, setSubscription] = useState(null);

  const [runningAverages, setRunningAverages] = useState(runningAveragesInit);

  /* Dummy data  */
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

    setRunningAverages({
        alpha: slidingWindow(inputs,
              runningWindowSize.alpha).slice(-readingArrayLength),
        beta: slidingWindow(inputs,
              runningWindowSize.beta).slice(-readingArrayLength),
        gamma: slidingWindow(inputs,
               runningWindowSize.gamma).slice(-readingArrayLength),
      })
    console.log(runningAverages.alpha[0],
                // runningAverages.beta[0],
                // runningAverages.gamma[0])
  )
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
        xArray: [...readingsArrays.xArray.slice(-readingArrayLength), x],
        yArray: [...readingsArrays.yArray.slice(-readingArrayLength), y],
        zArray: [...readingsArrays.zArray.slice(-readingArrayLength), z]
      }
      setReadingsArrays(readingsArrayUpdate)
    }, [data])

    useEffect(() => {

      setFrameRate(Date.now() - timeThen)
      setTimeThen(Date.now())

    }, [data])





    return (
      <>
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
