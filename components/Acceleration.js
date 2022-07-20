import React, { useState, useEffect } from 'react';

import {
  Text,
  StyleSheet
} from "react-native";

import {
  Accelerometer,
} from 'expo-sensors';

export default Acceleration = () => {

  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const [subscription, setSubscription] = useState(null);

  const [readingArray, setReadingArray] = useState([]);

  const _slow = () => {
    Accelerometer.setUpdateInterval(1000);
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

    /* This removes the oldest sample from the array if the array has been
    'filled'. It then adds the newest sample to the end of the array. */
    const updateReadingArray = () => {
      const currentG = totalAcceleration();
      const samples = 1000;
      let workingArray = readingArray;
      if (workingArray.length > samples) {
        workingArray.shift()
      }
      workingArray.push(currentG)
      setReadingArray(workingArray)
    }

    /* With a large amount of readings in the sample array, some of the readings
    are rather stale. This only takes an average of X amount of samples from the
    very end of the array */
    const getAverageOfEndOfArray = (array) => {
      const samples = 3
      return (array.slice(samples * -1).reduce((a, b) => a + b) / samples);
    }

    const [averageG, setAverageG] = useState(totalAcceleration())

    useEffect(() => {
      _subscribe();
      return () => _unsubscribe();
    }, []);

    useEffect(() => {
      updateReadingArray();
      setAverageG(getAverageOfEndOfArray(readingArray))
    }, [data])

    return (
      <Text
      style={styles.header}>
        {/* x: {x.toFixed(3)} y: {y.toFixed(3)} z: {z.toFixed(3)} */}
        {/* {totalAcceleration().toFixed(3)} */}
        {averageG.toFixed(3)}
      </Text>
  );
}

const styles = StyleSheet.create({
  header : {
    fontSize: 32
  }
});
