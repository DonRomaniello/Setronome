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

    const totalAcceleration = () => {
      const {x, y, z} = data;
      return Math.abs(x)
      + Math.abs(y)
      + Math.abs(z)
    }

    const updateReadingArray = () => {
      const currentG = totalAcceleration();
      const samples = 3;
      let workingArray = readingArray;
      if (workingArray.length > samples) {
        workingArray.shift()
      }
      workingArray.push(currentG)
      setReadingArray(workingArray)
    }

    const getAverageOfArray = (array) => {
      return (array.reduce((a, b) => a + b) / array.length);
    }

    const [averageG, setAverageG] = useState(totalAcceleration())

    useEffect(() => {
      _subscribe();
      return () => _unsubscribe();
    }, []);

    useEffect(() => {
      updateReadingArray();
      setAverageG(getAverageOfArray(readingArray))
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
