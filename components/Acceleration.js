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

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  return (
      <Text
      style={styles.header}>
        x: {Math.round(x)} y: {Math.round(y)} z: {Math.round(z)}
      </Text>
  );
}

const styles = StyleSheet.create({
  header : {
    fontSize: 32
  }
});

