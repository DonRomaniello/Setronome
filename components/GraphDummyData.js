import {
  Dimensions,
  Text,
  View,
} from "react-native";

import {
  LineChart,
} from "react-native-chart-kit";

/* Lovingly taken from https://www.npmjs.com/package/react-native-chart-kit */

let inputs = []

for (let i = 0; i < 120; i++){
  inputs.push(Math.sin(i/5))
}

let sliceStart = .25
let sliceEnd = .6

inputs = inputs.slice(Math.floor(inputs.length *  sliceStart),
                        Math.floor(inputs.length * sliceEnd))


const slidingWindow = (array, windowWidth) => {

  return array.map((entry, idx) => {
                return (array
                .slice(idx, idx + windowWidth)
                .reduce((a, b) => a + b) / windowWidth)
              })
}



export default GraphDummyData = () => {

  return (
    <View>
    <LineChart
      data={{
        datasets: [
          {
            data: inputs
          },
          {
            data: slidingWindow(inputs, 10)
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
        marginVertical: 8,
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
