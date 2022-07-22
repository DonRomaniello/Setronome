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


// for (let i = 0; i < 120; i++){
//   inputs.push(Math.sin(i/5))
// }



// let sliceStart = .25
// let sliceEnd = .6

// inputs = inputs.slice(Math.floor(inputs.length *  sliceStart),
//                         Math.floor(inputs.length * sliceEnd))





export default GraphDummyData = () => {

    const [inputs, setInputs] = useState([0]);

    const [i, setI] = useState(0);


    const incrementIt = () => {
      let newI = i + 1

      setI(newI)
      setInputs([...inputs, Math.sin(i/5)].slice(-30))

    }


    useEffect(() => {

      setTimeout(incrementIt, 50)

    }, [i])

  // const data =


  return (
    <View>
    <LineChart
      data={{
        datasets: [
          {
            data: inputs,
            color: () => '#EFEFEF',
          },
          {
            data: slidingWindow(inputs, 5),
            color: () => '#000000',
            // data: inputs
          },
        ]
      }}
      width={Dimensions.get("window").width - 30} // from react-native
      height={Dimensions.get("window").width - 30}
      yAxisLabel=""
      yAxisSuffix="G"
      yAxisInterval={1} // optional, defaults to 1
      chartConfig={chartConfig}
      bezier
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
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16
  },
  propsForDots: {
    r: "3",
    strokeWidth: "1",
    stroke: "#143109"
  }
}
