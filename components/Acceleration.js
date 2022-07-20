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

  const [totalAccelerationArray, setTotalAccelerationArray] = useState([1, 1, 1])

  const [readingsArray, setReadingsArray] = useState([{x: [0], y: [0], z:[1]}]);

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

    const _unsubscribe = () => {
      subscription && subscription.remove();
      setSubscription(null);
    };

    /* Keeping the phone oriented one way is impractical, so this sums all
    the accelerations together. It uses the absolute values to prevent
    negative and positive values cancelling each other out. */
    const totalAcceleration = () => {
      const {x, y, z} = data;
      return Math.abs(x)
      + Math.abs(y)
      + Math.abs(z)
    }

    /* This removes the oldest sample from an array if the array has been
    'filled'. It then adds the newest sample to the end of the array. */
    const updateArray = (reading, array, setFunction) => {
      const currentReading = reading;
      const samples = 1000;
      let workingArray = array;
      if (workingArray.length > samples) {
        workingArray.shift()
      }
      workingArray.push(currentReading)
      setFunction(workingArray)
    }

    /* With a large amount of readings in the sample array, some of the readings
    are rather stale. This only takes an average of X amount of samples from the
    very end of the array */
    const getAverageOfEndOfArray = (array, samples) => {
      return (array.slice(samples * -1).reduce((a, b) => a + b) / samples);
    }

    const [averageG, setAverageG] = useState(totalAcceleration())

    const [averageGArray, setAverageGAraay] = useState([totalAcceleration()]);

    useEffect(() => {
      _subscribe();
      _setSpeed(100);
      return () => _unsubscribe();
    }, []);

    useEffect(() => {
      updateArray(totalAcceleration(),
       totalAccelerationArray,
        setTotalAccelerationArray);

      setAverageG(getAverageOfEndOfArray(totalAccelerationArray, 30))

      updateArray(averageG,
        averageGArray,
        setAverageGAraay)
    }, [data])

    return (
      <>
      <Text
      style={styles.header}>

        {averageG.toFixed(3)}
      </Text>
      {/* <Graph readings={averageGArray} /> */}
      </>
  );
}

const styles = StyleSheet.create({
  header : {
    fontSize: 32
  }
});
