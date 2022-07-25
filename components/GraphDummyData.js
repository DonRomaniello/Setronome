import React, { useState, useEffect } from 'react';

import {
  Dimensions,
  Text,
  View,
} from "react-native";

import {
  LineChart,
} from "react-native-chart-kit";

import { slidingWindow } from './modules'

/* Lovingly taken from https://www.npmjs.com/package/react-native-chart-kit */

export default GraphDummyData = (props) => {

  const { inputs } = props

  return (
    <View>
    <LineChart
      data={{
        datasets: [
          {
            data: slidingWindow(inputs, 6),
            color: () => 'rgba(0, 0, 0, .5)',
          },
          {
            data: slidingWindow(inputs, 3),
            color: () => 'rgba(0, 0, 128, .5)',
          },
          {
            data: inputs,
            color: () => 'rgba(255, 255, 255, .5)',
          },
        ]
      }}
      width={Dimensions.get("window").width - 30} // from react-native
      height={Dimensions.get("window").width - 30}
      yAxisLabel=""
      yAxisSuffix="G"
      yAxisInterval={1} // optional, defaults to 1
      chartConfig={chartConfig}
      // bezier
      style={{
        borderRadius: 16
      }}
      />
  </View>
  )
}

const chartConfig = {
  backgroundColor: "#AAAE7F",
  backgroundGradientFrom: "#AAAE7F",
  backgroundGradientTo: "#7FAAAE",
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
  fillShadowGradientFromOpacity: 0,
  fillShadowGradientToOpacity: 0,
  style: {
    borderRadius: 16
  },
  propsForDots: {
    r: "3",
    strokeWidth: "1",
    stroke: "#143109"
  }
}
